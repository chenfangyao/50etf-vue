<template>
  <div class="maskWrap self-mask ">
    <div class="container black2">
      <div class="txt textc1">撤单确认</div>
      <img src="../../assets/holdingImg/cedan.png">
      <div class="txt textc2">是否撤单？</div>
      <div class="btn2 uni-flex">
        <div @click='cancle'>取消</div>
        <div @click='yesTap' class="nightStyle">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    cancle() { 
      this.$emit('close-me')
    },
    yesTap() { 
       
      this.$emit('close-me','yes')
    },
  }
}
</script>

<style lang="scss" scoped>
div#app.at-night .nightStyle{
  background-color: #409de5;
  color: #fff;
  border-color: transparent;
}
div.maskWrap {
  div.container {
    background-color: #fff;
    width:6.00rem;
    height:5.80rem;
    border-radius:.10rem;
    margin: 50% auto 0;
    text-align: center;
    padding-top: 19px;
    div.txt {
      font-size: 16px;
      line-height: 16px;
      color: rgba(31, 36, 51, 1);
    }
    img {
      width:1.50rem;
      height:1.50rem;
      margin:.80rem 0 .36rem;
    }
    div.btn2 {
      justify-content: space-between;
      padding: 0 .55rem;
      margin-top:.80rem;
      div {
        width:2.30rem;
        height:.72rem;
        background: rgba(64, 157, 229, 0);
        border: 1px solid #999;
        border-radius:.04rem;
        font-size: 14px;
        color: rgba(153, 153, 153, 1);
        line-height:.72rem;
        text-align: center;
      }
      view:last-child {
        background-color: #409de5;
        color: #fff;
        border: 0;
      }
    }
  }
}
</style>
