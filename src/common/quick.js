Vue.directive('vtap', {
  bind: function (el, binding) {
    var startTx, startTy, endTx, endTy, startTime, endTime;

    el.addEventListener("touchstart", function (e) {
      var touch = e.touches[0];
      startTx = touch.clientX;
      startTy = touch.clientY;
      startTime = +new Date()
    }, false);

    el.addEventListener("touchend", function (e) {
      endTime = +new Date()
      if (endTime - startTime > 300) {
        return
      }

      var touch = e.changedTouches[0];
      endTx = touch.clientX;
      endTy = touch.clientY;
      if (Math.abs(startTx - endTx) < 6 && Math.abs(startTy - endTy) < 6) {
        var method = binding.value.method;
        var params = binding.value.params;
        method(params);
      }
    }, false);
  }
})

 /* < div id = "test"  v-vtap="{method:test,params:some}" >
var vm = new Vue({
    el: "#test",
    data: {
      some: "ok!"
    },
    method: {
      test: function (ee) {
        console.log(ee)
      }
    }
  }) */
