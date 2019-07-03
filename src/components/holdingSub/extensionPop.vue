<template>
  <div class="mask uni-flex">
    <div :class="['container black2',{show}]">
      <div class="title textc1"> 延期关闭</div>
      <div class="subTitle textc1">是否关闭延期，关闭后当日会自动平仓！</div>
      <div class="btn2 uni-flex">
        <div v-hover-class="'tap-hover'" v-vtap="{method:cancleTap}">取消</div>
        <div v-hover-class="'tap-hover'" v-vtap="{method:yesTap}">确定</div>
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
      color: #333;
      position: relative;
      margin-bottom:.20rem;
    }
    div.subTitle {
      font-size: 14px;
      font-weight: 500;
      color: #666;
      line-height: 14px;
      text-align: center;
      border-bottom: 1px #ccc dashed;
      padding-bottom: 0.45rem;
    }
    div.btn2 {
      justify-content: space-between;
      margin-top:0.6rem;
      padding-bottom: 0.2rem;
      > div {
        flex-grow: 1;
        height:.88rem;
        border-radius:.10rem;
        font-size: 16px;
        color: rgba(255, 255, 255, 1);
        line-height:.88rem;
        font-weight: bold;
        text-align: center;
      }
      > div:first-child {
        background: $primary1;
        margin-right:.20rem;
        color: #fff;
      }
      > div.tap-hover:first-child {
        background: darken($primary1, 10%);
      }
      > div:last-child {
         
        border: solid 1px $primary1;
        color: $primary1;
      }
      > div.tap-hover:last-child {
        border-color: darken($primary1, 25%);
      }
    }
  }
  .container.show {
    transform: scale(1, 1);
  }
}
</style>
