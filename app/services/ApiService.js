/**
 * Created by hejunwei on 18/01/2018.
 */
'use strict';

import React from 'react';
import {Alert} from 'react-native';
import queryString from 'query-string';
import _ from 'lodash';
import sha1 from 'sha1';
import config from '../config/app';
import Mock from 'mockjs';

export default class ApiService {

  static get(url, params = '') {
    if (params) {
      url += '?' + queryString.stringify(params);
    }
    return fetch(url)
      .then((response) => response.json())
      .then((response) => {
        return Mock.mock(response);
      }) // 上线注释该行
      .catch((error) => {
        console.warn(error);
      });
  }

  static post(url, data) {
    return fetch(url, {
      method: 'POST',
      headers: config.headers,
    }, data)
      .then((response) => response.json())
      .then((response) => Mock.mock(response)) // 上线注释该行
      .catch((error) => {
        console.warn(error);
      });
  }

  static put(url, data) {
    return fetch(url, {
      method: 'PUT',
      headers: config.headers,
    }, data)
      .then((response) => response.json())
      .then((response) => Mock.mock(response)) // 上线注释该行
      .catch((error) => {
        console.warn(error);
      });
  }


  static avatar(id, type) {
    return config.CLOUDINARY.base_delivery_url + '/' + type + '/upload/' + id;
  }

  static upload(file, callback, setProgress) {
    let timestamp = Date.now();
    let tags = 'app,avatar';
    let folder = 'avatar';
    // let signatureURL = config.CLOUDINARY.base + config.CLOUDINARY.signature;
    // this.post(signatureURL, {});
    let signature = 'folder=' + folder + '&tags=' + tags + '&timestamp=' + timestamp + config.CLOUDINARY.api_secret;
    signature = sha1(signature);
    let body = new FormData();
    body.append('timestamp', timestamp);
    body.append('folder', folder);
    body.append('signature', signature);
    body.append('tags', tags);
    body.append('api_key', config.CLOUDINARY.api_key);
    body.append('resource_type', 'image');
    body.append('file', file);

    //
    // return fetch(config.CLOUDINARY.image, {
    //   method: 'POST',
    // }, {
    //   timestamp: timestamp,
    //   folder: folder,
    //   signature: signature,
    //   tags: tags,
    //   api_key: config.CLOUDINARY.api_key,
    //   resource_type: 'image',
    //   file: file,
    // })
    //   .then((res) => {
    //     console.log(res);
    //   });

    let xhr = new XMLHttpRequest();
    xhr.open('POST', config.CLOUDINARY.image);
    xhr.onload = () => {
      if (xhr.status !== 200 || !xhr.responseText) {
        Alert.alert('请求失败');
        console.log(xhr.responseText);
        return;
      }
      try {
        let response = JSON.parse(xhr.responseText);
        if (response && response.public_id) {
          callback(this.avatar(response.public_id, 'image'));
        }
      } catch (e) {
        console.log(e);
      }
    };
    if (xhr.upload) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          setProgress(Number((event.loaded / event.total).toFixed(2)));
        }
      };
    }
    xhr.send(body);
    return xhr;
  }
}