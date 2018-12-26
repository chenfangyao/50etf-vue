<script>
export default {
  onLaunch() {
    //#ifdef APP-PLUS
    var server = "https://uniapp.dcloud.io/update"; //检查更新地址
    var req = { //升级检测数据
      "appid": plus.runtime.appid,
      "version": plus.runtime.version,
      "imei": plus.device.imei
    };
    uni.request({
      url: server,
      data: req,
      success: (res) => {
        console.log("success", res);
        if (res.statusCode == 200 && res.data.isUpdate) {
          let openUrl = plus.os.name === 'iOS' ? res.data.iOS : res.data.Android;
          uni.showModal({ //提醒用户更新
            title: '更新提示',
            content: res.data.note ? res.data.note : '是否选择更新',
            success: (res) => {
              if (res.confirm) {
                plus.runtime.openURL(openUrl);
              }
            }
          })
        }
      }
    })
    //#endif
  },
  onError(err) {
    console.log(err)
  },
  onShow() {
    console.log('App Show')
  },
  onHide() {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
@import "./common/uni.css";
page > view {
  padding-top: var(--status-bar-height);
  font-family: MicrosoftYaHei;
  font-weight: 400;
}
</style>
