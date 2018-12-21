<template>
  <view hover-class='self-hover' @tap='sendCode' class="txt">{{verifyCodeContent||initTxt}}</view>
</template>
<script>
export default {
  methods: {
    countdownFun() {
      this.timer = setInterval(() => {
        if (this.countdown == 1) {
          clearInterval(this.timer)
          this.verifyCodeContent = '重新发送'
          this.countdown = 60
          this.timer = null
          return
        }
        this.countdown--;
        this.verifyCodeContent = this.countdown + ' S'
      }, 1000)
    },
    sendCode() {
      this.timer || this.countdownFun()
        this.$emit('v-yzm')
    }
  },
  props:['initTxt'],
  data(){
    return{
      verifyCodeContent: '',
      countdown: 60,
      timer: null,
    }
  }
}
</script>

<style scoped>
view.txt {
  font-size: 16px;
  width: 120px;
  color: rgba(24, 144, 255, 1);
  margin-left: 60upx;
}
</style>
