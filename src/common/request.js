import axios from 'axios'
import store from '../vuex'
import Qs from 'qs'
var isShowLoading = true;

axios.interceptors.response.use(function (response) {
  store.commit("setloadingFlag", false);
  isShowLoading = false;
  return response.data;
}, function (error) {
  store.commit("setloadingFlag", false);
    isShowLoading = false;
  return Promise.reject(error);
});
axios.interceptors.request.use(function (config) {
  if (config.method == 'get') {
       config.data = true
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});
export default function (obj) {

  /* if (obj.loading == undefined) {
    obj.loading = true
  } */
  isShowLoading = true;
  setTimeout(() => {
    if (isShowLoading && obj.loading) {
      store.commit("setloadingFlag", true);
    }
  }, 500);
  let sid = store.state.sid || sessionStorage.getItem('etf_sid') || ""
  obj.header = obj.header || {}
  Object.assign(obj.header, {
    clienttype: 'web',
    ver: 'v1.0',
    sid,
  })
  // }
  var baseURL = 'http://172.26.63.158'
  if (obj.url.indexOf('/Sapi') != -1) {
    baseURL = 'http://47.100.226.135:8040'
  } else if (obj.url.indexOf('/fiftyEtf') != -1) {
    baseURL = 'http://47.100.174.65:8011'
    // baseURL = 'http://47.100.4.249:9221'
    // baseURL = 'http://172.26.63.164:8184'
  } else if (obj.url.indexOf('getCommonSelectStock') != -1 || obj.url.indexOf('getTimeSharingInfo') != -1) {
    baseURL = 'http://47.100.165.236:8181'
  } else if (obj.url.indexOf('/market') != -1) {
    baseURL = 'http://50etfvue.cardoctor.com.cn'
  }
  var opt = {
    url: obj.url,
    baseURL: process.env.NODE_ENV === 'production' ? baseURL : '',
    method: obj.method || 'get',
    headers: obj.header || {},
    timeout: 30000,
    responseType: obj.dataType || '',
  }
  if (obj.method === 'GET') {//|| (obj.header['Content-Type'] == 'application/x-www-form-urlencoded')
    opt.params = obj.data || {}
  } else if (obj.header['Content-Type'] == 'application/x-www-form-urlencoded'){
    // opt.transformRequest=function(data){
    //   return Qs.stringify(obj.data)
    // }
    opt.data = Qs.stringify(obj.data) || {}
  } else {
    opt.data = obj.data || {}
  }

  return axios(opt);
}
