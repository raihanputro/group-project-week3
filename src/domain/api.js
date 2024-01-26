import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  ping: 'ping.json',
  getAllPost: 'post',
  user: 'user',
  post: 'post',
  comment: 'comment',
};

export const callAPI = async (endpoint, method, header = {}, params = {}, data = {}) => {
  const defaultHeader = {
    'Content-Type': 'x-www-form-urlencoded; charset=UTF-8',
  };

  const headers = merge(defaultHeader, header);
  const options = {
    url: config.api.host + endpoint,
    method,
    headers,
    data,
    params,
  };

  return request(options).then((response) => {
    const responseAPI = response.data;
    return responseAPI;
  });
};

export const ping = () => callAPI(urls.ping, 'get');
export const getAllPost = () => callAPI(urls.getAllPost, 'get');

export const RegisterUser = (datauser) => callAPI(urls.user, 'POST', {}, {}, datauser);

export const LoginUser = () => callAPI(urls.user, 'GET');

export const createNewPost = (formData) => callAPI(urls.post, 'POST', {}, {}, formData);
export const getMyPostApi = (userId) => callAPI(urls.post, 'GET', {}, { user_id: userId });
export const deletePostApi = (id) => callAPI(`${urls.post}/${id}`, 'DELETE');
export const getPostDetailApi = (id) => callAPI(`${urls.post}/${id}`, 'GET');
export const getPostCommentsApi = (postid) => callAPI(urls.comment, 'GET', {}, { post_id: postid });
