<template>
  <div id="app">
    <template v-if="$route.meta.tabbar">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </template>
    <template v-else>
      <transition :name="transitionName">
        <keep-alive>
          <router-view v-if="$route.meta.isKeepAlive"></router-view>
        </keep-alive>
      </transition>
      <transition :name="transitionName">
        <router-view v-if="!$route.meta.isKeepAlive"></router-view>
      </transition>
    </template>
    <etf-tabbar v-if="$route.meta.tabbar"></etf-tabbar>
  </div>
</template>

<script>
import etfTabbar from '@/components/other/etf-tabbar'
export default {
  name: 'App',
  components: { etfTabbar },
  data() {
    return {
      transitionName: ''
    }
  },
  watch: {//使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = 'slide-left';
      } else {
        this.transitionName = 'slide-right';
      }
    }
  }
}
</script>

<style lang='scss'>
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
} */
$c1:#007aff;

#app {
  font-size: 14px;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s linear;
  position: absolute;
  top: 0;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
