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
  created() {
    document.addEventListener('plusready', () => {      plus.key.addEventListener("backbutton",  ()=> {
        if (this.$route.meta.tabbar) {
          this.$router.goBack()
          return
        }
        this.$dialog.confirm({
          title: '提示',
          message: '确定退出吗？'
        }).then(() => {
          plus.runtime.quit();
        }).catch(() => {
        });
      });
    }, false);
  },
  watch: {
    $route(to, from) {
      if (to.meta.tabbar) {
        this.$store.commit('settabIndex', to.meta.index)
      }
      if (this.$router.isBack) {
        this.transitionName = 'slide-right';
      } else {
        this.transitionName = 'slide-left';
      }
      this.$router.isBack = false
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
$c1: #007aff;

#app {
  font-size: 14px;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.2s;
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
