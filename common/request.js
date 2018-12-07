export default function (obj) {
  var p = new Promise((resolve, reject) => {
    var baseUrl = 'http://47.100.226.135:8040'
    uni.request({
      url: baseUrl + obj.url,
      method: obj.method || 'GET',
      data: obj.data || {},
     // header: { 'content-type': ' application/json' },
      success: res => {
        resolve(res)
      },
      fail: () => { reject() },
    });
  })
  return p
}
