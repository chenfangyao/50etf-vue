<!-- <template>
	<view class="container">
		<page-head :title="title"></page-head>
		<view>
			<qrcode :val="qrval" :size="qrsize" ref="qrcode"></qrcode>
		</view>
		<view class="uni-padding-wrap">
			<view class="uni-title">请输入要生成的二维码内容</view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<input class="uni-input" placeholder="请输入要生成的二维码内容" :value="qrval" @input="bindClearInput" />
				<view class="uni-icon uni-icon-clear" v-if="showClearIcon" @click="clearIcon"></view>
			</view>
		</view>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-title">设置二维码大小</view>
		</view>
		<view class="body-view">
			<slider :value="qrsize" @change="sliderchange" min="50" max="500" show-value/>
		</view>
		<view class="uni-padding-wrap">
			<view class="uni-btn-v uni-common-mt">
				<button type="primary" @tap="creatQrcode">生成二维码</button>
				<button type="warn" @tap="clearQrcode">清除二维码</button>
			</view>
		</view>
		<qrcode-vue 
          size="300" 
          level="H" ref="qrcodes" 
          :value="codeValue">
      </qrcode-vue>
	  <qrcode-vue :logoSrc="imageUrl" :text="codeValue" :logoScale="50" :size="300"></qrcode-vue>
		<page-foot :name="name"></page-foot>
	</view>
</template>
<script>
	import qrcode from '@/components/qrcode/qrcode.vue'
	// import QrcodeVue from 'qrcode'
	import QrcodeVue from 'vue-qr'

	export default {
		data() {
			return {
				title: '二维码生成',
				name:'lff',
				showClearIcon: false,
				qrval:'',
				qrsize:100,
				codeValue:'565',
				// imageUrl:'/static/assetsImg/recharge.png',//默认二维码中间图片
			}
		},
		methods: {
			bindClearInput: function (e) {
				this.qrval = e.target.value;
				if (e.target.value.length > 0) {
					this.showClearIcon = true;
				} else {
					this.showClearIcon = false;
				}
			},
			clearIcon: function () {
				this.qrval = "";
				this.showClearIcon = false;
			},
			sliderchange(e){
				this.qrsize = e.detail.value
			},
			creatQrcode(){
				this.$refs.qrcode.creatQrcode();
				this.$refs.qrcodes.creatQrcode();
			},
			clearQrcode(){
				this.$refs.qrcode.clearQrcode();
				this.clearIcon();
			}
		},
		components: {
			qrcode,
			QrcodeVue,
			// VueQr
		}
	}
</script>

 -->


<template>
	<view class="container">
		<page-head :title="title"></page-head>
		<view>
			<qrcode :val="qrval" :size="qrsize" ref="qrcode"></qrcode>
		</view>
		<view class="uni-padding-wrap">
			<view class="uni-title">请输入要生成的二维码内容</view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<input class="uni-input" placeholder="请输入要生成的二维码内容" :value="qrval" @input="bindClearInput" />
				<view class="uni-icon uni-icon-clear" v-if="showClearIcon" @click="clearIcon"></view>
			</view>
		</view>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-title">设置二维码大小</view>
		</view>
		<view class="body-view">
			<slider :value="qrsize" @change="sliderchange" min="50" max="500" show-value />
		</view>
		<view class="uni-padding-wrap">
			<view class="uni-btn-v uni-common-mt">
				<button type="primary" @tap="creatQrcode">生成二维码</button>
				<button type="warn" @tap="clearQrcode">清除二维码</button>
			</view>
		</view>
		<qrcode-vue size="300" level="H" ref="qrcodes" :value="codeValue">
		</qrcode-vue>
		<qrcode-vue :logoSrc="imageUrl" :text="codeValue" :logoScale="50" :size="300"></qrcode-vue>
		<page-foot :name="name"></page-foot>
	</view>
</template>
<script>
	// import qrcode from '@/components/qrcode/qrcode.vue'
	// import QrcodeVue from 'qrcode'
	import QrcodeVue from 'vue-qr'
	import imageUrl from '@/static/assetsImg/recharge.png'
	export default {
		data() {
			return {
				title: '二维码生成',
				name: 'lff',
				showClearIcon: false,
				qrval: '',
				qrsize: 100,
				codeValue: '565',
				// imageUrl:'/static/assetsImg/recharge.png',//默认二维码中间图片
				imageUrl, //默认二维码中间图片
			}
		},
		methods: {
			bindClearInput: function(e) {
				this.qrval = e.target.value;
				if (e.target.value.length > 0) {
					this.showClearIcon = true;
				} else {
					this.showClearIcon = false;
				}
			},
			clearIcon: function() {
				this.qrval = "";
				this.showClearIcon = false;
			},
			sliderchange(e) {
				this.qrsize = e.detail.value
			},
			creatQrcode() {
				this.$refs.qrcode.creatQrcode();
				this.$refs.qrcodes.creatQrcode();
			},
			clearQrcode() {
				this.$refs.qrcode.clearQrcode();
				this.clearIcon();
			}
		},
		components: {
			QrcodeVue,
			// VueQr
		}
	}
</script>
