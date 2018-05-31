import axios from 'axios';
import defaultConfig from './config'
import Qs from 'qs'
//import objectAssign from 'object-assign';

/**
 * 用于网络请求
 * @param  {String} url                   url地址
 * @param  {String} [method='GET']        请求方法
 * @param  {Object|String} data           请求参数
 * @param  {Object} header                请求头部
 * @param  {String} [dataType='json']     发送数据的类型
 * @return {Object}                       返回一个 Promise 对象
 */
const request = ({ url, method = 'GET', data = {}, header={},dataType = 'json',withCredentials=false,timeout=10000}) => {
  return new Promise((resolve, reject) => {
    let config = {
      method          :   method,
      url             :   url,
      data            :   data,
      responseType    :   dataType,
      timeout         :   timeout,
      headers         :   header,
      withCredentials :   withCredentials
    }
    let opts = Object.assign(defaultConfig, config || {});

    if(method.toUpperCase() == 'GET' || method.toUpperCase() == 'DELETE'){
      opts.params = data ? data : '';
    }

    /*添加请求拦截器*/
    axios.interceptors.request.use(function(opts){
     //console.log('loading...')
     return opts;
    },function(error){
      /*请求错误时做些事*/
      return Promise.reject(error);
    });

    /*添加响应拦截器*/
    axios.interceptors.response.use(function(response){
      //console.log('done...')
      return response;
    },function(error){
      /*请求错误时做些事*/
      return Promise.reject(error);
    });

    axios(opts).then((resource) => {
      resolve(resource.data)
    })
    .catch((error) => {
      reject(error)
    });
  })
}

export default {
  install (Vue) {
    Vue.prototype.$request = request
    Vue.request = request
  },
  $request: request
}

export const $request = request
