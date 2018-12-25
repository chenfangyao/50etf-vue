<template>
  <view class=" _input" :class="{input6}">
        <input type="number"  v-if="isTel" :focus='focusNow' @focus="getFocus(1)" @blur='getFocus' @input='getChange'  :maxlength='input6?6:11' v-model="valtxt">
        <input type="text" v-else :password='!openEye&&isPwd' @focus="getFocus(1)" @blur='getFocus' @input='getChange'  maxlength='20' v-model="valtxt">
        <text :class="{inputFocus:focusInput}" class='absTxt'>{{placeholderTxt}}</text>
        <image v-show='!openEye' v-if="isPwd" @tap='tabOpen' class='closeImg' src='/static/loginResgImg/close.png'></image>
        <image v-show='openEye' v-if="isPwd" @tap='tabOpen' class='openImg' src='/static/loginResgImg/open.png'></image>
      </view>
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
view._input {
  border-bottom: 1px solid #ccc;
  padding-bottom: 10upx;
  margin-bottom: 48upx;
  position: relative;
  color: rgba(51, 51, 53, 1);
  font-size: 16px;
  image.openImg {
    width: 42upx;
    height: 33upx;
  }
  image.closeImg {
    width: 38upx;
    height: 21upx;
  }
  image {
    position: absolute;
    z-index: 10;
    right: 36upx;
    top: 16upx;
  }
  
  text.absTxt {
    font-size: 16px;
    color: rgba(153, 153, 153, 1);
    letter-spacing: 2px;
    position: absolute;
    bottom: 10upx;
    left: 10upx;
    transition: font-size 300ms, bottom 300ms;
  }
  text.absTxt.inputFocus {
    font-size: 11px;
    bottom: 60upx;
  }
}
view._input.input6 {
  font-size: 23px;
}
</style>
