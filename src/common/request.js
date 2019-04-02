import axios from 'axios'
import store from '../vuex'
import Qs from 'qs'
import md5 from 'js-md5'

var isShowLoading = true;
//plus.storage.setItem(key, value);plus.storage.getItem(key);
localStorage.setItem('wgtURL', process.env.API_HOST)
axios.interceptors.response.use(function (response) {
  store.commit("setloadingFlag", false);
  isShowLoading = false;
  return response.data;
}, function (error) {
  store.commit("setloadingFlag", false);
    isShowLoading = false;
    plus.nativeUI.toast('服务器连接异常')
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
  let sid = store.state.sid
  let hrand = +new Date() + '000'

  obj.header = obj.header || {}
  Object.assign(obj.header, {
    clienttype: process.env.clienttype ,
    ver: 'v1.0',
    sid,
    hrand,
    hsign: md5('app|' + hrand),
    'X-Requested-With': 'XMLHttpRequest' 
  })
  if (store.state.appObj){
    Object.assign(obj.header, {
      device: store.state.appObj.device, 
      clientsysver: store.state.appObj.clientsysver,
    })
  }

  var opt = {
    url: obj.url,
    baseURL: process.env.API_HOST,
    method: obj.method || 'get',
    headers: obj.header ,
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
