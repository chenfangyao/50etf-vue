<template>
	<view :class="isWhite?'white':'black'">
		<base-header title="首页"></base-header>
		<view class="banner">
			<image src="/static/indexTabImg/banner.png" />
		</view>
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

export default {
  data() {
    return {
      newsItem: [],
			timmer:null,
			commonstock:{},
			timestr:[],
			stock1:'',
			stock2:'',
			stock3:','
    }
  },
  components: {
    newsView,
    threeSecurities,
    fourTips
  },
  computed: mapState(['isWhite', 'sid', 'username', 'mobile']),
  methods: {
    // 登录
    ...mapMutations(['setsid', 'setusername', 'setmobile']),
    loginin() {
      var options = {
        url: '/Sapi/Login/index', //请求接口
        data: {
          user_name: 'lcs001',
          user_pwd: '123456'
        }, //发送给服务端的数据
        header: {
          clienttype: 'web',
          ver: 'v1.0'
        },
        method: 'POST', //请求方法全部大写，默认GET
      }
      this.$httpReq(options).then((res) => {
        // 请求成功的回调
        // res为服务端返回数据的根对象
        console.log(res)
        if (res.status == 1) {
          this.setsid(res.data.sid)
          // 获取用户信息
          this.getuserinfo()
        }
      }).catch((err) => {
        // 请求失败的回调
        console.log(err)
      })
    },
    // 获取用户信息
    getuserinfo() {
      var options = {
        url: '/Sapi/User/info', //请求接口
        method: 'GET', //请求方法全部大写，默认GET
      }

      this.$httpReq(options).then((res) => {
        // 请求成功的回调
        // res为服务端返回数据的根对象
        console.log('用户信息', res)
        if (res.status) {
          this.setusername(res.data.user_name)
          this.setmobile(res.data.mobile)
        }
      }).catch((err) => {
        // 请求失败的回调
      })
    },
    // 获取配置信息
    getconfinfo() {
      var options = {
        url: '/Sapi/Soft/conf', //请求接口
        method: 'GET', //请求方法全部大写，默认GET
        context: '',
        header: {
          clienttype: 'web',
          ver: 'v1.0',
          sid: this.sid || ""
        },
      }
      this.$httpReq(options).then((res) => {
        // 请求成功的回调
        // res为服务端返回数据的根对象
        console.log('用户信息', res)
      }).catch((err) => {
        // 请求失败的回调
        alert(err)
      })
    },
    // 获取文章信息
    getartlelist() {
      var options = {
        url: '/Sapi/Article/notice', //请求接口
        method: 'POST', //请求方法全部大写，默认GET
        data: {
          page_index: 0,
          page_size: 3,
          cate_id: 29
        },
      }
      this.$httpReq(options).then((res) => {
        // 请求成功的回调
        // res为服务端返回数据的根对象
        console.log('文章列表', res)
        // this.timeformates()
        this.newsItem = res.data.list
      }).catch((err) => {
        // 请求失败的回调
        console.log(err)
      })
    },

    // 获取更多文章
    getmoreart() {
      uni.navigateTo({
        url: '/pages/index_sub/new_list/new_list?symbol=1',
        success: res => { },
        fail: () => { },
        complete: () => { }
      });
    },
		// 获取50etf指数
		getcommonselectstock(timestrs){
			// var timesformate=new Date().format("hh:mm:sss");
			var stockTradeMins=[{"stockCodeInternal":"1000001","tradeMins":timestrs[0]},
           {"stockCodeInternal":"399001","tradeMins":timestrs[1]},
           {"stockCodeInternal":"1000004","tradeMins":timestrs[2]}],
				stockTradeMins=JSON.stringify(stockTradeMins)
			var options = {
				url: '/stockStat/getCommonSelectStock', //请求接口
				method: 'POST', //请求方法全部大写，默认GET
				data: {stockTradeMins:stockTradeMins},
				header: { 'Content-Type': 'application/x-www-form-urlencoded' },
			}
			this.$httpReq(options).then((res) => {
				// 请求成功的回调
				console.log('股票指数', res)
				if(res.result==1){
					this.timestr=[]
					// 第一次加载获取res对象
					if(timestrs[0]==''){
						this.commonstock=res.ldata
						for(let i=0;i<res.ldata.length;i++){
												if(res.ldata[i].updated==true){
													this.$set(this.timestr,i,res.ldata[i].tradeMins)
												}
											}
					}else{
						for(let i=0;i<res.ldata.length;i++){
												if(res.ldata[i].updated==true){
													this.$set(this.timestr,i,res.ldata[i].tradeMins)
													this.$set(this.commonstock,i,res.ldata[i])
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
  created() {
    // 获取文章列表
    this.getartlelist()
    this.getconfinfo()
		this.getcommonselectstock(['','',''])
		if(this.timmer===null){
			this.timmer=setInterval(()=>{
				this.getcommonselectstock(this.timestr)
			},10000)
		}
  },
	onHide() {
    console.log(6666)
    clearInterval(this.timmer)
    this.timmer = null
  },
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

view.banner {
  height: 260upx;
  border-radius: 20upx;
  margin: 12upx 0;

  image {
    width: 100%;
    height: 100%;
  }
}
</style>
