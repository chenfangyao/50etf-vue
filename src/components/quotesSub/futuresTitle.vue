<template>
  <div class="uni-flex wrap">
    <span><span>涨跌</span><span class="small">(%)</span></span>
    <span>现价</span>
    <div class="uni-flex">
      <span class="gou">购</span>
      <span class="mlr">行权价</span>
      <span class="gu">沽</span>
    </div>
    <span>现价</span>
    <span><span>涨跌</span><span class="small">(%)</span></span>
  </div>
</template>
<style lang="scss" scoped>
div.wrap {
  justify-content: space-between;
  padding:.18rem .25rem;
  border-bottom: 1px solid #f5f5f5;
  span {
    font-size: 14px;
    color: rgba(31, 31, 38, 1);
    text-align: center;
  }
  span.small{
    font-size: 9px;
    line-height: 9px;
  }
  span.mlr{
    margin: 0 .33rem;
  }
  .gou,
  .gu {
    color: #fff;
    background: rgba(240, 95, 92, 1);
    border-radius: 5px;
    height:.37rem;
    width:.37rem;
    line-height:.37rem;
    text-align: center;
    display: inline-block;
    align-self: center;
  }
  .gu{
    background: #3ABA8F;
  }
}
</style>
