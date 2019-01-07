<template>
	<view>
		<base-header title="资讯详情" :hasBack='true'></base-header>
		<view class='grayline'></view>
		<view class='artconent'>
			<view>
				<view class="arttitle">
					<text>{{arttitle}}</text>
				</view>
				<view class="artlittle uni-flex newsViewTitle">
					<text>{{artlittle}}</text>
					<text>{{update_time}}</text>
				</view>
				<view class="artwenan">
					<rich-text :nodes="artwenan"></rich-text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import util from '@/common/util.js'
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				arttitle: '',
				artlittle: '',
				artwenan: '',
				update_time: '',
			};
		},
		computed: mapState(['isWhite', 'sid']),
		methods: {},
		created() {
			// this.getartdetil()
		},
		onLoad: function(opts) {
			console.log('opts', opts)
			var options = {
				url: '/Sapi/Article/cont', //请求接口
				method: 'GET', //请求方法全部大写，默认GET
				data: {
					id: parseInt(opts.id)
				},
				context: '',
				header: {
					sid: this.sid || ""
				},
			}
			this.$httpReq(options).then((res) => {
				// 请求成功的回调
				// res为服务端返回数据的根对象
				console.log('文章详情', res)
				this.arttitle = res.data.title
				this.artlittle = res.data.source
				this.artwenan = res.data.content.replace(/<br \/>/g, "<br/> <span style='margin-left:2em'></span>")
				this.update_time = this.$formatetimestr(res.data.update_time)
			}).catch((err) => {
				// 请求失败的回调
				console.error(err)
			})
		}
	}
</script>

<style lang="scss">
	.artconent {
		text-align: center;
		margin: 10px 15px;
	}

	.grayline {
		background-color: #a8a8a8;
		height: 1upx;
	}

	view.newsViewTitle {
		justify-content: space-between;
		font-size: 14px;
		font-family: MicrosoftYaHei;
		color: #a8a8a8;
		margin: 20upx 38upx 24upx;

		text:last-child {
			// color: #a8a8a8;
		}
	}

	view.arttitle {
		justify-content: space-between;
		font-size: 18px;
		font-family: MicrosoftYaHei;
	}

	view.artwenan {
		font-size: 16px;
		text-align: left;
		text-indent: 2em;
		font-family: MicrosoftYaHei;
		color: #a8a8a8;
		margin: 40upx 0;
	}
</style>
