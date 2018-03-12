/**
 * Created by hejunwei on 25/01/2018.
 */
import React, {Component} from 'React';
import {View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, AsyncStorage} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import ApiService from '../../../services/ApiService';
import config from '../../../config/app';

let width = Dimensions.get('window').width;

export default class UserInfoComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.navigation.state.params.user,
    };
  }

  _logout() {
    ApiService.post(config.api.logout)
      .then((response) => {
        AsyncStorage.removeItem('user')
          .then((res) => {
            this.props.navigation.state.params.refresh();
            this.props.navigation.goBack();
          });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._logout.bind(this)}>
          <View style={styles.toolbar}>
            <Text style={styles.toolbarText}>
              退出登录
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 20,
    paddingLeft: 10,
  },
  toolbarText: {
    color: 'red',
    fontSize: 20,
  },
});