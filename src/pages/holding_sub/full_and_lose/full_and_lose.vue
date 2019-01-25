<template>
  <div>
    <base-header has-back='1'></base-header>
    <div class="border1"></div>
    <div class="wrap">

      <div class="title">止{{isFull==1?'盈':'损'}}设置</div>
      <div class="subTitle">开启止{{isFull==1?'盈':'损'}}功能，当日有效！</div>
      <div class="subTitle">参考价</div>
      <div class="price">2,326.06</div>
      <div class="inputContainer">

        <input-item :placeholderTxt="isFull==1?'止盈值':'止损值'" v-model="inputPrice"></input-item>
      </div>
      <submit-btn btnTxt='确定' @v-tap='handleNext' :verify-ok='verifyYes'></submit-btn>

    </div>
  </div>
</template>

<script>
import submitBtn from '@/components/commonResgLog/submitBtn.vue'
import inputItem from '@/components/commonResgLog/inputItem.vue'
export default {
  data() {
    return {
      isFull: '',
      inputPrice: '',
      verifyYes: false,
    };
  },
  watch: {
    inputPrice(val) {
      if (val.trim() !== '') this.verifyYes = true;
    },

  },
  components: { submitBtn, inputItem },
  methods: {
    handleNext() {
     this.$router.goBack()
    },
  },
  onLoad(option) {
    this.isFull = option.isfull
  }
}
</script>

<style lang="scss" scoped>
div.border1 {
  border-bottom: 1px solid #ededed;
}
div.wrap {
  padding: 0.23rem;
  div.title {
    font-size: 20px;
    line-height: 20px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    margin:.49rem 0.35rem;
  }
  div.subTitle {
    font-size: 13px;
    color: rgba(102, 102, 102, 1);
    line-height: 24px;
  }
  div.price {
    font-size: 24px;
    font-weight: bold;
    margin:.33rem 01.74rem.12rem;

    color: rgba(240, 95, 92, 1);
  }
  div.inputContainer{
    padding: 0.12rem;
    margin-bottom:1.20rem;
  }
}
</style>
