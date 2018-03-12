/**
 * Created by hejunwei on 20/01/2018.
 */
import React, {Component} from 'React';
import {View, Text, ListView, RefreshControl, ActivityIndicator, StyleSheet} from 'react-native';
import CommentItemComponent from './CommentItemComponent';
import ApiService from '../../services/ApiService';
import config from '../../config/app';

let cachedResults = {
  nextPage: 1,
  items: [],
  total: 0,
};

export default class CommentListComponent extends Component {

  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      isLoading: false,
      isRefreshing: false,
      cachedResults: {
        nextPage: 1,
        items: [],
        total: 0,
      },
    };
  }

  _renderRow(row) {
    return (<CommentItemComponent key={row.id} navigate={this.props.navigation.navigate} row={row}/>);
  }

  _fetchMoreData() {
    if (!this._hasMore() || this.state.isLoading) {
      return;
    }

    this._fetchData(this.state.cachedResults.nextPage);
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchData(p = 1, refresh = false) {
    if (refresh) {
      this.state.cachedResults = {
        nextPage: 1,
        items: [],
        total: 0,
      };
    }
    this.setState({
      isLoading: true,
    });
    console.log('fetch data  ', p, config.api.comments(this.props.navigation.state.params.postId));
    ApiService.get(config.api.comments(this.props.navigation.state.params.postId), {p})
      .then((response) => {
        console.log(response);
        let items;
        items = this.state.cachedResults.items.concat(response.data.data);
        this.state.cachedResults.items = items;
        this.state.cachedResults.total = response.data.total;
        this.state.cachedResults.nextPage++;
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

  _hasMore() {
    return this.state.cachedResults.total > this.state.cachedResults.items.length;
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

  render() {
    return (
      <View>
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
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingMore: {
    marginVertical: 20,
  },
  loadingText: {
    color: '#777',
    textAlign: 'center',
  },
});