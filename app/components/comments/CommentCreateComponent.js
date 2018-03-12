/**
 * Created by hejunwei on 20/01/2018.
 */
import React, {Component} from 'React';
import {View, Text, TextInput, StyleSheet, Alert, Dimensions, Button} from 'react-native';
import ApiService from '../../services/ApiService';
import config from '../../config/app';

let width = Dimensions.get('window').width;

export default class CommentCreateComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      animationType: false,
      content: '',
      isSending: false,
    };
  }

  render() {
    return (
      <View>
        <View style={styles.commentContainer}>
          <Text>敢不敢评论一个:</Text>
          <TextInput
            placeholder='请使用 Markdown 格式书写 :)'
            style={styles.content}
            multiline={true} //多行
            onFocus={this._onFocus.bind(this)} //获得焦点
            onBlur={this._onBlur.bind(this)} //失去焦点
            defaultValue={this.state.content} //默认值
            onChangeText={(text) => this.setState({
              content: text,
            })}
          />
        </View>
        <View style={styles.btnWrapper}>
          <Button title="提交" onPress={this._submit.bind(this)} color={'#ee753c'}/>
        </View>
      </View>
    );
  }

  _onFocus() {
    this._setModalVisible(true);
  }

  _onBlur() {

  }

  _setModalVisible(isVisible) {
    this.setState({
      modalVisible: isVisible,
    });
  }

  _closeModal() {
    this._setModalVisible(false);
  }

  _submit() {
    console.log(this.state.content);
    if (!this.state.content) {
      return Alert.alert('评论内容不能为空');
    }
    if (this.state.isSending) {
      return Alert.alert('正在发送');
    }

    this.setState({
      isSending: true,
    }, () => {
      let body = {
        content: this.state.content,
      };
      ApiService.post(config.api.comments(this.props.postId), body)
        .then((response) => {
          this.setState({
            isSending: false,
          });
          this._closeModal();
        })
        .catch((error) => {
          this.setState({
            isSending: false,
          });
        });
    });
  }
}

const styles = StyleSheet.create({
  commentContainer: {
    marginTop: 10,
    marginBottom: 10,
    padding: 8,
    width: width,
  },
  content: {
    marginTop: 10,
    paddingLeft: 2,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    fontSize: 14,
    height: 80,
  },
  closeIcon: {
    alignSelf: 'center',
    fontSize: 30,
    color: '#ee753c',
  },
  btnWrapper: {
    width: width - 20,
    padding: 4,
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ee753c',
    borderRadius: 4,
    alignSelf: 'center',
  },
});