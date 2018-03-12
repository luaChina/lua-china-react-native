/**
 * Created by hejunwei on 23/01/2018.
 */
import React, {Component} from 'react';
import {View, StyleSheet, Text, TextInput, Button, Alert, TouchableOpacity, AsyncStorage} from 'react-native';
import ApiService from '../../services/ApiService';
import config from '../../config/app';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class LoginComponent extends Component {

  constructor() {
    super();
    this.state = {
      phone: null,
      codeSent: false,
      verifyCode: null,
      counting: 0,
      interval: null,
    };
  }

  _login() {
    if (!this.state.phone || !this.state.verifyCode) {
      return Alert.alert('手机号不能为空');
    }
    let body = {
      phone: this.state.phone,
      verify_code: this.state.verifyCode,
    };
    ApiService.post(config.api.login, body)
      .then((response) => {
        console.log(response);
        if (response && response.status === 0) {
          // 注意要转换成 string 后在保存
          let user = JSON.stringify(response.data);
          AsyncStorage.setItem('user', user)
            .then(() => {
              this.setState({
                logined: true,
                user: user,
              });
              // 刷新 profile 页面,其实就是调用了那个页面传过来的方法
              this.props.navigation.state.params.refresh();
              // 返回上一级
              this.props.navigation.goBack();
            });
        } else {
          Alert.alert('登录失败, 请检查手机号和验证码是否正确');
        }
      })
      .catch((error) => {
        Alert.alert('服务器繁忙');
      });
  }

  _showVerifyCode() {
    this.setState({
      codeSent: true,
    });
  }

  // 一般都在这里清空倒计时
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  _sendVerifyCode() {
    if (!this.state.phone) {
      return Alert.alert('手机号不能为空');
    }
    // if (this.state.length !== 11) {
    //   return Alert.alert('手机号格式不正确');
    // }
    this.setState({
      counting: 60,
    });
    // 倒计时重新发送验证码
    this.state.interval = setInterval(() => {
      this.setState({
        counting: this.state.counting - 1,
      });
      if (this.state.counting <= 0) {
        clearInterval(this.state.interval);
      }
    }, 1000);

    let body = {
      phone: this.state.phone,
    };
    ApiService.post(config.api.sendCode, body)
      .then((response) => {
        console.log(response);
        if (response && response.status === 0) {
          this._showVerifyCode();
        } else {
          Alert.alert('获取验证码失败, 请检查手机号是否正确');
        }
      })
      .catch((error) => {
        Alert.alert('服务器繁忙');
      });
  }

  _changePhone() {
    this.setState({
      codeSent: false,
      counting: 0,
    });
  }

  _renderCodeInput() {
    return (
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder='请输入验证码'
          autoCapitalize={'none'} //不纠正大小写
          autoCorrect={false} //不纠正内容
          keyboardType={'number-pad'}
          style={styles.codeInputField}
          onChangeText={(text) => this.setState({
            verifyCode: text,
          })}
        />
        <View style={styles.codeBtnWrapper}>
          <TouchableOpacity
            disabled={!!this.state.counting}
            onPress={this._sendVerifyCode.bind(this)}
            style={[styles.codeBtn, this.state.counting ? {backgroundColor: '#ccc'} : null]}>
            <Text style={styles.codeBtnText}>
              {this.state.counting ? this.state.counting + '秒后，可以重新获取验证码' : '重新获取验证码'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.signupBox}>
          <Text style={styles.title}>快速登录</Text>
          <View style={styles.inputWrapper}>
            <FontAwesome name="user-o" size={24} style={styles.icon}/>
            <TextInput
              placeholder='输入手机号'
              autoCapitalize={'none'} //不纠正大小写
              autoCorrect={false} //不纠正内容
              keyboardType={'number-pad'}
              style={[styles.inputField, this.state.codeSent ? {backgroundColor: '#eee'} : null]}
              onChangeText={(text) => this.setState({
                phone: text,
              })}
              editable={!this.state.codeSent}
            />
          </View>
          {
            this.state.codeSent
              ? this._renderCodeInput()
              : null
          }
          <View>
            {
              this.state.codeSent
                ? (
                <View>
                  <View style={styles.btnWrapper}>
                    <Button title="登录" onPress={this._login.bind(this)} color={'#ee753c'}/>
                  </View>
                  <Button title="更换手机号" onPress={this._changePhone.bind(this)} color={'#bbb'}/>
                </View>
              )
                : (
                <View style={styles.btnWrapper}>
                  <Button title="获取验证码" onPress={this._sendVerifyCode.bind(this)} color={'#ee753c'}/>
                </View>
              )
            }
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  signupBox: {
    marginTop: 30,
  },
  title: {
    marginBottom: 20,
    color: '#ee753c',
    fontSize: 20,
    textAlign: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    margin: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    height: 40,
  },
  icon: {
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    color: '#ee753c',
  },
  inputField: {
    flex: 10,
    height: 40,
    padding: 5,
    color: '#666',
    fontSize: 18,
  },
  btnWrapper: {
    marginTop: 20,
    borderWidth: 1,
    margin: 5,
    borderColor: '#ee753c',
    borderRadius: 4,
  },
  codeBtnWrapper: {},
  codeBtn: {
    flex: 3,
    justifyContent: 'center',
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: '#ee753c',
  },
  codeBtnText: {
    color: '#fff',
    alignItems: 'center',
  },
  codeInputField: {
    flex: 7,
    height: 40,
    padding: 5,
    color: '#666',
    fontSize: 16,
  },
});