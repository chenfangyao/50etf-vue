<template>
  <div class=" _input" :class="{input6}">
        <input type="number"  v-if="isTel" :focus='focusNow' @focus="getFocus(1)" @blur='getFocus' @input='getChange'  :maxlength='input6?6:11' v-model="valtxt">
        <input type="text" v-else :password='!openEye&&isPwd' @focus="getFocus(1)" @blur='getFocus' @input='getChange'  maxlength='20' v-model="valtxt">
        <span :class="{inputFocus:focusInput}" class='absTxt'>{{placeholderTxt}}</span>
        <img v-show='!openEye' v-if="isPwd" @touchend='tabOpen' class='closeImg' src="/assets/loginResgImg/close.png">
        <img v-show='openEye' v-if="isPwd" @touchend='tabOpen' class='openImg' src="/assets/loginResgImg/open.png">
      </div>
</template>
<script>
export default {
  props: ['placeholderTxt', 'isPwd', 'isTel', 'input6', 'focusNow'],
  data() {
    return {
      valtxt: '',
      openEye: false,
      focusInput: false
    }
  },
  watch: {
    valtxt(val) {
      this.$emit('input', val)
    }
  },
  methods: {
    getFocus(i) {
      if (i == 1) {
        this.focusInput = true
      } else if (this.valtxt === '') {
        this.$emit('now-blur')
        this.focusInput = false
      }
    },
    tabOpen() {
      this.openEye = !this.openEye
    },
    getChange() {
      this.$emit('now-change')
    }
  }
}
</script>
<style lang="scss" scoped>
div._input {
  border-bottom: 1px solid #ccc;
  padding-bottom:.10rem;
  margin-bottom:.62rem;
  position: relative;
  color: rgba(51, 51, 53, 1);
  font-size: 16px;
  img.openImg {
    width:.42rem;
    height:.33rem;
  }
  img.closeImg {
    width:.38rem;
    height:.21rem;
  }
  img {
    position: absolute;
    z-index: 10;
    right:.36rem;
    top:.16rem;
  }
  
  span.absTxt {
    font-size: 18px;
    color: rgba(153, 153, 153, 1);
    letter-spacing: 2px;
    position: absolute;
    bottom:.10rem;
    left:.10rem;
    color: #ccc;
    font-weight: 500;
    transition: font-size 300ms, bottom 300ms;
  }
  span.absTxt.inputFocus {
    font-size: 14px;
    bottom:.60rem;
  }
}
div._input.input6 {
  font-size: 23px;
}
</style>
