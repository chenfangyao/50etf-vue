var wgtVer = null;
function plusReady() {
  // 获取本地应用资源版本号
  plus.runtime.getProperty(plus.runtime.appid, function (inf) {
    wgtVer = inf.version;
  });
}
/* if (window.plus) {
  plusReady();
} else {
  document.addEventListener('plusready', plusReady, false);
} */
var checkUrl = "http://demo.dcloud.net.cn/test/update/check.php";
export function checkUpdate(wgtVer) {
  plus.nativeUI.showWaiting("检测更新...");
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    switch (xhr.readyState) {
      case 4:
        plus.nativeUI.closeWaiting();
        if (xhr.status == 200) {
          var newVer = xhr.responseText;
          if (wgtVer && newVer && (wgtVer != newVer)) {
            downWgt();  
          } else {
            // plus.nativeUI.alert("当前已是最新版本");
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
var wgtUrl = "http://demo.dcloud.net.cn/test/update/H5EF3C469.wgt";
function downWgt() {
  plus.nativeUI.showWaiting("下载wgt文件...");
  plus.downloader.createDownload(wgtUrl, { filename: "_doc/update/" }, function (d, status) {
    if (status == 200) {
      installWgt(d.filename); // 安装wgt包
    } else {
      plus.nativeUI.alert("下载wgt失败！");
    }
    plus.nativeUI.closeWaiting();
  }).start();
}
function installWgt(path) {
  plus.nativeUI.showWaiting("安装更新资源...");
  plus.runtime.install(path, {}, function () {
    plus.nativeUI.closeWaiting();
    plus.nativeUI.alert("应用资源更新完成！", function () {
      plus.runtime.restart();
    });
  }, function (e) {
    plus.nativeUI.closeWaiting();
    plus.nativeUI.alert("安装wgt文件失败[" + e.code + "]：" + e.message);
  });
}
