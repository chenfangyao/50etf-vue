<template>
  <div id="app" :class="{'at-night':atNight}">
    <template v-if="$route.meta.isKeepAlive">
      <transition :name="transitionName">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </template>
    <template v-else>
      <transition :name="transitionName">
        <router-view ></router-view>
      </transition>
    <!--   <transition :name="transitionName">
        <keep-alive>
          <router-view v-if="$route.meta.isKeepAlive"></router-view>
        </keep-alive>
      </transition> -->
    </template>
    <div class="self-mask maskLoading" v-show="loadingFlag">
      <van-loading type="spinner" color="#999" />
    </div>
    <etf-tabbar v-if="$route.meta.tabbar"></etf-tabbar>
    <article-popup :notic-obj='noticItem' @show-again='againPop'></article-popup>
  </div>
</template>

<script>
import etfTabbar from '@/components/other/etf-tabbar'
import saveLogin from '@/common/saveLogin.js'
import { Loading } from 'vant';
import { mapState,mapMutations } from 'vuex';
import articlePopup from '@/components/other/article-popup'

export default {
  name: 'App',
  components: { etfTabbar, [Loading.name]: Loading ,articlePopup,},
  data() {
    return {
      transitionName: '',
      noticItem:false,
      noticList:[],
    }
  },
  created() {
    this.getConf()
    this.getNotic()
    document.addEventListener('plusready', () => {
      this.$store.commit('setappReady',true)
      saveLogin()
      this.backEvent()
    }, false);
  },
  
  computed: mapState(['atNight', 'loadingFlag','appReady','articlePop']),
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
    },
    atNight(val) {
      if (!this.appReady) return;
      if (val) {
        plus.navigator.setStatusBarBackground("#181c28");
        plus.navigator.setStatusBarStyle("light");
      }else{
        plus.navigator.setStatusBarBackground("#f0f0f0");
        plus.navigator.setStatusBarStyle("dark");
      }
    },
    articlePop(val){
      if(val){
        this.noticItem={...this.noticItem}
        this.$store.commit('setarticlePop',false)
      }
    }
  },
  methods: {
    againPop(){
      this.noticItem=this.noticList.shift()||false
    },
    getNotic(){
      var options = {
        url: '/Sapi/Article/popup', //请求接口
        method: 'GET',
      }
      this.$httpReq(options).then((res) => {
        if (res.data.list) {
          this.noticList=res.data.list  
          this.noticItem=this.noticList.shift()
        }
      }).catch((err) => {
        console.error(err, '捕捉')
      })
    },
    getConf() {
      var options = {
        url: '/Sapi/Soft/conf', //请求接口
        method: 'GET',
      }
      this.$httpReq(options).then((res) => {
        if (res.status) {
          this.$store.commit('setswitchObj', res.data)
          this.$store.commit('setsoftconf',res.data)
          var theme=localStorage.getItem('selfTheme')
          if(theme===null){
            this.$store.commit('setatNight',res.data.default_skin==='0')
          }else{
            this.$store.commit('setatNight',theme==='0')
          }
          res.data.is_need_login>0&&this.$redirectTo({url:'/pages/login/login'})
        }
      }).catch((err) => {
        console.error(err, '捕捉')
      })
    },
   
    backEvent(){
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
        })
      });
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
div.maskLoading {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}
</style>
