<template>
	<view :class="isWhite?'white':'black'">
		<base-header title="首页"></base-header>
    <swiper class="banner" autoplay circular >
      <swiper-item v-for="(item,i) in imgList" :key="i">
		  	<image :src="item.img" />
      </swiper-item>
    </swiper>
		<four-tips></four-tips>
		<three-securities :commonstock='commonstock'></three-securities>
		<view class="uni-flex newsViewTitle">
			<text>资讯</text>
			<text @click="getmoreart()">更多></text>
		</view>
		<news-view :newlists="newsItem"></news-view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import newsView from '@/components/indexSub/newsView.vue'
import threeSecurities from '@/components/indexSub/securities3.vue'
import fourTips from '@/components/indexSub/tips4.vue'
import util from '@/common/util.js'

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
    newsView,
    threeSecurities,
    fourTips
  },
  computed: mapState(['isWhite', 'sid', 'username', 'mobile', 'indextimmer']),
  methods: {
    // 登录
    ...mapMutations(['setsid', 'setusername', 'setmobile', 'setsoftconf', 'setindextimmer']),
    // 获取配置信息
    getconfinfo() {
      var options = {
        url: '/Sapi/Soft/conf', //请求接口
        method: 'GET', //请求方法全部大写，默认GET
        context: '',
      }
      this.$httpReq(options).then((res) => {
        // 请求成功的回调
        // res为服务端返回数据的根对象
        console.log('用户信息', res)
        if (res.status) {
          this.setsoftconf(res.data)
        }
      }).catch((err) => {
        // 请求失败的回调
        console.error(err)
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
        // 请求失败的回调
        console.log(err)
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
        console.error(err)
      })
    },
    // 获取更多文章
    getmoreart() {
      uni.navigateTo({
        url: '/pages/index_sub/new_list/new_list?symbol=1',
        // url: '/pages/checkbox-group/checkbox-group',
        success: res => { },
        fail: () => { },
        complete: () => { }
      });
    },
    // 获取50etf指数
    getcommonselectstock(timestrs) {
      // var timesformate=new Date().format("hh:mm:sss");
      var stockTradeMins = [{ "stockCodeInternal": "1000001", "tradeMins": timestrs[0] },
      { "stockCodeInternal": "399001", "tradeMins": timestrs[1] },
      { "stockCodeInternal": "1000004", "tradeMins": timestrs[2] }],
        stockTradeMins = JSON.stringify(stockTradeMins)
      var options = {
        url: '/stockStat/getCommonSelectStock', //请求接口
        method: 'POST', //请求方法全部大写，默认GET
        data: { stockTradeMins: stockTradeMins },
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
        console.log(err)
      })
    }
  },
  onShow() {
    clearInterval(util.indextimmer.indexCommonSelectStock)
    util.indextimmer.indexCommonSelectStock = null
    clearInterval(util.indextimmer.quotesCommonSelectStock)
    util.indextimmer.quotesCommonSelectStock = null
    clearInterval(util.indextimmer.quotesQryQuotationList)
    util.indextimmer.quotesQryQuotationList = null
    clearInterval(util.indextimmer.quotesQrySingleQuotationMsg)
    util.indextimmer.quotesQrySingleQuotationMsg = null
    // 获取文章列表
    this.getartlelist()
    this.getconfinfo()
    this.getcommonselectstock(['', '', ''])
    if (util.indextimmer.indexCommonSelectStock === null) {
      util.indextimmer.indexCommonSelectStock = setInterval(() => {
        this.getcommonselectstock(this.timestr)
      }, 3000)
    }
  },
  onHide() {
    console.log('关闭了第一个页面的定时器')
    clearInterval(util.indextimmer.indexCommonSelectStock)
    util.indextimmer.indexCommonSelectStock = null
  },
  onLoad() {
    this.getImgList()
  }
}
</script>
<style lang="scss">
page {
  background-color: #f5f5f5;
  padding: 0 20upx;
}

view.newsViewTitle {
  justify-content: space-between;
  font-size: 16px;
  line-height: 16px;
  color: #333;
  margin: 32upx 10upx 24upx;
  font-weight: bold;
  text:last-child {
    color: #a8a8a8;
    font-size: 12px;
    font-weight: normal;
  }
}

.banner {
  height: 260upx;
  border-radius: 20upx;
  margin: 12upx 0;
  overflow: hidden;
  image {
    width: 100%;
    height: 100%;
  }
}
</style>
