<template>
  <div>
    <h5>你好世界</h5>
    <span @touchend="go">back</span>
    <input type="range" v-model='va'>
  </div>
</template>
<script>
export default {
  data(){
    return{
      va:''
    }
  },
  watch:{
    va(val){
      console.log(val);
    }
  },
  methods: {
    go() {
      var options = {
        url: '/Sapi/User/info', //请求接口
        method: 'GET', //请求方法全部大写，默认GET
      }
      this.$httpReq(options).then((res) => {
        // 请求成功的回调
        // res为服务端返回数据的根对象
        console.log('用户信息', res)
      // this.$router.go(-1)
      })
    }
  },
}
</script>

<style lang="scss" scoped>

span {
  font-size: .40rem;
  padding: .1rem;
  user-select: none;
  background-color:#007aff;
}
h5 {
  width: 100vw;
}
div{
  color: #f5e011;
}
/*清除原有样式*/
input[type=range] {
    -webkit-appearance: none;
    width: 100px;
}
input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
}
/*设置滑动条的样式*/
input[type=range]::-webkit-slider-runnable-track {
   height: 2px;
   background: #509EFE;
}
input[type=range]::-moz-range-track {
   height: 2px;
   background: #509EFE;
}
/*去除获取焦点时的边框*/ 
input[type=range]:focus {
    outline: none;
}
/*设置滑块样式*/
input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 10px;
    width:10px;
    border-radius: 50%;
    background: #509EFE;
    margin-top: -3px; 
} 
input[type=range]::-moz-range-thumb  {
    -webkit-appearance: none;
    background: #509EFE;
     height: 10px;
    width:10px;
    border-radius: 50%;
    margin-top: -3px; 
}
</style>
