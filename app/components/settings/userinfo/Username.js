/**
 * Created by hejunwei on 27/01/2018.
 */
import React, {Component} from 'react';
import {View, Alert, TextInput, AsyncStorage, StyleSheet, Button} from 'react-native';
import ApiService from '../../../services/ApiService';
import config from '../../../config/app';

export default class Username extends Component {

  static navigationOptions = ({navigation}) => {
    const {state, setParams, navigate} = navigation;

    return {
      headerStyle: {
        backgroundColor: '#ee735c',
        paddingRight: 10,
      },
      headerTitleStyle: {

      },
      headerRight: <Button
        color={'#fff'}
        title={'保存'}
        onPress={() => {
          console.log(state.params.save());
        }}
      />,
    };
  };

  save() {
    console.log(this.state.user);
    // 更新服务器
    ApiService.put(config.api.users, {value: this.state.username, type: 'name'})
      .then((response) => {
        if (response.status === 0) {
          // 更新本地
          // 获取本地存储的用户信息
          AsyncStorage.getItem('user')
            .then((res) => {
              let user = JSON.parse(res);
              // 替换头像地址
              user.name = this.state.username;
              // 存储进去
              AsyncStorage.setItem('user', JSON.stringify(user))
                .then((res) => {
                  // 刷新 navigation 的 params
                  this.props.navigation.setParams({user: user});
                  // 刷新 profile 页
                  this.props.navigation.state.params.refreshProfile();
                  // 刷新 userinfo 页
                  this.props.navigation.state.params.refreshUserInfo();
                });
            });
          this.props.navigation.goBack();
        }
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  componentWillMount() {
    this.setState({
      username: this.props.navigation.state.params.user.name,
    });
    this.props.navigation.setParams({
      save: this.save.bind(this),
    });
  }

  render() {
    return (
      <View>
        <TextInput
          onChangeText={(text) => this.setState({
            username: text,
          })}
          autoCapitalize={'none'} //不纠正大小写
          autoCorrect={false} //不纠正内容
          editable={true}
          style={styles.input}
          value={this.state.username}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingLeft: 10,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 18,
    height: 40,
  },
});