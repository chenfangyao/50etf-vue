import store from '@/store'
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
  if (obj.method === 'GET') {
    let sid;
    //#ifndef H5
    sid = store.state.sid || ""
    // #endif
    // #ifdef H5
    sid = sessionStorage.getItem('etf_sid') || ""
    // #endif


    obj.header = obj.header || {}
    Object.assign(obj.header, {
      clienttype: 'web',
      ver: 'v1.0',
      sid,
    })
  }
  var baseUrl = 'http://47.100.226.135:8040'
  if (obj.url.indexOf('/Sapi') != -1) {
    baseUrl = 'http://47.100.226.135:8040'
  } else if (obj.url.indexOf('/fiftyEtf') != -1) {
    baseUrl = 'http://47.100.174.65:8011'
  }
  var p = new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + obj.url,
      method: obj.method || 'GET',
      data: obj.data || {},
      header: obj.header || {},
      context: obj.context || '',
      dataType: obj.dataType || '',
      success: res => {
        resolve(res.data)
      },
      fail: () => {
        reject()
      },
      complete() {
        isShowLoading = false
        store.commit("setloadingFlag", false);
      }
    });
  })
  return p
}
