/**
 * Created by hejunwei on 25/01/2018.
 */
import React, {Component} from 'React';
import {View, Text, StyleSheet, TouchableOpacity, Image, AsyncStorage} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class UserInfoComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.navigation.state.params.user,
    };
  }

  refreshUserInfo() {
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

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('AvatarDetail', {
          user: this.state.user,
          refreshProfile: this.props.navigation.state.params.refresh,
          refreshUserInfo: this.refreshUserInfo.bind(this),
        })}>
          <View style={[styles.toolbar, styles.loginToolBar]}>
            <Text style={[styles.toolbarText]}>
              头像
            </Text>
            <Image source={{uri: this.state.user.avatar}} style={styles.avatar}/>
            <FontAwesomeIcon name="angle-right" size={22} style={styles.toolbarAngle}/>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Username', {
          user: this.state.user,
          refreshProfile: this.props.navigation.state.params.refresh,
          refreshUserInfo: this.refreshUserInfo.bind(this),
        })}>
          <View style={styles.toolbar}>
            <Text style={styles.toolbarText}>
              用户名称
            </Text>
            <Text style={styles.toolbarUsername}>{this.state.user.name}</Text>
            <FontAwesomeIcon name="angle-right" size={22} style={styles.toolbarAngle}/>
          </View>
        </TouchableOpacity>
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
    paddingLeft: 10,
  },
  toolbarText: {
    fontSize: 20,
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
  avatar: {
    flex: 2,
    width: 60,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 30,
  },
  toolbarUsername: {
    fontSize: 16,
    color: '#666',
  },
});