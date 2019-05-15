import md5 from 'js-md5'
import store from '../vuex'
var responseOK = true
var baseURL = process.env.API_HOST
var nativeW = null, downPercent = 0
export function checkUpdate() {
  plus.runtime.getProperty(plus.runtime.appid, function (inf) {
    store.commit('setappObj', { device: plus.device.imei, clientsysver: inf.version })
    responseOK && getVer(inf.version)
  });
}
var checkUrl = baseURL + "/Sapi/Soft/last?clienttype=app&version=";
function getVer(wgtVer) {
  responseOK = false
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    switch (xhr.readyState) {
      case 4:
        if (xhr.status == 200) {
          var obj = JSON.parse(xhr.responseText)
          if (obj.data.not_auth == 1) return;
          if (obj.data.list.length == 0) return;
          var newVer = Number(obj.data.list[0].version);
          var downurl = obj.data.list[0].downurl;
          var is_force = obj.data.list[0].is_force;
          if (wgtVer && newVer && (wgtVer < newVer)) {
            if (is_force == 0) {
              plus.nativeUI.confirm('应用需要修复一些缺陷，建议修复',
                e => { e.index === 0 && downWgt(baseURL + downurl) },
                { "buttons": ["好的", "下次"], }
              );
            } else {
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
  xhr.setRequestHeader('clienttype', 'app')
  xhr.setRequestHeader('device', plus.device.imei)
  xhr.setRequestHeader('hrand', hrand)
  xhr.setRequestHeader('sid', store.state.sid)
  xhr.setRequestHeader('hsign', md5('app|' + hrand))
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  xhr.send();
}
function onStateChanged(download, status) {
  if (status == 404) {
    download.abort()
    nativeW.close()
    plus.nativeUI.alert("下载失败！:" + status);
  }
  if (download.totalSize > 0) {
    if (parseInt(download.downloadedSize / download.totalSize * 100) > downPercent) {
      downPercent = parseInt(download.downloadedSize / download.totalSize * 100)
      nativeW.setTitle('下载中…… ' + downPercent + '%')
    }
  }
}
// 下载wgt文件
function downWgt(url) {
  nativeW = plus.nativeUI.showWaiting("下载中…0%");
  var dtask = plus.downloader.createDownload(url, { filename: "_doc/update/" }, function (d, status) {
    if (status == 200) {
      installWgt(d.filename); 
    } else {
      plus.nativeUI.alert("下载失败！:" + status);
    }
    responseOK = true
    nativeW.close()
  });
  dtask.addEventListener("statechanged", onStateChanged, false);
  dtask.setRequestHeader('sid', store.state.sid);
  dtask.start();
}
function installWgt(path) {
  plus.nativeUI.showWaiting("下载完成，正在安装…");
  plus.runtime.install(path, { force: true }, function () {
    plus.nativeUI.closeWaiting();
    plus.nativeUI.alert("应用资源更新完成！", function () {
      plus.runtime.restart();
    });
  }, function (e) {
    plus.nativeUI.closeWaiting();
    plus.nativeUI.alert("安装失败[" + e.code + "]：" + e.message);
  });
}
