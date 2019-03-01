<template>
  <div id="app" :class="{'at-night':atNight}">
    <template v-if="$route.meta.tabbar">
      <transition :name="transitionName">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </template>
    <template v-else>
      <transition :name="transitionName">
        <router-view v-if="!$route.meta.isKeepAlive"></router-view>
      </transition>
      <transition :name="transitionName">
        <keep-alive>
          <router-view v-if="$route.meta.isKeepAlive"></router-view>
        </keep-alive>
      </transition>
    </template>
    <div class="self-mask maskLoading" v-show="loadingFlag">
      <van-loading type="spinner" color="#999"/>
    </div>
    <etf-tabbar v-if="$route.meta.tabbar"></etf-tabbar>
  </div>
</template>

<script>
import etfTabbar from '@/components/other/etf-tabbar'
import {checkUpdate} from '@/common/update.js'
import saveLogin from '@/common/saveLogin.js'
import { Loading  } from 'vant';
import { mapState} from 'vuex';

export default {
  name: 'App',
  components: { etfTabbar,[Loading .name]:Loading  },

  data() {
    return {
      transitionName: ''
    }
  },
  created() {
    this.getConf()
    process.env.NODE_ENV === 'production' && saveLogin()
    document.addEventListener('plusready', () => { 
      
      // setInterval(()=>{checkUpdate()},60000)
      plus.key.addEventListener("backbutton", () => {
        if (!this.$route.meta.tabbar) {
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
  computed:mapState(['atNight','loadingFlag']),
  watch: {
    $route(to, from) {
      if (to.meta.tabbar) {
        this.$store.commit('settabIndex', to.meta.index)
        this.transitionName = ''
        this.$router.isBack = false
        return
      }
      if (to.meta.noAnimate) {
        this.transitionName = '';
      } else if (this.$router.isBack) {
        this.transitionName = 'slide-right';
      } else {
        this.transitionName = 'slide-left';
      }
      this.$router.isBack = false
    }
  },
  methods:{
    getConf(){
       var options = {
              url: '/Sapi/Soft/conf', //请求接口
              method: 'GET', 
          }
          this.$httpReq(options).then((res) => {
              if(res.status){
                this.$store.commit('setswitchObj',res.data)
                // this.$store.commit('setatNight',res.data.default_skin==='0')
              }
          }).catch((err) => {
              console.error(err,'捕捉')
          })
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

#app {
  font-size: 14px;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
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
div.maskLoading{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}
</style>
