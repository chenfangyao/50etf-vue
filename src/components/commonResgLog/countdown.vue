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
    async sendCode() {
      await this.$emit('v-yzm');
      this.timer || this.showErr || this.countdownFun()
    }
  },
  props: ['initTxt', 'showErr'],
  data() {
    return {
      verifyCodeContent: '',
      countdown: 60,
      timer: null,
    }
  }
}
</script>

<style scoped>
div.txt {
  font-size: 0.3rem;
  width: 135px;
  color: rgba(24, 144, 255, 1);
  text-align: right;
}
</style>
