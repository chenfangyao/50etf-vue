<template>
	<view class="wrap">
		<base-header title='添加银行卡' has-back='1'></base-header>
    <view class='list-row'>
      <text>开户银行</text>
      <input type="text" placeholder-class='_placeholder' placeholder='选择开户银行'>
    </view>
    <view class='list-row'>
      <text>卡号</text>
      <input type="number" placeholder-class='_placeholder' placeholder='填写卡号'>
    </view>
    <view class='list-row' >
      <text>姓名</text>
      <input type="text"  placeholder='填写姓名'>
    </view>
    <view class="fixBottom">

     <btn-block txt='添加' @tap='addbank' ></btn-block>
    </view>
	</view>
</template>

<script>
import btnBlock from '@/components/btnBlock.vue'

export default {
  data() {
    return {

    };
  },
  components: { btnBlock },
	methods:{
		getbanklist() {
				var options = {
						url: '/Sapi/Ubank/bank_list', //请求接口
						method: 'GET', //请求方法全部大写，默认GET
				}
				this.$httpReq(options).then((res) => {
						// 请求成功的回调
						// res为服务端返回数据的根对象
						console.log('银行卡列表', res)
						if(res.status){
					
						}
				}).catch((err) => {
						// 请求失败的回调
						console.log(err)
				})
		},
		addbank(){
			var options = {
					url: '/Sapi/Ubank/bind', //请求接口
					method: 'POST', //请求方法全部大写，默认GET
			}
			this.$httpReq(options).then((res) => {
					// 请求成功的回调
					// res为服务端返回数据的根对象
					console.log('银行卡列表', res)
					if(res.status){
				
					}
			}).catch((err) => {
					// 请求失败的回调
					console.log(err)
			})
		}
	},
	onLoad(){
		this.getbanklist()
	}
}
</script>


<style lang="scss" scoped>
view.wrap {
  background-color: #f5f5f5;
  min-height: 100vh;

  view.list-row {
    width: 750upx;
    height: 98upx;
    background: rgba(255, 255, 255, 1);
    border-top: 1px solid #eee;
    line-height: 98upx;
    padding-left: 37upx;
    display: flex;
    align-items: center;
    > text:first-child {
      width: 65px;
      font-size: 15px;
      color: rgba(24, 28, 40, 1);
      margin-right: 44upx;
    }
    input {
      flex-grow: 1;
      margin-right: 2em;
    }
  }
  view.fixBottom {
    position: fixed;
    bottom: 20upx;
    left: 0;
    right: 0;
  }
}
</style>
