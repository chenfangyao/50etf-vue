<template>
  <div>
    <div class="headerContainer">
      <div class="occupy"></div>
      <div class="wrap">
        <div class="left commonStyle" @click="back"  v-if="hasBack">
          <img src="/assets/arrow/l.png">
        </div>
        <span>{{title}}</span>
        <span class="right commonStyle" hover-class='self-hover' @click="rightTap" v-if="rightTxt">{{rightTxt}}</span>
      </div>
    </div>
    <div class="h44"></div>
  </div>
</template>

<script>
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
      //#ifdef H5
      if (getCurrentPages().length == 1) {
        history.back()
        return
      }
      //#endif
     this.$router.go(-1)
    },
    rightTap() {
      this.$emit('right-tap')
    }
  }
}
</script>

<style lang="scss">
div.h44 {
  height: 44px;
}
.headerContainer {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 50;
  background-color: #fff;
  div.wrap {
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
      right:.20rem;
      font-size: 14px;
    }
    div.left {
      padding: 13px.20rem 0.30rem;
      height: 44px;
      left: 0;
      img {
        width: 17px;
        height: 20px;
      }
    }
  }
  .occupy {
    height: var(--status-bar-height);
  }
}
</style>
