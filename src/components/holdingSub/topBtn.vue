<template>
  <div class="uni-flex itemwrap">
    <div hover-class='self-hover' @click="go('/clinch')">成交记录</div>
    <div hover-class='self-hover' @click="go('/ping_c_list')">平仓结算</div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    go(url) {
      this.$navigateTo({ url })
    }
  }
}
</script>

<style scoped lang='scss'>
div.itemwrap {
  justify-content: space-between;
  height:.96rem;
  margin:0 .22rem 5px;
  padding:.10rem 0;
  background-color: #fff;
  box-shadow:0px 0px .08rem 0px rgba(153,153,153,0.5);;
  border-radius:.08rem;
  > div {
    width: 50%;
    text-align: center;
    font-size: 13px;
    color: #999;
    line-height:.86rem;
  }
  > div:first-child {
    border-right: 1px solid #ededed;
  }
}
</style>
