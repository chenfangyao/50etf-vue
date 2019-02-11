var responseOK=true
export function checkUpdate() {
  plus.runtime.getProperty(plus.runtime.appid, function (inf) {
    responseOK &&  _checkUpdate( inf.version)
  });
}
var checkUrl = "http://192.168.0.109:8085/apk/version";
 function _checkUpdate(wgtVer) {
  // plus.nativeUI.showWaiting("检测更新...");
   responseOK=false
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    switch (xhr.readyState) {
      case 4:
        // plus.nativeUI.closeWaiting();
        responseOK = true
        if (xhr.status == 200) {
          var newVer = xhr.responseText;
          if (wgtVer && newVer && (wgtVer != newVer)) {
            plus.nativeUI.confirm('应用检测到新版本，是否立即更新？', e=>{
              e.index === 0 && downWgt()
            } );
          } else {
            //plus.nativeUI.alert("当前已是最新版本");
          }
        } else {
          plus.nativeUI.alert("检测更新失败！");
        }
        break;
    }
  }
  xhr.open('GET', checkUrl);
  xhr.send();
}
// 下载wgt文件
var wgtUrl = "http://192.168.0.109:8085/apk/50etf.wgt";
function downWgt() {
  plus.nativeUI.showWaiting("下载更新包，请耐心等待…");
  plus.downloader.createDownload(wgtUrl, { filename: "_doc/update/" }, function (d, status) {
    if (status == 200) {
      installWgt(d.filename); // 安装wgt包
    } else {
      plus.nativeUI.alert("下载失败！");
    }
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
