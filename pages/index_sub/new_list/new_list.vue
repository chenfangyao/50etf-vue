<template>
	<view>
		<base-header title="资讯" :hasBack='true'></base-header>
		<scroll-view class='listscrow' lower-threshold='10' scroll-y @scrolltolower="loadMore">
		<news-view :newlists="newsItem"></news-view>
		<uni-load-more :loading-type="resquestState"></uni-load-more>
		</scroll-view>
	</view>
</template>

<script>
	import newsView from '@/components/indexSub/newsView.vue';
	import uniLoadMore from '@/components/uni-load-more.vue';
	export default {
		data() {
			return {
				newsItem:[],
				resquestState: 0,
				pageindex:0,
			};
		},
		components:{
			newsView,uniLoadMore
		},
		methods:{
			loadMore(){
				if (this.resquestState < 2) {
				this.pageindex+=1
				this.getartlist(this.pageindex, 10 ,'add')
				}
			},
			getartlist(index,number,add){
					var options = {
					url: '/Sapi/Article/notice', //请求接口
					method: 'POST', //请求方法全部大写，默认GET
					data:{
						page_index:index,
						page_size:number,
						cate_id:29
					},
					context: '',
				}
				this.$httpReq(options).then((res) => {
					// 请求成功的回调
					// res为服务端返回数据的根对象
					console.log('文章列表', res)
					// this.newsItem=res.data.list
					if (res.status) {
						if(add){
							this.newsItem = this.newsItem.concat(res.data.list)
						}else{
							this.newsItem=res.data.list
						}
					}
					this.resquestState = res.data.list.length == 10 ? 0 : 2
				}).catch((err) => {
					// 请求失败的回调
					console.error(err,'捕捉')
				})
			}
			
		},
		onLoad:function(opts){
			console.log(opts)
			this.getartlist(this.pageindex, 10)
// 			var options = {
// 				url: '/Sapi/Article/notice', //请求接口
// 				method: 'POST', //请求方法全部大写，默认GET
// 				data:{
// 					page_index:0,
// 					page_size:10,
// 					cate_id:29
// 				},
// 				context: '',
// 			}
// 			this.$httpReq(options).then((res) => {
// 				// 请求成功的回调
// 				// res为服务端返回数据的根对象
// 				console.log('文章列表', res)
// 				// this.timeformates()
// 				this.newsItem=res.data.list
// 			}).catch((err) => {
// 				// 请求失败的回调
// 				console.error(err,'捕捉')
// 			})
		}
	}
</script>

<style>
view{
	/* background-color: rgb(245,245,245); */
	background-color: #f5f5f5;
	padding: 0 10upx;
}
.listscrow{
		height: 620px;
}
</style>
