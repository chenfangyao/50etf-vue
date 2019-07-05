<template>
  <div class="wrap">
    <base-header title="交易规则" has-back="1"></base-header>
    <div class="border1 black1"></div>
    <!-- <div class="title">{{rules.title}}</div> -->
    <!-- <div class="content">{{rules.content}}</div> -->
    <div class="content" v-html="rules.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rules: ''
    };
  },
  methods: {
    tradrule() {
      var options = {
        url: '/Sapi/Article/cont', 
        method: 'GET', 
        data: {
          id: 6
        },
      }
      this.$httpReq(options).then((res) => {
        if (res.status) {
          this.rules = res.data
        }
      }).catch((err) => {
        console.error(err, '捕捉')
      })
    },
  },
  created() {
    this.tradrule()
  }
}
</script>

<style lang="scss" scoped>
div.border1 {
  height: 1px;
  background-color: #ededed;
}
div.title {
  font-size: 16px;
  padding: 0 0.43rem;
  color: rgba(24, 28, 40, 1);
  margin: 0.5rem 0 0.34rem;
  line-height: 16px;
  text-align: center;
}
div.content {
  font-size: 15px;
  color: rgba(112, 118, 128, 1);
  line-height: 0.58rem;
  padding: 0 0.43rem 0.1px;
}
</style>

