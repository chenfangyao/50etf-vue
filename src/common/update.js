import md5 from 'js-md5'
import store from '../vuex'
//plus.storage.getItem(key);
var responseOK=true
// const baseURL = 'http://dswx.newcard.com.cn'
const baseURL = 'http://wxv.zjkj888.cn'
function setTheme(val){
  if (val) {
    plus.navigator.setStatusBarBackground("#181c28");
    plus.navigator.setStatusBarStyle("light");
  } else {
    plus.navigator.setStatusBarBackground("#f0f0f0");
    plus.navigator.setStatusBarStyle("dark");
  }
}
export function checkUpdate() {
  setTheme(store.state.atNight)
  plus.runtime.getProperty(plus.runtime.appid, function (inf) {
    store.commit('setappObj', { device: plus.device.imei, clientsysver: inf.version })
    responseOK &&  getVer( inf.version)
  });
}
var checkUrl = baseURL+"/Sapi/Soft/last?clienttype=app&version=";
 function getVer(wgtVer) {
  // plus.nativeUI.showWaiting("检测更新...");
   responseOK=false
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    switch (xhr.readyState) {
      case 4:
        // plus.nativeUI.closeWaiting();
        if (xhr.status == 200) {
          var obj = JSON.parse(xhr.responseText)
          if (obj.data.list.length==0)return;
          var newVer = obj.data.list[0].version;
          var downurl = obj.data.list[0].downurl;
          if (wgtVer && newVer && (wgtVer < newVer)) {
            plus.nativeUI.confirm('应用检测到新版本，是否立即更新？', e=>{
              e.index === 0 && downWgt(baseURL+downurl)
            } );
          } else {
            responseOK = true
            //plus.nativeUI.alert("当前已是最新版本");
          }
        } else {
          plus.nativeUI.alert("检测更新失败！");
        }
        break;
    }
  }
   let hrand = +new Date() + '000'
  xhr.open('GET', checkUrl + wgtVer);
  xhr.setRequestHeader('clienttype','app')
   xhr.setRequestHeader('device', plus.device.imei )
   xhr.setRequestHeader('hrand', hrand  )
   xhr.setRequestHeader('hsign', md5('app|' + hrand) )
   xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest'  )
   xhr.send();
}
// 下载wgt文件
function downWgt(url) {
  plus.nativeUI.showWaiting("下载更新包，请耐心等待…");
  plus.downloader.createDownload(url, { filename: "_doc/update/" }, function (d, status) {
    if (status == 200) {
      installWgt(d.filename); // 安装wgt包
    } else {
      plus.nativeUI.alert("下载失败！:" + status);
    }
    responseOK = true
    plus.nativeUI.closeWaiting();
  }).start();
}
function installWgt(path) {
  plus.nativeUI.showWaiting("下载完成，正在安装…");
  plus.runtime.install(path, {}, function () {
    plus.nativeUI.closeWaiting();
    plus.nativeUI.alert("应用资源更新完成！", function () {
      plus.runtime.restart();
    });
  }, function (e) {
    plus.nativeUI.closeWaiting();
    plus.nativeUI.alert("安装失败[" + e.code + "]：" + e.message);
  });
}
