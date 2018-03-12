import React from 'react';
import {
  StyleSheet,
  Platform,
  Image,
} from 'react-native';
import PostListComponent from './app/components/posts/PostListComponent';
import ProfileComponent from './app/components/settings/ProfileComponent';
import {StackNavigator, TabNavigator} from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PostShowComponent from './app/components/posts/PostShowComponent';
import CommentCreateComponent from './app/components/comments/CommentCreateComponent';
import CommentListComponent from './app/components/comments/CommentListComponent';
import DynamicListComponent from './app/components/dynamic/DynamicListComponent';
import LoginComponent from './app/components/auth/LoginComponent';
import AboutUsComponent from './app/components/settings/AboutUsComponent';
import FeedBackComponent from './app/components/settings/FeedBackComponent';
import UserInfoComponent from './app/components/settings/userinfo/UserInfoComponent';
import AvatarDetail from './app/components/settings/userinfo/AvatarDetail';
import SystemSetting from './app/components/settings/menus/SystemSetting';
import Username from './app/components/settings/userinfo/Username';
import SwiperComponent from './app/components/SwiperComponent';

// Get rid of “Remote debugger is in a background tab” warning
console.ignoredYellowBox = ['Remote debugger'];

const TabNav = TabNavigator(
  {
    List: {
      screen: PostListComponent,
      path: '/',
      navigationOptions: {
        title: '文章',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#ee735c',
        },
        tabBarTestIDProps: {
          testID: 'TEST_ID_HOME',
          accessibilityLabel: 'TEST_ID_HOME_ACLBL',
        },
        tabBarLabel: '文章',
        tabBarIcon: ({tintColor, focused}) => (
          <Image
            source={focused ? require('./images/lua-selected.png') : require('./images/lua-unselected.png')}
            style={styles.iconImage}
          />
        ),
      },
    },
    Dynamic: {
      screen: DynamicListComponent,
      path: 'dynamic',
      navigationOptions: {
        title: '行业动态',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#ee735c',
        },
        tabBarLabel: '动态',
        tabBarIcon: ({tintColor, focused}) => (
          <FontAwesome
            name={'globe'}
            size={26}
            style={[{color: tintColor}, styles.icons]}
          />
        ),
      },
    },
    Profile: {
      screen: ProfileComponent,
      path: 'profile',
      navigationOptions: {
        title: '我的',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#ee735c',
        },
        tabBarLabel: '我的',
        tabBarIcon: ({tintColor, focused}) => (
          <FontAwesome
            name={'user'}
            size={26}
            style={[{color: tintColor}, styles.icons]}
          />
        ),
      },
    },
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? '#ee735c' : '#fff',
    },
  },
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    margin: 50,
    fontSize: 40,
  },
  iconImage: {
    height: 26,
    width: 26,
  },
  icons: {
    height: 26,
    width: 26,
    textAlign: 'center',
  },
});

// 初始化路由类型
const StackOverTabs = StackNavigator({
  Swiper: {
    screen: SwiperComponent,
    navigationOptions: {
      header: null,
    },
  },
  Main: {
    screen: TabNav,
  },
  Login: {
    screen: LoginComponent,
    navigationOptions: {
      title: '登录',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#ee735c',
      },
    },
  },
  PostDetail: {
    name: 'PostDetail',
    screen: PostShowComponent,
    navigationOptions: {
      title: '文章详情',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#ee735c',
      },
    },
  },
  CommentList: {
    name: 'CommentList',
    screen: CommentListComponent,
    navigationOptions: {
      title: '评论列表',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#ee735c',
      },
    },
  },
  CommentCreate: {
    name: 'CommentCreate',
    screen: CommentCreateComponent,
    navigationOptions: {
      title: '发表评论',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#ee735c',
      },
    },
  },
  AboutUs: {
    name: 'AboutUs',
    screen: AboutUsComponent,
    navigationOptions: {
      title: '关于我们',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#ee735c',
      },
    },
  },
  FeedBack: {
    name: 'FeedBack',
    screen: FeedBackComponent,
    navigationOptions: {
      title: '意见反馈',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#ee735c',
      },
    },
  },
  UserInfo: {
    name: 'UserInfo',
    screen: UserInfoComponent,
    navigationOptions: {
      title: '个人设置',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#ee735c',
      },
    },
  },
  AvatarDetail: {
    name: 'AvatarDetail',
    screen: AvatarDetail,
    navigationOptions: {
      title: '头像',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#ee735c',
        paddingRight: 10,
      },
    },
  },
  SystemSetting: {
    name: 'SystemSetting',
    screen: SystemSetting,
    navigationOptions: {
      title: '设置',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#ee735c',
        paddingRight: 10,
      },
      headerTitleStyle: {},
    },
  },
  Username: {
    name: 'Username',
    screen: Username,
    navigationOptions: {
      title: '名称',
      headerTintColor: '#fff',
    },
  },
});

export default StackOverTabs;
