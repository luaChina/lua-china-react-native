/**
 * Created by hejunwei on 17/01/2018.
 */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class ProfileComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      logined: false,
    };
  }

  _asyncAppStatus() {
    AsyncStorage.getItem('user')
      .then((data) => {
        let user;
        let newState = {};
        if (data) {
          user = JSON.parse(data);
        }
        if (user) {
          newState.user = user;
          newState.logined = true;
        } else {
          newState.logined = false;
        }
        this.setState(newState);
      });
  }

  _navigateLogin() {
    this.props.navigation.navigate('Login', {refresh: this._asyncAppStatus.bind(this)});
  }

  // 生命周期在 render 之后
  componentDidMount() {
    this._asyncAppStatus();
  }

  _renderUser() {
    return (
      <View>
        <View style={styles.userinfo}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('UserInfo', {
            user: this.state.user,
            refresh: this._asyncAppStatus.bind(this),
          })}>
            <View style={[styles.toolbar, styles.loginToolBar]}>
              <Image style={styles.avatar} source={{uri: this.state.user.avatar}}/>
              <View style={styles.userText}>
                <Text style={styles.username}>{this.state.user.name}</Text>
                <Text style={styles.userId}>用户ID: {this.state.user.id}</Text>
              </View>
              <FontAwesomeIcon name="angle-right" size={22} style={styles.toolbarAngle}/>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.profile}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('FeedBack')}>
            <View style={styles.toolbar}>
              <FontAwesomeIcon name="heart-o" size={22} style={styles.toolbarIcon}/>
              <Text style={styles.toolbarText}>
                我赞过的
              </Text>
              <FontAwesomeIcon name="angle-right" size={22} style={styles.toolbarAngle}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('FeedBack')}>
            <View style={styles.toolbar}>
              <FontAwesomeIcon name="history" size={22} style={styles.toolbarIcon}/>
              <Text style={styles.toolbarText}>
                最近浏览
              </Text>
              <FontAwesomeIcon name="angle-right" size={22} style={styles.toolbarAngle}/>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.logined
            ?
            this._renderUser()
            :
            <TouchableOpacity onPress={this._navigateLogin.bind(this)}>
              <View style={[styles.toolbar, styles.loginToolBar]}>
                <FontAwesomeIcon name="user-o" size={22} style={styles.toolbarIcon}/>
                <Text style={styles.toolbarText}>
                  快速登录
                </Text>
              </View>
            </TouchableOpacity>
        }
        <View style={styles.alwaysShowBar}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('FeedBack')}>
            <View style={styles.toolbar}>
              <FontAwesomeIcon name="comments-o" size={22} style={styles.toolbarIcon}/>
              <Text style={styles.toolbarText}>
                意见反馈
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutUs')}>
            <View style={styles.toolbar}>
              <FontAwesomeIcon name="group" size={22} style={styles.toolbarIcon}/>
              <Text style={styles.toolbarText}>
                关于我们
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SystemSetting', {
            user: this.state.user,
            refresh: this._asyncAppStatus.bind(this),
          })}>
            <View style={styles.toolbar}>
              <FontAwesomeIcon name="cog" size={22} style={styles.toolbarIcon}/>
              <Text style={styles.toolbarText}>
                设置
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('FeedBack')}>
            <View style={styles.toolbar}>
              <FontAwesomeIcon name="share-alt" size={22} style={styles.toolbarIcon}/>
              <Text style={styles.toolbarText}>
                推荐 App 给好友
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  alwaysShowBar: {
    marginTop: 40,
  },
  loginToolBar: {
    marginTop: 20,
    height: 70,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 5,
  },
  toolbarText: {
    fontSize: 16,
    textAlign: 'left',
    flex: 8,
  },
  toolbarIcon: {
    flex: 2,
    textAlign: 'center',
  },
  toolbarAngle: {
    flex: 1,
    textAlign: 'center',
  },
  profile: {
    marginTop: 40,
  },
  avatar: {
    flex: 2,
    width: 60,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 30,
  },
  userText: {
    flex: 9,
  },
  username: {
    fontSize: 18,
  },
  userId: {
    marginTop: 5,
    color: '#666',
    fontSize: 14,
  },
});