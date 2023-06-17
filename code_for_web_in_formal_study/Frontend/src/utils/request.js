import axios from "axios";

const instance = axios.create({
    baseURL: 'http://47.113.196.28:8090',
    // baseURL: 'http://127.0.0.1:8090',
    timeout: 5000,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
});

// 请求封装方法
const request = (method, url, data = null) => {
    return instance({
      method,
      url,
      data,
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  };
  
// 封装常用的请求方法
export const get = (url, params = null) => {
    return request('get', url, { params });
};

export const post = (url, data) => {
    return request('post', url, data);
};
export default instance