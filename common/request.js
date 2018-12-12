import { mapState, mapMutations } from 'vuex';
export default function (obj) {
  var p = new Promise((resolve, reject) => {
    var baseUrl = 'http://47.100.226.135:8040'
    uni.request({
      url: baseUrl + obj.url,
      method: obj.method || 'GET',
      data: obj.data || {},
      header: obj.header || {},
			context:obj.context || '',
      success: res => {
        resolve(res.data)
      },
      fail: () => { reject() },
    });
  })
  return p
}
