<template>
  <view class="wrap">
    <base-header has-back='1'></base-header>
    <view class="title">{{conent.title}}</view>
    <view class="timeTitle">{{datetimes}}</view>
    <!-- <view class="content">{{conent.content}}</view> -->
	<rich-text :nodes="conent.content"></rich-text>
  </view>
</template>

<script>
export default {
  data() {
    return {
           artid:'',
		   conent:'',
		   formatecontent:'',
		   datetimes:''
    };
  },
	methods:{
		getartcont(id){
			var options = {
				url: '/Sapi/Article/cont', //请求接口
				data: {
					id: id,
				}, //发送给服务端的数据
				method: 'GET', //请求方法全部大写，默认GET
			}
			this.$httpReq(options).then((res) => {
				// 请求成功的回调
				// res为服务端返回数据的根对象
				console.log('文章详情',res)
				if (res.status == 1) {
					this.conent=res.data
					this.datetimes=this.$formatetimestr(this.conent.update_time || this.conent.create_time)
				}
			}).catch((err) => {
				// 请求失败的回调
				console.error(err,'捕捉')
			})
		},
		getmymessage(id){
			var options = {
				url: '/Sapi/Ucenter/message_cont', //请求接口
				data: {
					id: id,
				}, //发送给服务端的数据
				method: 'GET', //请求方法全部大写，默认GET
			}
			this.$httpReq(options).then((res) => {
				// 请求成功的回调
				// res为服务端返回数据的根对象
				console.log('文章详情',res)
				if (res.status == 1) {
					this.conent=res.data
				}
			}).catch((err) => {
				// 请求失败的回调
				console.error(err,'捕捉')
			})
		}
	},
	onLoad(opt){
		this.artid=opt.id
		if(opt.title=='消息'){
			this.getmymessage(this.artid)
		}else{
			this.getartcont(this.artid)
		}
		
	}
}
</script>

<style lang="scss" scoped>
view.wrap {
  text-align: center;
  .title {
    font-size: 20px;
    color: rgba(24, 28, 40, 1);
    padding-top: 51upx;
    border-top: 1px solid #f5f5f5;
  }
  .timeTitle {
    font-size: 13px;
    color: rgba(130, 133, 151, 1);
  }
  .content {
    font-size: 15px;
    color: rgba(24, 28, 40, 1);
    line-height: 58upx;
    margin: 40upx 43upx 0 36upx;
    text-align: left;
  }
}
</style>

