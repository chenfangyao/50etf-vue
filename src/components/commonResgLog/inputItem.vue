<template>
  <div class=" _input uni-flex" :class="{input6}">
    <s-icon v-if="isPwd" :icon-class="pwdIcon" class='closeImg' v-vtap="{method:tabOpen}"></s-icon>
    <span v-if="iconTxt" class="leftSvg">{{iconTxt}}</span>
    <s-icon v-else :icon-class="noPwdIcon" class='leftSvg'></s-icon>
    <input :placeholder="placeholderTxt" class="textc1" type="tel" v-if="isTel" :focus='focusNow' @focus="getFocus(1)" @blur='getFocus' @input='getChange' :maxlength='input6?6:11' v-model="valtxt">
    <input :placeholder="placeholderTxt" class="textc1" :type="!openEye&&isPwd?'password':'text'" v-else @focus="getFocus(1)" @blur='getFocus' @input='getChange' maxlength='20' v-model="valtxt">
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
  props: {
    placeholderTxt: { default: '', },
    isPwd: { default: '', },
    isTel: { default: '', },
    input6: { default: '', },
    focusNow: { default: '', },
    value: { default: '00', },
    whatIcon: { default: 'login_mima' },
    iconTxt: ''
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
  computed: {
    ...mapState(['atNight']),
    pwdIcon() {
      let str = this.atNight ? 'black_' : '';
      let str2 = this.openEye ? 'pwd1' : 'pwd2';
      return str + str2
    },
    noPwdIcon() {
      return this.atNight ? 'black_' + this.whatIcon : this.whatIcon
    },
  },
}
</script>
<style lang="scss" scoped>
#app.at-night {
  ._input {
    border-color: $blackTxt1;
    span {
      color: $blackTxt1;
    }
  }
}
div._input {
  border-bottom: 1px solid #ccc;
  margin-bottom: 0.65rem;
  position: relative;
  font-size: 16px;
  padding-left: 2px;
  line-height: 1.2;
  input {
    width: 70%;
    font-size: 14px;
    padding-bottom: 5px;
    color: #333;

    background-color: transparent;
  }
  .closeImg {
    right: 0.1rem;
    position: absolute;
    top: 0.05rem;
  }
  .s-icon {
    width: 0.4rem;
    height: 0.4rem;
    &.leftSvg {
      margin-right: 0.4rem;
    }
  }
  span.leftSvg {
    flex-basis: 1.5rem;
    font-weight: 500;
    color: rgba(102, 102, 102, 1);
  }
}
div._input.input6 {
  font-size: 23px;
}
</style>
