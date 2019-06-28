<template>
  <div class=" _input" :class="{input6}">
    <input :placeholder="placeholderTxt" class="textc1" type="tel" v-if="isTel" :focus='focusNow' @focus="getFocus(1)" @blur='getFocus' @input='getChange' :maxlength='input6?6:11' v-model="valtxt">
    <input :placeholder="placeholderTxt" class="textc1" :type="!openEye&&isPwd?'password':'text'" v-else @focus="getFocus(1)" @blur='getFocus' @input='getChange' maxlength='20' v-model="valtxt">
    <template v-if="isPwd">
      <s-icon :icon-class="openEye?'pwd1':'pwd2'" class='closeImg' v-vtap="{method:tabOpen}"></s-icon>
      <s-icon icon-class="login_mima" class='leftSvg' v-vtap="{method:tabOpen}"></s-icon>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    placeholderTxt: { default: '', },
    isPwd: { default: '', },
    isTel: { default: '', },
    input6: { default: '', },
    focusNow: { default: '', },
    value: { default: '00', },
  },
  data() {
    return {
      valtxt: '',
      openEye: false,
    }
  },
  watch: {
    valtxt(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.valtxt = val
    },

  },
  methods: {
    getFocus(i) {
      if (i == 1) {
      } else if (this.valtxt === '') {
        this.$emit('now-blur')
      }
    },
    tabOpen() {
      this.openEye = !this.openEye
    },
    getChange() {
      this.$emit('now-change')
    }
  },
}
</script>
<style lang="scss" scoped>
div._input {
  border-bottom: 1px solid #ccc;
  margin-bottom: 0.65rem;
  position: relative;
  color: rgba(51, 51, 53, 1);
  font-size: 16px;
  line-height: 1.2;
  input {
    position: relative;
    z-index: 20;
    width: 70%;
    font-size: 18px;
    padding-bottom: 5px;
    left: 1.1rem;
    background-color: transparent;
  }
  .closeImg {
    right: 0.1rem;
  }
  .s-icon {
    width: 0.4rem;
    height: 0.4rem;
    top: 0.05rem;
    position: absolute;
  }
  .leftSvg {
    left: 0.1rem;
    top: 0;
  }
}
div._input.input6 {
  font-size: 23px;
}
</style>
