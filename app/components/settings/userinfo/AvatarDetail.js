/**
 * Created by hejunwei on 25/01/2018.
 */
import React, {Component} from 'React';
import {View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, AsyncStorage} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import config from '../../../config/app';
import ApiService from '../../../services/ApiService';
import * as Progress from 'react-native-progress';

let width = Dimensions.get('window').width;

let options = {
  title: '选择头像',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '选择相册',
  quality: 0.75,
  allowsEditing: true,
  noData: false,
  storageOptions: {
    skipBackup: true, // 不会被自动传到 iCloud
    path: 'images', // 存储到 Document/
  },
};

export default class UserInfoComponent extends Component {

  static navigationOptions = ({navigation}) => {
    const {state, setParams, navigate} = navigation;

    return {
      headerRight: <FontAwesomeIcon name="align-justify" size={20} color="#fff" onPress={() => {
        ImagePicker.showImagePicker(options, (response) => {
          // console.log('Response = ', response);

          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else {
            // let source = {uri: response.uri};
            // You can also display the image using data:
            let base64Image = 'data:image/jpeg;base64,' + response.data;

            state.params.changeUploadStatus();
            // 上传文件，并返回上传后的路径
            ApiService.upload(base64Image, (response) => {
              ApiService.put(config.api.users, {value: response, type: 'avatar'});
              // 获取本地存储的用户信息
              AsyncStorage.getItem('user')
                .then((res) => {
                  let user = JSON.parse(res);
                  // 替换头像地址
                  user.avatar = response;
                  // 存储进去
                  AsyncStorage.setItem('user', JSON.stringify(user))
                    .then((res) => {
                      // 刷新 navigation 的 params
                      setParams({user: user});
                      // 刷新 profile 页
                      state.params.refreshProfile();
                      // 刷新 userinfo 页
                      state.params.refreshUserInfo();
                      // 刷新当前显示的头像
                      state.params.refreshAvatar();
                      // 更改更新状态
                      state.params.changeUploadStatus();
                    });
                });
            }, (progress) => {
              state.params.changeProgress(progress);
            });
          }
        });
      }
      }/>,
    };
  };


  constructor(props) {
    super(props);
    this.state = {
      user: this.props.navigation.state.params.user,
      uploading: false,
      progress: 0,
    };
  }

  // 生命周期在 render 之前，官方推荐这么写，不推荐把 set 放在 constructor 里边
  componentWillMount() {
    this.props.navigation.setParams({
      refreshAvatar: this.refreshAvatar.bind(this),
      changeUploadStatus: this.changeUploadStatus.bind(this),
      changeProgress: this.changeProgress.bind(this),
    });
  }

  changeUploadStatus() {
    this.setState({
      uploading: !this.state.uploading,
      progress: 0,
    });
  }

  changeProgress(progress) {
    this.setState({
      progress: progress,
    });
  }

  refreshAvatar() {
    this.setState({
      user: this.props.navigation.state.params.user,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={{uri: this.state.user.avatar}}
               style={[styles.avatar, this.state.uploading ? styles.uploading : null]}>
          {this.state.uploading
            ?
            <Progress.Circle
              showText={true}
              size={75}
              color={'#ee735c'}
              progress={this.state.progress}
            />
            :
            null}
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  avatar: {
    marginTop: 80,
    width: width,
    height: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploading: {
    // opacity: 0.5,
  },
});