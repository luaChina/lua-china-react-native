/**
 * Created by hejunwei on 22/01/2018.
 */

import React, {Component} from 'react';
import {
  Text,
  View,
  ListView,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import DynamicItem from './DynamicItemComponent';
import config from '../../config/app';
import ApiService from '../../services/ApiService';

let width = Dimensions.get('window').width;

let dynamicCachedResults = {
  nextPage: 1,
  items: [],
  total: 0,
};

export default class DynamicListComponent extends Component {
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      isLoading: false,
      isRefreshing: false,
    };
  }

  // that: this;


  // //es5的语法已经废弃了，用 constructor 替代
  // getInitialState() {
  //   const ds = new ListView.DataSource({
  //     rowHasChanged: (r1, r2) => r1 !== r2,
  //   });
  //   return {
  //     dataSource: ds.cloneWithRows([]),
  //   };
  // }

  // 前缀下划线，代表私有方法
  _renderRow(row) {
    return (<DynamicItem key={row.id} navigate={this.props.navigation.navigate} row={row}/>);
  }

  render() {
    return (
      <View>
        {/*<HeaderComponent/>*/}
        <ListView dataSource={this.state.dataSource}
                  renderRow={this._renderRow.bind(this)}
                  enableEmptySections={true}
                  automaticallyAdjustContentInsets={false}//ListView会自动留白，我们取消这个默认
                  onEndReached={this._fetchMoreData.bind(this)}//到达底部的事件
                  onEndReachedThreshold={20}//离底部一定距离即可进行加载
                  renderFooter={this._renderFooter.bind(this)}//渲染底部
                  showsVerticalScrollIndicator={false}//隐藏侧边滚动条
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.isRefreshing}
                      onRefresh={this._onRefresh.bind(this)}
                      tintColor='#ff6600'
                      title='拼命加载中...'
                    />
                  }
                  removeClippedSubviews = {false}
        />
      </View>
    );
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchData(p = 1, refresh = false) {

    if (refresh) {
      dynamicCachedResults = {
        nextPage: 1,
        items: [],
        total: 0,
      };
    }

    this.setState({
      isLoading: true,
    });

    ApiService.get(config.api.posts, {p})
      .then((response) => {
        let items;
        items = dynamicCachedResults.items.concat(response.data.data);
        dynamicCachedResults.items = items;
        dynamicCachedResults.total = response.data.total;
        dynamicCachedResults.nextPage++;
        setTimeout(() => {
          if (refresh) {
            // 先清空
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows([]),
            });
            // 再写入
            this.setState({
              isRefreshing: false,
              isLoading: false,
              dataSource: this.state.dataSource.cloneWithRows(items),
            });
          } else {
            this.setState({
              isLoading: false,
              dataSource: this.state.dataSource.cloneWithRows(items),
            });
          }
        }, 200);
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          isRefreshing: false,
        });
      });
  }

  _fetchMoreData() {
    if (!this._hasMore() || this.state.isLoading) {
      return;
    }

    this._fetchData(dynamicCachedResults.nextPage);
  }

  _hasMore() {
    return dynamicCachedResults.total > dynamicCachedResults.items.length;
  }

  _renderFooter() {
    if (!this._hasMore() && !this.state.isLoading) {
      return (
        <View style={styles.loadingMore}>
          <Text style={styles.loadingText}>没有更多了</Text>
        </View>
      );
    }

    return (<ActivityIndicator style={styles.loadingMore}/>);
  }

  _onRefresh() {
    console.log('refreshing');
    if (this.state.isRefreshing) {
      return;
    }
    this.setState({
      isRefreshing: true,
    });
    this._fetchData(1, true);
  }
}

const styles = StyleSheet.create({
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
    color: '#333',
  },
  commentIcon: {
    fontSize: 22,
    color: '#333',
  },
  loadingMore: {
    marginVertical: 20,
  },
  loadingText: {
    color: '#777',
    textAlign: 'center',
  },
});