import React, {Component} from 'react';
import {StyleSheet, View, Text, Dimensions, ScrollView, Image, Modal, Alert} from 'react-native';
import ApiService from '../../services/ApiService';
import config from '../../config/app';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CommentCreateComponent from '../comments/CommentCreateComponent';

let width = Dimensions.get('window').width;

export default class PostShowComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rate: 1,
      muted: true,
      resizeMode: 'contain',
      repeat: false,
      modalVisible: false,
      animationType: 'none',
    };
  }

  render() {
    const data = this.props.navigation.state.params.data;
    return (
      <View style={styles.container}>
        {/*<View style={styles.videoBox}>*/}
        {/*<Video*/}
        {/*ref="videoPlayer"*/}
        {/*source={{uri: data.video}}*/}
        {/*style={styles.video}*/}
        {/*volume={3}*/}
        {/*paused={false} // 打开后自动播放而不暂停*/}
        {/*rate={this.state.rate}*/}
        {/*muted={this.state.muted} //是否静音*/}
        {/*resizeMode={this.state.resizeMode} // 视频显示的拉伸模式*/}
        {/*repeat={this.state.repeat}*/}
        {/*onLoadStart={this._onLoadStart} // 视频播放开始时回调函数*/}
        {/*onLoad={this._onLoad} // 视频播放中的回调函数*/}
        {/*onProgress={this._onProgress} // 每隔250ms调用*/}
        {/*onEnd={this._onEnd}*/}
        {/*onError={this._onError}*/}
        {/*/>*/}
        {/*</View>*/}
        <ScrollView
          enableEmptySections={true}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          style={styles.scrollView}
        >
          <View style={styles.infoBox}>
            <Image style={styles.avatar} source={{uri: data.user.avatar}}/>
            <View style={styles.descBox}>
              <Text style={styles.nickname}>{data.user.name}</Text>
              <Text style={styles.title}>{data.title}</Text>
            </View>
          </View>
          <View style={styles.contentBox}>
            <Text style={styles.contentText}>{data.content}</Text>
          </View>
        </ScrollView>
        <View style={styles.bottomIcons}>
          <FontAwesome
            name={data.is_favor ? 'heart' : 'heart-o'}
            size={28}
            style={[styles.bottomIcon, data.is_favor ? styles.up : null]}
            onPress={this._favor.bind(this)}
          />
          <FontAwesome
            name={'comments'}
            size={28}
            style={styles.bottomIcon}
            onPress={this._goCommentListPage.bind(this)}
          />
          <FontAwesome
            name={'pencil-square'}
            size={28}
            style={styles.bottomIcon}
            onPress={this._goCommentCreatePage.bind(this)}
          />
        </View>

        {/* 浮层 */}
        <Modal
          // animationType={'fade'}
          visible={this.state.modalVisible}
          // onRequestClose={() => {
          //   this._setModalVisible(false);
          // }}
        >
          <FontAwesome
            onPress={this._closeModal.bind(this)}
            name="close"
            style={styles.closeIcon}
          />
          <CommentCreateComponent postId={this.props.navigation.state.params.data.id}/>
        </Modal>
      </View>
    );
  }

  _favor() {
    let row = this.props.navigation.state.params.data;
    ApiService.post(config.api.favor(row.id))
      .then((response) => {
        if (response.status !== 0) {
          Alert.alert('服务器繁忙请稍后再试:' + response.message);
        } else {
          // 未收藏的状态下触发收藏才会提示
          // if (!row.is_favor) {
          //   Alert.alert(row.user.name + '非常感谢您的赞赏');
          // }
          row.is_favor = !row.is_favor;
          this.setState({
            row: row,
          });
        }
      });
  }

  _goCommentListPage() {
    this.props.navigation.navigate('CommentList', {postId: this.props.navigation.state.params.data.id});
  }

  _goCommentCreatePage() {
    // this.props.navigation.navigate('CommentCreate', {data: this.props.navigation.state.params.data});
    this._setModalVisible(true);
  }

  _setModalVisible(isVisible) {
    this.setState({
      modalVisible: isVisible,
    });
  }

  _closeModal() {
    this._setModalVisible(false);
  }

  _onLoadStart() {
    console.log('on load start');
  }

  _onLoad() {
    console.log('on load');
  }

  _onProgress() {
    console.log('on progress');
  }

  _onEnd() {
    console.log('on end');
  }

  _onError() {
    console.log('on error');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  video: {
    width: width,
    height: 360,
    backgroundColor: '#000',
  },
  videoBox: {
    width: width,
    height: 360,
    backgroundColor: '#000',
  },
  scrollView: {},
  infoBox: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 30,
  },
  descBox: {
    flex: 1,
  },
  contentBox: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
    marginTop: 10,
  },
  contentText: {
    fontSize: 14,
  },
  nickname: {
    fontSize: 16,
  },
  title: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
  },
  bottomIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#eee',
    height: 38,
  },
  up: {
    color: '#ee735c',
  },
  bottomIcon: {
    flex: 1,
    fontSize: 26,
    color: '#ccc',
    textAlign: 'center',
  },
  closeIcon: {
    alignSelf: 'center',
    fontSize: 30,
    color: '#ee753c',
    marginTop: 40
  },
});

