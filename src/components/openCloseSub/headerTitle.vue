<template>
  <div>
    <div class="headerContainer">
      <div class="occupy"></div>
      <div class="wrap uni-flex">
        <div class="leftPart"  @click="back" >
          <img src="/assets/arrow/l.png"/>
        </div>
        <div class="tabOpen uni-flex" :class="{active:tabActive}">
          <div @click='tapChange'>开仓</div>
          <div @click='tapChange'>平仓</div>
          <div class="slider">{{tabActive?'平仓':'开仓'}}</div>
        </div>
      </div>
    </div>
    <div class="h44"></div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    tabActive: {
      require: true
    }
  },
  data() {
    return {

    }
  },
  methods: {
    ...mapMutations(['setstockamunt']),
    back() {
      //#ifdef H5
      if (getCurrentPages().length == 1) {
        history.back()
        return
      }
      //#endif
    this.$router.goBack()
    },
    tapChange() {
      this.$emit('change-close')
      this.setstockamunt(0)
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
  z-index: 200;
  background-color: #fff;
  div.wrap {
    div.leftPart {
      padding: 13px.20rem 0.30rem;
      height: 44px;
      position: absolute;
      left: 0;
      top: 0;
      img {
        width: 13px;
        height: 15px;
      }
    }
    text-align: center;
    height: 44px;
    line-height: 44px;
    position: relative;
    div.tabOpen {
      width: 176px;
      height: 27px;
      border-radius: 13px;
      margin: 0 auto;
      align-self: center;
      border: 1px solid #409de5;
      position: relative;
      .slider {
        position: absolute;
        width: 52%;
        border-radius: 13px;
        bottom: -1px;
        top: -1px;
        left: -1px;
        background-color: #409de5;
        color: #fff;
        transition: left 80ms;
      }
      > div {
        flex-grow: 1;
        text-align: center;
        line-height: 27px;
        font-size: 13px;
        color: #999;
      }
    }
    div.tabOpen.active {
      border-color: #e6aa12;
      .slider {
        left: 49%;
        background-color: #e6aa12;
      }
    }
  }
  .occupy {
    height: var(--status-bar-height);
  }
}
</style>
