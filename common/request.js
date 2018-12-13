import store from '@/store'
export default function (obj) {
  var isShowLoading = true;
  if (obj.loading == undefined) {
    obj.loading = true
  }
  setTimeout(() => {
    if (isShowLoading && obj.loading) {
       store.commit("setloadingFlag",true);
    }
  }, 500);
  if (obj.method === 'GET') {
    Object.assign(obj.header, {
      clienttype: 'web',
      ver: 'v1.0',
      sid: store.state.sid || ""
    })
  }
  var p = new Promise((resolve, reject) => {
    var baseUrl = 'http://47.100.226.135:8040'
    uni.request({
      url: baseUrl + obj.url,
      method: obj.method || 'GET',
      data: obj.data || {},
      header: obj.header || {},
      context: obj.context || '',
      success: res => {
        resolve(res.data)
      },
      fail: () => {
        reject()
      },
      complete() {
        isShowLoading = false
        store.commit("setloadingFlag",false);
      }
    });
  })
  return p
}
