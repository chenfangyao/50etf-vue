import md5 from 'js-md5'
import store from '../vuex'
var responseOK=true
var baseURL = process.env.API_HOST 

export function checkUpdate() {
  plus.runtime.getProperty(plus.runtime.appid, function (inf) {
    store.commit('setappObj', { device: plus.device.imei, clientsysver: inf.version })
    responseOK &&  getVer( inf.version)
  });
}
var checkUrl = baseURL+"/Sapi/Soft/last?clienttype=app&version=";
 function getVer(wgtVer) {
   responseOK=false
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    switch (xhr.readyState) {
      case 4:
        if (xhr.status == 200) {
          var obj = JSON.parse(xhr.responseText)
          if (obj.data.not_auth==1)return;
          if (obj.data.list.length==0)return;
          var newVer = Number(obj.data.list[0].version);
          var downurl = obj.data.list[0].downurl;
          var is_force = obj.data.list[0].is_force;
          if (wgtVer && newVer && (wgtVer < newVer)) {
            if (is_force==0){
              plus.nativeUI.confirm('应用检测到新版本，是否立即更新？', e=>{
                e.index === 0 && downWgt(baseURL+downurl)
              } );
            }else{
              // plus.nativeUI.showWaiting("正在更新，请稍后...");
              downWgt(baseURL + downurl)
            }
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
   xhr.setRequestHeader('sid', store.state.sid)
   xhr.setRequestHeader('hsign', md5('app|' + hrand) )
   xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest'  )
   xhr.send();
}
function onStateChanged(download, status) {
  console.log(download);
  console.log(status);
  if (download.state == 4 && status == 200) {
    // 下载完成 
  }
}
// 下载wgt文件
function downWgt(url) {
  plus.nativeUI.showWaiting("下载更新包，请耐心等待…");
  var dtask = plus.downloader.createDownload(url, { filename: "_doc/update/" }, function (d, status) {
    if (status == 200) {
     installWgt(d.filename); // 安装wgt包
    } else {
      plus.nativeUI.alert("下载失败！:" + status);
    }
    responseOK = true
    plus.nativeUI.closeWaiting();
  });
  // dtask.addEventListener("statechanged", onStateChanged, false);
  dtask.setRequestHeader('sid', store.state.sid);
  dtask.start();
}
function installWgt(path) {
  plus.nativeUI.showWaiting("下载完成，正在安装…");
  plus.runtime.install(path, { force: true}, function () {
    plus.nativeUI.closeWaiting();
    plus.nativeUI.alert("应用资源更新完成！", function () {
      plus.runtime.restart();
    });
  }, function (e) {
    plus.nativeUI.closeWaiting();
    plus.nativeUI.alert("安装失败[" + e.code + "]：" + e.message);
  });
}
