<template>
	<view class="Bigwrap">
		<base-header :hasBack="true" title='资金流水'></base-header>
		<view class="line1 uni-flex">
			<text>此处放文案</text>
			<image class="right" @tap="showDatepick" src='/static/mineImg/datePicker.png' />
		</view>

		<view class="listsContainer" v-for="(item,i) in monetlist" :key="i">
			<view class="line1 uni-flex">
				<view>
					<text class="txt1">沽11月2500</text>
					<text class="txt2">100145</text>
				</view>
				<view class="timetxt">
					<text>{{$formatetimestr(item.create_time)}}</text>
					<!-- <text>14:52:11</text> -->
				</view>
			</view>
			<view class="line2">
				<view class="bigTxt">{{item.pay_money}}</view>
				<view class="uni-flex info">
					<view>
						<text class="infoName">手续费：</text>
						<text>{{item.fee_money}}</text>
					</view>
					<view>
						<text class="infoName">账户余额：</text>
						<text>{{item.bal_money}}</text>
					</view>
				</view>
			</view>
		</view>
		<date-pick v-if="showPick" @select-complete='getTime'></date-pick>
	</view>
</template>

<script>
	import datePick from '@/components/datePick.vue'
	export default {
		data() {
			return {
				showPick: false,
				// 				id: "流水号",
				// 				create_time: "交易时间",
				// 				pre_money: "发生前金额",
				// 				bal_money: "发生后余额",
				// 				pay_money: "发生金额",
				// 				bean_money: "发生抵用券",
				// 				dpt_money: "保证金及其它",
				// 				fee_money: "综合手续费",
				// 				remark: "备注",
				// 				stock_code: "证券代码",
				// 				stock_name: "证券名称",
				// 				is_in: "资金方向，1=入",
				monetlist: []
			}
		},
		methods: {
			showDatepick() {
				console.log('fd');
				this.showPick = true
			},
			getTime(val) {
				this.showPick = false;
				console.log(val);
			},
			// 资金流水
			capicalflow(starttime, endtime) {
				var options = {
					url: '/Sapi/Squery/list_funds', //请求接口
					method: 'GET', //请求方法全部大写，默认GET
					data: {
						page_index: 0,
						page_size: 15,
						date_start: starttime,
						date_end: endtime
					},


				}
				this.$httpReq(options).then((res) => {
					console.log('资金流水', res)
					if (res.status) {
						this.monetlist = res.data.list
					}
				}).catch((err) => {
					// 请求失败的回调
					console.log(err)
				})
			}
		},
		components: {
			datePick
		},
		onShow() {
			this.capicalflow(0, 0)
		}
	}
</script>

<style lang="scss" scoped>
	view.Bigwrap {
		min-height: 100vh;
		background-color: #f5f5f5;

		view.line1 {
			height: 88upx;
			justify-content: space-between;
			padding: 0 26upx;
			background-color: #fff;
			align-items: center;
			margin-top: 1px;

			image.right {
				width: 15px;
				height: 17px;
			}
		}

		view.listsContainer {
			background-color: #fff;
			margin: 12upx 0;

			view.line1 {
				justify-content: space-between;
				height: 72upx;
				padding: 0 26upx;

				border-bottom: 1px solid #f5f5f5;

				text.txt1 {
					line-height: 72upx;
					font-size: 15px;
					color: rgba(24, 28, 40, 1);
					margin-right: 20upx;
				}

				text.txt2 {
					line-height: 72upx;
					font-size: 13px;
					font-family: ArialMT;
					color: rgba(24, 28, 40, 1);
				}

				view.timetxt {
					font-size: 13px;
					font-family: ArialMT;
					color: rgba(130, 133, 151, 1);
					line-height: 72upx;

					text.mr5 {
						margin-right: 5px;
					}
				}
			}

			view.line2 {
				padding: 0 26upx;

				view.line1 {
					justify-content: space-between;
					height: 72upx;
					padding: 0 26upx;

					border-bottom: 1px solid #f5f5f5;

					text.txt1 {
						line-height: 72upx;
						font-size: 15px;
						color: rgba(24, 28, 40, 1);
						margin-right: 20upx;
					}

					text.txt2 {
						line-height: 72upx;
						font-size: 13px;
						font-family: ArialMT;
						color: rgba(24, 28, 40, 1);
					}

					view.timetxt {
						font-size: 13px;
						font-family: ArialMT;
						color: rgba(130, 133, 151, 1);
						line-height: 72upx;
					}
				}

				view.line2 {
					padding: 0 26upx;

					view.bigTxt {
						font-size: 26px;
						font-family: ArialMT;
						color: rgba(240, 95, 92, 1);
						line-height: 26px;
						margin: 32upx 0 25upx;
					}

					view.info {
						justify-content: space-between;
						font-size: 14px;
						font-family: ArialMT;
						color: rgba(24, 28, 40, 1);
						line-height: 14px;

						text.infoName {
							color: rgba(112, 118, 128, 1);
							line-height: 14px;
							margin-right: 20upx;
						}
					}
				}
			}
		}
	}
</style>
