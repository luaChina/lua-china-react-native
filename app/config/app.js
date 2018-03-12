/**
 * Created by hejunwei on 18/01/2018.
 */
'use strict';

let baseUrl = 'http://rapapi.org/mockjs/31154';

export default {
  api: {
    base: baseUrl,
    sendCode: baseUrl + '/send-code',
    login: baseUrl + '/login',
    logout: baseUrl + '/logout',
    posts: baseUrl + '/posts',
    favor: (postId) => {
      return baseUrl + '/posts/' + postId + '/favor';
    },
    comments: (postId) => {
      return baseUrl + '/posts/' + postId + '/comments';
    },
    users: baseUrl + '/users',
  },
  headers: {},

  qiniu: {
    AK: 'ptBnk7RyE6WE0m80zfYMnKNmArr6lrC0ooOzgqcz',
    SK: 'BsYL0TpJ3CUglNVE93IMBYpF0o-9M43LA9v0cMVA'
  },

  CLOUDINARY: {
    cloud_name: 'hejunwei',
    api_key: '989765712364399',
    api_secret: '0F0Jk8vK5gn_pnMlYzbQemMFOX0',
    base_delivery_url: 'http://res.cloudinary.com/hejunwei',
    api_base_url: 'https://api.cloudinary.com/v1_1/hejunwei',
    image: 'https://api.cloudinary.com/v1_1/hejunwei/image/upload',
    video: 'https://api.cloudinary.com/v1_1/hejunwei/video/upload',
    raw: 'https://api.cloudinary.com/v1_1/hejunwei/raw/upload',
  },
};