/**
 * Created by hejunwei on 20/01/2018.
 */
import React, {Component} from 'react';
import {View, Dimensions, Image, Text} from 'react-native';
let width = Dimensions.get('window').width;

export default class CommentItemComponent extends Component {

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
        <View style={styles.infoBox}>
          <Image style={styles.avatar} source={{uri: row.user.avatar}}/>
          <View style={styles.descBox}>
            <Text style={styles.nickname}>{row.user.name}</Text>
            <Text style={styles.title}>{row.content}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
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
  title: {
    marginTop: 8,
    color: '#666',
  },
};