<template>
  <div  class="wrap">
    <!-- <base-header title="首页"></base-header> -->
    <van-swipe class="banner" :show-indicators='false' :autoplay='3000' loop >
      <van-swipe-item v-for="(item,i) in imgList" :key="i">
		  	<img :src="item.img" >
      </van-swipe-item>
    </van-swipe>
    <four-tips></four-tips>
    <three-securities :commonstock="commonstock"></three-securities>
    <div class="uni-flex newsViewTitle">
      <span class="textc1">资讯</span>
      <span v-vtap="{method: getmoreart  }">更多></span>
    </div>
    <news-view :newlists="newsItem"></news-view>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import newsView from '@/components/indexSub/newsView.vue'
import threeSecurities from '@/components/indexSub/securities3.vue'
import fourTips from '@/components/indexSub/tips4.vue'
import util from '@/common/util.js'
import { Swipe, SwipeItem } from 'vant';
export default {
  data() {
    return {
      newsItem: [],
      timmer: null,
      commonstock: {},
      timestr: [],
      imgList: [],
      stock1: '',
      stock2: '',
      stock3: ','
    }
  },
  components: {
    newsView, threeSecurities, fourTips,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  computed: mapState([ 'sid', 'username', 'mobile', 'indextimmer']),
  methods: {
    // 登录
    ...mapMutations(['setsid', 'setusername', 'setmobile', 'setsoftconf', 'setindextimmer']),
    // 获取配置信息
    getconfinfo() {
      var options = {
        url: '/Sapi/Soft/conf', 
        method: 'GET', 
        context: '',
      }
      this.$httpReq(options).then((res) => {
        if (res.status) {
          this.setsoftconf(res.data)
        }
      }).catch((err) => {
        console.error(err, '捕捉')
      })
    },
    // 获取文章信息
    getartlelist() {
      var options = {
        url: '/Sapi/Article/notice',
        method: 'POST',
        data: {
          page_index: 0,
          page_size: 8,
          cate_id: 29
        },
      }
      this.$httpReq(options).then((res) => {
        this.newsItem = res.data.list
      }).catch((err) => {
        console.error(err, '捕捉')
      })
    },
    getImgList() {
      let options = {
        url: '/Sapi/soft/welcome',
        method: 'GET',
      }
      this.$httpReq(options).then((res) => {
        this.imgList = res.data.top.white
      }).catch((err) => {
        console.error(err, '捕捉')
      })
    },
    // 获取更多文章
    getmoreart() {
      this.$navigateTo({
        url: '/pages/index_sub/new_list/new_list',
        query:{symbol:1}
      });
    },
    // 获取50etf指数
    getcommonselectstock(timestrs) {
      // var timesformate=new Date().format("hh:mm:sss");
      var stockTradeMins = [{ "stockCodeInternal": "1000001", "tradeMins": timestrs[0] },
      { "stockCodeInternal": "399001", "tradeMins": timestrs[1] },
      { "stockCodeInternal": "1000004", "tradeMins": timestrs[2] }]
      stockTradeMins = JSON.stringify(stockTradeMins)
      var options = {
        url: '/stockStat/getCommonSelectStock', //请求接口
        method: 'POST', //请求方法全部大写，默认GET
        data: { stockTradeMins },
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
      this.$httpReq(options).then((res) => {
        // 请求成功的回调
        if (res.result == 1) {
          this.timestr = []
          // 第一次加载获取res对象
          if (timestrs[0] == '') {
            this.commonstock = res.ldata
            for (let i = 0; i < res.ldata.length; i++) {
              if (res.ldata[i].updated == true) {
                this.$set(this.timestr, i, res.ldata[i].tradeMins)
              }
            }
          } else {
            for (let i = 0; i < res.ldata.length; i++) {
              if (res.ldata[i].updated == true) {
                this.$set(this.timestr, i, res.ldata[i].tradeMins)
                this.$set(this.commonstock, i, res.ldata[i])
              }
            }
          }
        }
      }).catch((err) => {
        // 请求失败的回调
        console.error(err, '捕捉')
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm=>{
      // 获取文章列表
      vm.getartlelist()
      vm.getconfinfo()
      vm.getImgList()
      vm.getcommonselectstock(['', '', ''])
      if (!util.calcLegalTime()) return;
      if (util.indextimmer.indexCommonSelectStock === null) {
        util.indextimmer.indexCommonSelectStock = setInterval(() => {
          vm.getcommonselectstock(vm.timestr)
        }, 3000)
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(util.indextimmer.indexCommonSelectStock)
    util.indextimmer.indexCommonSelectStock = null
    next()
  },
}
</script>
<style lang="scss" scoped>
div.wrap {
  background-color: #f5f5f5;
  padding: 0.1px .2rem ;
}

div.newsViewTitle {
  justify-content: space-between;
  font-size: 16px;
  line-height: 16px;
  color: #333;
  margin: 0.32rem 0.1rem 0.24rem;
  font-weight: bold;
  span:last-child {
    color: #a8a8a8;
    font-size: 12px;
    font-weight: normal;
  }
}

.banner {
  height: 2.6rem;
  overflow: hidden;
  margin-top:0.1rem ;
  border-radius: 0.2rem;
  img {
    width: 100%;
    height: 100%;
    border-radius: 0.2rem;
  }
}
</style>
