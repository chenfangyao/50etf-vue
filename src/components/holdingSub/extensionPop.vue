<template>
  <div class="mask uni-flex">
    <div :class="['container',{show}]">
      <div class="title"> 延期关闭</div>
      <div class="subTitle">是否关闭延期，关闭后当日会自动平仓！</div>
      <div class="btn2 uni-flex">
        <div hover-class='tap-hover' @touchend='yesTap'>确定</div>
        <div hover-class='tap-hover' @touchend='cancleTap'>取消</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false
    }
  },
  methods: {
    cancleTap: function () {
      this.$emit('cancle-tap')
    },
    yesTap() {
      this.$emit('yes-tap')
      // this.$navigateTo({
      //   url: '/pages/quotes_sub/entrust_succ/entrust_succ'
      // })
    }
  },
  created() {
    setTimeout(
      () => { this.show = true }, 10
    )
  },

}
</script>

<style scoped lang="scss">
.mask {
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 300;
  align-items: center;
  .container {
    transform: scale(0, 0);
    transition: transform 300ms;
    overflow: hidden;
    flex-grow: 1;
    margin: 0.64rem;
    background: #fff;
    border-radius:.10rem;
    z-index: 310;
    padding:.28rem.30rem.20rem;
    .c_red {
      color: #f05f5c;
    }
    div.title {
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      color: rgba(24, 28, 40, 1);
      position: relative;
      margin-bottom:.20rem;
    }
    div.subTitle {
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
      line-height: 14px;
      text-align: center;
    }
    div.btn2 {
      justify-content: space-between;
      margin-top:.78rem;
      > div {
        flex-grow: 1;
        height:.88rem;
        border-radius:.10rem;
        font-size: 14px;
        color: rgba(255, 255, 255, 1);
        line-height:.88rem;
        text-align: center;
      }
      > div:first-child {
        background: #f5f5f5;
        margin-right:.20rem;
        color: #666;
      }
      > div.tap-hover:first-child {
        background: darken(rgba(153, 153, 153, 1), 5%);
      }
      > div:last-child {
        background: #409de5;
      }
      > div.tap-hover:last-child {
        background: darken(#409de5, 5%);
      }
    }
  }
  .container.show {
    transform: scale(1, 1);
  }
}
</style>
