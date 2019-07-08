<template>
  <div class="uni-flex itemwrap black1 textc1">
    <div v-hover-class='"self-hover"' class="black2" v-vtap="{method: go , params: '/clinch'}">
      <span>成交记录</span>
      <s-icon icon-class="weituo_chengjiao" class-name="icon2"/>
      <s-icon icon-class="weituo_enter_blue" class-name="icon"/>
    </div>
    <div v-hover-class='"self-hover"' class="black2" v-vtap="{method: go , params: '/ping_c_list'}">
      <span>平仓结算</span>
      <s-icon icon-class="weituo_jiesuan"  class-name="icon2"/>
      <s-icon icon-class="weituo_enter_yellow"  class-name="icon"/>
    </div>
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
  margin: 0 0.22rem ;
  padding: 0.3rem 0 0.1rem;
  display: flex;
  justify-content: space-around;
  background-color: #f5f5f5;
  color: #333;
  > div {
    width: 2.3rem;
    height: 1.6rem;
    text-align: center;
    padding-bottom: 5px;
    font-size: 13px;
    line-height: 0.86rem;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon2{
      font-size: 20px;
    }
    .icon{
      align-self: flex-end;
      position: relative;
      left: 8px;
      font-size: 16px;
    }
  }
}
</style>
