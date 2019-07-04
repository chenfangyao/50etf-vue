<template>
  <div>
    <div class="headerContainer">
      <div class="black2" :style="{height:statusbarHeight+'px'}"></div>
      <div class="root-el uni-flex">
        <div class="leftPart" v-vtap="{method:back}">
          <img src="../../assets/arrow/l.png">
        </div>
        <div class="tabOpen uni-flex" :class="{active:tabActive}">
          <div v-vtap="{method:tapChange}">开仓</div>
          <div v-vtap="{method:tapChange}">平仓</div>
          <div class="slider">{{tabActive?'平仓':'开仓'}}</div>
        </div>
      </div>
    </div>
    <div :style="{height:statusbarHeight+44+'px'}"></div>
  </div>
</template>

<script>
import { mapMutations ,mapState} from 'vuex'
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
  computed: mapState(['statusbarHeight']),
  methods: {
    ...mapMutations(['setstockamunt']),
    back() {
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
.headerContainer {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 200;
  background-color: #fff;
  div.root-el {
    div.leftPart {
      padding: 13px 0.2rem 0 0.3rem;
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
      border: 1px solid $primary1;
      position: relative;
      .slider {
        position: absolute;
        width: 52%;
        border-radius: 13px;
        bottom: -1px;
        top: -1px;
        left: -1px;
        background-color: $primary1;
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
      // border-color: #e6aa12;
      .slider {
        left: 49%;
        // background-color: #e6aa12;
      }
    }
  }
  .occupy {
    height: var(--status-bar-height);
  }
}
</style>
