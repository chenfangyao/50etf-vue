<template>
	<view>
		<view v-for="(item,i) in newsItem" :key="i" class="newsView" @tap="getartdetil(item.id)">
			<h3>{{item.title}}</h3>
			<view class="uni-flex">
				<text>{{item.source}}</text>
				<text>
					<text class="newsTime">{{timeformates(item.update_time)}}</text>
					<!-- <text class="newsTime">{{item.update_time}}</text> -->
				</text>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import util from '@/common/util.js'
	export default {
		data() {
			return {
				newsItem: [{
						title: '上海市副市长吴情：发展科技创业板为新经济注入活水1',
						source: '证券时报网1'
					},
					{
						title: '上海市副市长吴情：发展科技创业板为新经济注入活水2',
						source: '证券时报网2'
					},
					{
						title: '上海市副市长吴情：发展科技创业板为新经济注入活水3',
						source: '证券时报网3'
					},
				]
			}
		},
		computed: {
			...mapState(['sid']),

			timestr: function() {
				// `this` 指向 vm 实例
				return util.dateUtils.format("")
			}
		},
		methods: {
			// 获取文章列表
			getartlelist() {
				var options = {
					url: '/Sapi/Article/notice', //请求接口
					method: 'POST', //请求方法全部大写，默认GET
					data: {
						page_index: 0,
						page_size: 10,
						cate_id: 29
					},
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
					console.log('文章列表', res)
					// this.timeformates()
					this.newsItem = res.data.list
				}).catch((err) => {
					// 请求失败的回调
					console.log(err)
				})
			},

			timeformates(timestr) {
				// return new Date(parseInt(timestr) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
				return util.formateTimeStr(timestr); 
			},
			// 获取文章详情
			getartdetil(artid) {
				uni.navigateTo({
					url: '/pages/index_sub/new_xiang_qing/new_xiang_qing?id='+artid+''
					// url: '/pages/test_uni/test_uni/test_uni'
				});
			}

		},
		watch: {
			sid(newname, oldname) {
				if (newname != "") {
					this.getartlelist()
				}
			}
		},
		created() {
			// this.getartlelist()
		}
	}
</script>
<style lang="scss">
	view.newsView {
		background-color: #fff;
		padding: 24upx;
		border-radius: 20upx;
		margin: 20upx 0;

		h3 {
			font-size: 13px;
			font-family: MicrosoftYaHei;
			font-weight: 400;
			color: rgba(24, 28, 40, 1);
		}

		text {
			font-size: 10px;
			font-family: MicrosoftYaHei;
			color: rgba(168, 168, 168, 1);
		}

		text.newsTime {
			margin-left: 10upx;
		}

		>view.uni-flex {
			justify-content: space-between;
			margin-top: 18upx;
		}
	}
</style>
