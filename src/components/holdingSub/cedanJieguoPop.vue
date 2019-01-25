<template>
  <div class=" self-mask">
    <div class="wrap">
      <img v-if="isErr" src="/assets/holdingImg/cedan-err.png">
      <img v-else src="/assets/holdingImg/cedan-succ.png">
      <div>{{isErr?'交易已完成，撤单失败':'撤单成功'}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['isErr'],

}
</script>
<style lang="scss" scoped>
div.wrap {
  width:3.80rem;
  height:3.80rem;
  background-color: #fff;
  border-radius:.10rem;
  margin: 50% auto 0;
  text-align: center;
  img {
    width:1.50rem;
    height:1.50rem;
    margin:.80rem 0.36rem;
  }
  div {
    font-size: 15px;
    color: rgba(24, 28, 40, 1);
    line-height: 15px;
  }
}
</style>
