<template>
  <div class="mask uni-flex">
    <div :class="['container black2',{show}]">
      <div class="title textc1"> 解绑银行卡</div>
      <div class="subTitle textc1">您确定要解绑该银行卡？</div>
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
      font-size: 13px;
      font-weight: 500;
      color: #666;
      line-height: 13px;
      text-align: center;
      border-bottom: 1px #ccc dashed;
      padding-bottom: 0.65rem;
    }
    div.btn2 {
      justify-content: space-between;
      margin-top:0.3rem;
      padding-bottom: 0.2rem;
      > div {
        height:0.72rem;
        width: 2.3rem;
        border-radius:2px;
        font-size: 16px;
        color: rgba(255, 255, 255, 1);
        line-height:0.72rem;
        font-weight: bold;
        text-align: center;
      }
      > div:first-child {
        
        border: solid 1px $primary1;
        color: $primary1;
      }
      > div.tap-hover:last-child {
        background: darken($primary1, 10%);
      }
      > div:last-child {
         margin-right:.20rem;
        background: $primary1;
        color: #fff;
        
      }
      > div.tap-hover:first-child {
        border-color: darken($primary1, 25%);
      }
    }
  }
  .container.show {
    transform: scale(1, 1);
  }
}
</style>
