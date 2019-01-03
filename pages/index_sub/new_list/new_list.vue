<template>
	<view>
		<base-header title="资讯" :hasBack='true'></base-header>
		<news-view :newlists="newsItem"></news-view>
	</view>
</template>

<script>
	import newsView from '@/components/indexSub/newsView.vue'
	export default {
		data() {
			return {
				newsItem:[]
			};
		},
		components:{
			newsView
		},
		onLoad:function(opts){
			console.log(opts)
			var options = {
				url: '/Sapi/Article/notice', //请求接口
				method: 'POST', //请求方法全部大写，默认GET
				data:{
					page_index:0,
					page_size:10,
					cate_id:29
				},
				context: '',
			}
			this.$httpReq(options).then((res) => {
				// 请求成功的回调
				// res为服务端返回数据的根对象
				console.log('文章列表', res)
				// this.timeformates()
				this.newsItem=res.data.list
			}).catch((err) => {
				// 请求失败的回调
				console.error(err)
			})
		}
	}
</script>

<style>
view{
	/* background-color: rgb(245,245,245); */
	background-color: #f5f5f5;
	padding: 0 10upx;
}
</style>
