<template>
	<view>
		<base-header title='风险揭示书' has-back='1'></base-header>
<!--    <view class="txt">     尊敬的投资者:
投资是有风险的。当你认购或认购私募股权基金时，你可能会获得投资回报，但同时你也会面临投资风险。在进行投资决策之前，您/您的组织应该仔细阅读风险揭示和基金契约，充分了解基金的风险收益特征和产品特征，认真考虑基金中存在的风险因素，充分考虑其风险承受能力，做出理性判断，慎重做出投资决策。
根据相关法律法规，基金管理人[上海北斗投资管理有限公司]和投资者分别作出以下承诺、风险披露和声明:
一、基金经理的承诺
(一)私募股权基金管理人保证在募集资金前在中国证券投资基金业协会(以下简称中国基金业协会)注册为私募股权基金管理人，并取得《基金管理人登记代码》。
</view> -->
    <view class='txt'>
		<view class="arttitle">
			<text>{{rescontent.title}}</text>
		</view>
		<view class="artwenan">
			<rich-text :nodes="rescontent.content"></rich-text>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rescontent:{}
			};
		},
		onLoad(){
			this.conf()
		},
		methods:{
			conf() {
			  var options = {
			    url: '/Sapi/Article/cont', //请求接口
			    data: {
			      id:1
			    }, //发送给服务端的数据
			    method: 'GET', //请求方法全部大写，默认GET
			  }
			  this.$httpReq(options).then((res) => {
			    // 请求成功的回调
			    // res为服务端返回数据的根对象
			    console.log(res)
			    if (res.status == 1) {
					this.rescontent=res.data
			    }
			  }).catch((err) => {
			    // 请求失败的回调
			    console.error(err,'捕捉')
			  })
			},
		}
	}
</script>

<style lang="scss" scoped>
view.txt{
  padding:  59upx 32upx 0 45upx;
  white-space: pre-wrap;
  border-top: 1px solid #eee;
}
	.artconent {
		text-align: center;
		margin: 10px 15px;
	}
	view.arttitle {
		justify-content: space-between;
		font-size: 18px;
		font-family: MicrosoftYaHei;
		text-align: center;
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

