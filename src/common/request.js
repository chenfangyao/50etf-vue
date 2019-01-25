import axios from 'axios'
import store from '../vuex'
export default function (obj) {
  var isShowLoading = true;
  if (obj.loading == undefined) {
    obj.loading = true
  }
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


  axios.interceptors.response.use(function (response) {
    return response.data;
  }, function (error) {
    return Promise.reject(error);
  });






  return axios({
    url: obj.url,
    baseURL,
    method: obj.method || 'get',
    headers: obj.header || {},
    timeout: 10000,
    responseType: obj.dataType || '',
    data: obj.data || {},
    params: obj.data || {},

  });
}
