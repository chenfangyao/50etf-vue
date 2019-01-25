<template>
  <div class="uni-flex itemwrap">
    <div hover-class='self-hover' @touchend="go('/pages/holding_sub/clinch/clinch')">成交记录</div>
    <div hover-class='self-hover' @touchend="go('/pages/holding_sub/ping_c_list/ping_c_list')">平仓结算</div>
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
  margin:.16rem.22rem 0;
  padding:.10rem 0;
  background-color: #fff;
  box-shadow:0px 0px.08rem 0px rgba(153,153,153,0.5);;
  border-radius:8upx;
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
