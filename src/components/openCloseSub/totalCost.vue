<template>
  <div class="root-el">
    <div class="title">费用总计</div>
    <div class="uni-flex row">
      <div class="uni-flex col hasMargin">
        <span>手续费：</span>
        <span>冻结权利金：</span>
      </div>
      <div class="uni-flex col">
        <span>￥{{feemoney.feemoney}}</span>
        <span>￥{{feemoney.djmoney}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: ['feemoney']

}
</script>
<style lang="scss" scoped>
div.root-el {
  padding:.30rem.33rem;
  background-color: #fff;
  div.title {
    font-size: 18px;
    font-weight: 700;
    color: rgba(69, 69, 69, 1);
    line-height:.50rem;
  }
  div.row {
    justify-content: space-between;
    margin-top:.35rem;
    div.uni-flex.col {
      justify-content: space-between;
      height:.82rem;
      flex-direction: column;

      > span {
        font-size: 12px;
        color: rgba(69, 69, 69, 1);
        line-height:.34rem;
      }
    }
    > div:nth-child(2) {
      color: rgba(102, 102, 102, 1);
    }
    > div:first-child {
      color: rgba(24, 28, 40, 1);
    }
  }
}
</style>
