import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

class HomeComponent extends React.Component {
  render() {
    return (
      <View>
        <Text>This is Home Component</Text>
      </View>
    );
  }
}


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {times: 0};
  }

  timesPlus() {
    let times = this.state.times;
    times++;
    this.setState({
      times: times,
    });
  }

  componentWillMount() {
    console.log('componentWillMount');
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  shouldComponentUpdate() {
    console.log('shouldComponentUpdate');
    return true;
  }

  componentWillUpdate() {
    console.log('componentWillUpdate');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text onPress={this.timesPlus.bind(this)}>Click Me</Text>
        <Text>Click {this.state.times} times</Text>
        <HomeComponent/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
