<template>
  <div>
    <div class="headerContainer">
      <div :style="{height:statusbarHeight+'px'}"></div>
      <div class="root-el">
        <div class="left commonStyle" v-vtap="{method:back}"  v-if="hasBack">
          <img src="../assets/arrow/l.png">
        </div>
        <span>{{title}}</span>
        <span class="right commonStyle" v-hover-class='"self-hover"' v-vtap="{method:rightTap}" v-if="rightTxt">{{rightTxt}}</span>
      </div>
    </div>
    <div :style="{height:statusbarHeight+44+'px'}"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    title: {
      default: ''
    },
    hasBack: {
      default: false,

    },
    rightTxt: {
      default: ''
    },
    specialBack: {
      default: false
    }
  },
  methods: {
    back() {
      if (this.specialBack) {
        this.$emit('special-back')
        return
      }
    //  this.$router.go(-1)
     this.$router.goBack()
    },
    rightTap() {
      this.$emit('right-tap')
    }
  },
  computed: mapState(['statusbarHeight']),
  
}
</script>

<style lang="scss">
.headerContainer {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 50;
  background-color: #fff;
  div.root-el {
    text-align: center;
    height: 44px;
    font-size: 16px;
    line-height: 44px;
    position: relative;
    .commonStyle {
      align-self: center;
      top: 50%;
      transform: translateY(-50%);
      position: absolute;
    }
    span.right {
      right: .20rem;
      font-size: 14px;
      padding-bottom:0;//兼容持仓页headerTab

    }
    div.left {
      padding: 13px .20rem 0 .30rem;
      height: 44px;
      left: 0;
      img {
        width: 17px;
        height: 20px;
      }
    }
  }
}
  .lowZindex{div.headerContainer{z-index: 0}}

</style>
