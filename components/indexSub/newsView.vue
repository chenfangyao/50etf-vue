<template>
	<view>
		<view v-for="(item,i) in newlists" :key="i" class="newsView" @tap="getartdetil(item.id)">
			<h3>{{item.title}}</h3>
			<view class="uni-flex">
				<text>{{item.source}}</text>
				<text>
					<text class="newsTime">{{$formatetimestr(item.update_time)}}</text>
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
				newsItem: []
			}
		},
		props:['newlists'],
		methods: {
			// 获取文章详情
			getartdetil(artid) {
				uni.navigateTo({
					url: '/pages/index_sub/new_xiang_qing/new_xiang_qing?id='+artid+''
				});
			}

		},
		watch: {
// 			sid(newname, oldname) {
// 				if (newname != "") {
// 					this.getartlelist()
// 				}
// 			}
		},
		created() {
			// this.getartlelist()
		},
		
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
