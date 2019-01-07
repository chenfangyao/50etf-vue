<template>
  <view>
    <base-header title="交易规则" has-back='1'></base-header>
    <view class="border1"></view>
    <view class="title">{{rules.title}}</view>
    <!-- <view class="content">{{rules.content}}</view> -->
		<view class="content"><rich-text :nodes="rules.content"></rich-text></view>
		
  </view>
</template>

<script>
export default {
  data() {
    return {
rules:''
    };
  },
	methods:{
		tradrule() {
				var options = {
						url: '/Sapi/Article/cont', //请求接口
						method: 'GET', //请求方法全部大写，默认GET
						data: {
								id:6
						},
				}
				this.$httpReq(options).then((res) => {
						// 请求成功的回调
						// res为服务端返回数据的根对象
						console.log('交易规则', res)
						if(res.status){
								this.rules = res.data
						}
				}).catch((err) => {
						// 请求失败的回调
						console.log(err)
				})
		},
	},
	onLoad(){
		this.tradrule()
	}
}
</script>

<style lang="scss" scoped>
view.border1 {
  border-bottom: 1px solid #ededed;
}
view.title {
  font-size: 16px;
  padding: 0 43upx;
  color: rgba(24, 28, 40, 1);
  margin: 50upx 0 34upx;
  line-height: 16px;
	text-align: center;
}
view.content {
  font-size: 15px;
  color: rgba(112, 118, 128, 1);
  line-height: 58upx;
  padding: 0 43upx;
  
}
</style>

