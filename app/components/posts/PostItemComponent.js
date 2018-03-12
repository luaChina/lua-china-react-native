/**
 * Created by hejunwei on 19/01/2018.
 */
import React, {Component} from 'react';
import {Image, Text, TouchableHighlight, View, Dimensions, Alert} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import ApiService from '../../services/ApiService';
import config from '../../config/app';

let width = Dimensions.get('window').width;

export default class PostItemComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      row: this.props.row,
    };
  }

  render() {
    let row = this.state.row;
    return (
      <View>
        <TouchableHighlight onPress={this._loadPage.bind(this)}>
          <View style={styles.item}>
            <Text style={styles.title}>{row.title}</Text>
            <Image
              source={{uri: row.user.avatar}}
              style={styles.avatar}
            />
            {/*<Icon name="play" size={28} style={styles.play}/>*/}
            <View style={styles.itemFooter}>
              {/*<View style={styles.handleBox}>*/}
              {/*<Icon*/}
              {/*name={this.state.row.is_favor ? 'heart' : 'heart-o'}*/}
              {/*size={28}*/}
              {/*style={this.state.row.is_favor ? styles.up : styles.down}*/}
              {/*onPress={this._favor.bind(this)}*/}
              {/*/>*/}
              {/*<Text style={styles.handleText} onPress={this._favor.bind(this)}>喜欢</Text>*/}
              {/*</View>*/}
              {/*<View style={styles.handleBox}>*/}
              {/*<Icon*/}
              {/*name="comment"*/}
              {/*size={28}*/}
              {/*style={styles.commentIcon}/>*/}
              {/*<Text style={styles.handleText}>评论</Text>*/}
              {/*</View>*/}
            </View>
            <Text style={styles.footerText}>2017 01 02 发布</Text>
          </View>
        </TouchableHighlight>
      </View>
    );

  }

  _favor() {
    let row = this.state.row;
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

  _loadPage() {
    this.props.navigate('PostDetail', {data: this.state.row});
  }
}

const styles = {
  item: {
    width: width,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  avatar: {
    width: width,
    height: width * 0.5,
    resizeMode: 'cover',
  },
  title: {
    padding: 10,
    fontSize: 18,
    color: '#333',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
  },
  handleBox: {
    padding: 10,
    flexDirection: 'row',
    width: width / 2 - 0.5,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  play: {
    position: 'absolute',
    bottom: 24,
    right: 14,
    width: 46,
    height: 46,
    paddingTop: 9,
    paddingLeft: 18,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 23,
    color: '#3d7b66',
  },
  handelText: {
    paddingLeft: 12,
    fontSize: 18,
    color: '#333',
  },
  up: {
    fontSize: 22,
    color: 'red',
  },
  down: {
    fontSize: 22,
    color: '#333',
  },
  commentIcon: {
    fontSize: 22,
    color: '#333',
  },
  footerText: {
    color: '#999',
    marginLeft: 10,
    marginTop: 4,
  },
};