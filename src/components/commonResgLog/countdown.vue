<template>
  <div v-hover-class='"self-hover"' v-vtap="{method:sendCode}" class="txt">{{verifyCodeContent||initTxt}}</div>
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
      this.timer ||this.$emit('v-yzm');
    }
  },
  props: ['initTxt', 'countdownOk'],
  data() {
    return {
      verifyCodeContent: '',
      countdown: 60,
      timer: null,
    }
  },
  watch: {
    countdownOk(val) {
      val && (this.timer || this.countdownFun())
    }
  }
}
</script>

<style scoped lang="scss">
div.txt {
  font-size: 0.3rem;
  width: 1.7rem;
  border-radius: 2px;
  text-align: center;
  color: $primary1;
  border: solid 1px $primary1;
  line-height: 0.64rem;
  height: 0.64rem;
}
</style>
