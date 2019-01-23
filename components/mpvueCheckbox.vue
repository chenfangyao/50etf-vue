<template>
	<view class="mpvue-picker">
		<view :class="{'pickerMask':showPicker}" @click="maskClick" catchtouchmove="true"></view>
		<view class="mpvue-picker-content " :class="{'mpvue-picker-view-show':showPicker}">
			<view class="mpvue-picker__hd" catchtouchmove="true">
				<view class="mpvue-picker__action" @click="pickerCancel">取消</view>
				<view class="mpvue-picker__action" :style="{color:themeColor}" @click="pickerConfirm">确定</view>
			</view>
			<view>
				<view class="checkbox-list">
					<checkbox-group @change="checkboxChangeAll">
						<label class="uni-list-cell uni-list-cell-pd">
							<view>全部</view>
							<view>
								<checkbox value='0' :checked="checkboxAll" />
							</view>
						</label>
					</checkbox-group>
					<!-- <checkbox-group @change="checkboxChange"> -->
					<checkbox-group @change="checkboxChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item,i) in pickerValueArray" :key="i">
							<!-- <label class="uni-list-cell uni-list-cell-pd"  v-for="(item,i) in items" :key="item.value"> -->
							<view>{{item.name}}</view>
							<view>{{item.value}}张</view>
							<view>
								<!-- <checkbox :value="item.value+'-'+item.id" :checked="item.checked" :id="item.id"/> -->
								<checkbox :value="item.value+'-'+item.id" :checked="item.checked" />
							</view>
						</label>
					</checkbox-group>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pickerValue: [],
				/* 是否显示控件 */
				showPicker: false,
				seleclCheckArr: [],
				checkboxAll: false,
				items: [{
						value: 'USA',
						name: '美国'
					},
					{
						value: 'CHN',
						name: '中国',
						checked: false
					},
					{
						value: 'BRA',
						name: '巴西'
					},
					{
						value: 'JPN',
						name: '日本'
					},
					{
						value: 'ENG',
						name: '英国'
					},
					{
						value: 'FRA',
						name: '法国'
					}
				]
			};
		},
		props: {
			/* picker 数值 */
			pickerValueArray: {
				type: Array,
				default () {
					return []
				}
			},
			/* 主题色 */
			themeColor: String
		},
		methods: {
			show() {
				setTimeout(() => {
					this.showPicker = true;
					var items = this.pickerValueArray
					// 					for (var i = 0; i < items.length; i++) {
					// 					    items[i].checked = false;
					// 					}
				}, 0);
			},
			pickerCancel() {
				var items = this.pickerValueArray
				this.checkboxAll = false
				for (var i = 0; i < items.length; i++) {
					items[i].checked = false;
				}
				this.showPicker = false;
				// this.checkboxAll=false
				// this._initPickerVale();
			},
			maskClick() {
				this.pickerCancel();
			},
			pickerConfirm(e) {
				this.showPicker = false;
				// this._initPickerVale();
				if (this.checkboxAll) {
					this.$emit('onConfirm', ['all']);
				} else {
					this.$emit('onConfirm', this.seleclCheckArr);
				}
			},
			showPickerView() {
				this.showPicker = true;
			},
			checkboxChange: function(e) {
				// event.preventDefault()
				var items = this.pickerValueArray,
					values = e.detail.value;
				this.seleclCheckArr = values
				console.log(999, values)
				//             for (var i = 0, lenI = items.length; i < lenI; ++i) {
				//                 items[i].checked = false;
				//                 for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
				//                     if (items[i].value == values[j]) {
				//                         items[i].checked = true;
				//                         break
				//                     }
				//                 }
				//             }
			},
			checkboxChangeAll: function() {
				this.checkboxAll = !this.checkboxAll
				console.log(999, this.checkboxAll)
				var items = this.pickerValueArray
				if (this.checkboxAll) {
					for (var k = 0; k < items.length; k++) {
						items[k].checked = true
					}
				} else {
					for (var k = 0; k < items.length; k++) {
						items[k].checked = false
					}
				}
			},
		}
	};
</script>

<style>
	.pickerMask {
		position: fixed;
		z-index: 1000;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
	}

	.checkbox-list {
		background-color: white;
		height: 250px;
		overflow-x: auto;
	}

	.mpvue-picker-content {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		transition: all 0.3s ease;
		transform: translateY(100%);
		z-index: 3000;
	}

	.mpvue-picker-view-show {
		transform: translateY(0);
		transform: translateY(0);
	}

	.mpvue-picker__hd {
		display: flex;
		padding: 9px 15px;
		background-color: #fff;
		position: relative;
		text-align: center;
		font-size: 17px;
	}

	.mpvue-picker__hd:after {
		content: ' ';
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		height: 1px;
		border-bottom: 1px solid #e5e5e5;
		color: #e5e5e5;
		transform-origin: 0 100%;
		transform: scaleY(0.5);
	}

	.mpvue-picker__action {
		display: block;
		flex: 1;
		color: #1aad19;
	}

	.mpvue-picker__action:first-child {
		text-align: left;
		color: #888;
	}

	.mpvue-picker__action:last-child {
		text-align: right;
	}

	.picker-item {
		text-align: center;
		line-height: 40px;
		font-size: 16px;
	}

	.mpvue-picker-view {
		position: relative;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 238px;
		background-color: rgba(255, 255, 255, 1);
	}
</style>
