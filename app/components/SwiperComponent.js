import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
  View,
  Image,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import Swiper from 'react-native-swiper';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({routeName: 'Main'}),
  ],
});

export default class SwiperComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      banners: [
        require('../../images/swiper1.jpg'),
        require('../../images/swiper2.jpg'),
        require('../../images/swiper3.jpg'),
      ],
    };
  }

  componentWillMount() {
    let firstEntry = AsyncStorage.getItem('first_entry');
    if (!firstEntry) {
      this.props.navigation.dispatch(resetAction);
    }
  }

  _enter() {
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <Swiper
        style={styles.container}
        dot={<View style={styles.dot}/>}
        activeDot={<View style={styles.activeDot}/>}
        paginationStyle={styles.pagination}
        loop={false}
      >
        <View style={styles.slide}>
          <Image style={styles.image} source={this.state.banners[0]}/>
        </View>
        <View style={styles.slide}>
          <Image style={styles.image} source={this.state.banners[1]}/>
        </View>
        <View style={styles.slide}>
          <Image style={styles.image} source={this.state.banners[2]}/>
          <TouchableOpacity
            style={styles.btnWrapper}
            onPress={this._enter.bind(this)}
          ><Text style={styles.btnText}>马上体验</Text></TouchableOpacity>
        </View>
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  image: {
    width: width,
    height: height,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  btnWrapper: {
    position: 'absolute',
    width: width-20,
    bottom: 70,
    height: 50,
    padding: 10,
    left: 10,
    backgroundColor: '#ee735c',
    borderColor: '#ee735c',
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    // textAlign: 'center',
    fontSize: 20,
    color: '#fff',
  },
  dot: {
    backgroundColor: 'transparent',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 7,
    width: 14,
    height: 14,
    marginLeft: 12,
    marginRight: 12,
  },
  activeDot: {
    width: 14,
    height: 14,
    borderWidth: 1,
    borderRadius: 7,
    marginLeft: 12,
    marginRight: 12,
    backgroundColor: '#ee735c',
    borderColor: '#ff6600',
  },
  pagination: {
    bottom: 30,
  },
});