<template>
	<view :class="isWhite?'white':'black'">
		<base-header title="首页"></base-header>
		<view class="banner">
			<image src="/static/indexTabImg/banner.png" />
		</view>
		<four-tips></four-tips>
		<three-securities></three-securities>
		<view class="uni-flex newsViewTitle">
			<text>资讯</text>
			<text>更多></text>
		</view>
		<news-view></news-view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import newsView from '@/components/indexSub/newsView.vue'
	import threeSecurities from '@/components/indexSub/securities3.vue'
	import fourTips from '@/components/indexSub/tips4.vue'

	export default {
		data() {
			return {}
		},
		components: {
			newsView,
			threeSecurities,
			fourTips
		},
		computed: mapState(['isWhite']),
		methods: {
			// 登录
			loginin(){
				var options = {
					url: '/Sapi/Login/index', //请求接口
					data: {
						user_name: 'test008',
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
					if(res.status==1){
						console.log('data',res.data)
						console.log('type',typeof(res.data))
						console.log('sid',res.data.sid)
						localStorage.setItem('sid',res.data.sid)
						var ss=localStorage.getItem('sid')
						this.getuserinfo()
					}
				}).catch((err) => {
					// 请求失败的回调
					alert(err)
				})
			},
			// 登出
			loginout(){
				var options = {
					url: '/Sapi/Login/loginout', //请求接口
					method: 'POST', //请求方法全部大写，默认GET
					context:'',
				}
				this.$httpReq(options).then((res) => {
					// 请求成功的回调
					// res为服务端返回数据的根对象
					console.log(res)
				}).catch((err) => {
					// 请求失败的回调
					alert(err)
				})
			},
			// 获取用户信息
			getuserinfo(){
				var options = {
					url: '/Sapi/User/info', //请求接口
					method: 'GET', //请求方法全部大写，默认GET
					context:'',
					header: {
						clienttype: 'web',
						ver: 'v1.0',
						sid:localStorage.getItem("sid") || ""
					},
				}
				this.$httpReq(options).then((res) => {
					// 请求成功的回调
					// res为服务端返回数据的根对象
					console.log('用户信息',res)
				}).catch((err) => {
					// 请求失败的回调
					alert(err)
				})
			},
			
			
		},
		created() {
			this.loginin()
// 			this.loginout()
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
		font-size: 26upx;
		font-family: MicrosoftYaHei;
		color: rgba(24, 28, 40, 1);
		margin: 32upx 0 24upx;

		text:last-child {
			color: #a8a8a8;
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
