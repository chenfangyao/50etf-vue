<template>
  <view class="wrap">
    <headerCard :newlength='newlength'></headerCard>
    <view class="items" >
      <view class="uni-flex" hover-class="self-hover"  @tap="go('capital_flow/capital_flow')" >
        <image src="/static/mineImg/01.png" />
        <text>资金流水</text>
        <text class="tip" v-if="false"></text>
        <image src="../../../static/mineImg/arrow.png" />
      </view>
      <!-- <view class="uni-flex" hover-class="self-hover" @tap="go('bank_card/card_list/card_list')"> -->
      <view class="uni-flex" hover-class="self-hover" @tap="go('bank_card/add_card/add_card')">
        <image src="/static/mineImg/02.png" />
        <text>银行卡</text>
        <text class="tip" v-if="false"></text>
        <image src="../../../static/mineImg/arrow.png" />
      </view>
      <view class="uni-flex bb6" hover-class="self-hover" @tap="go('trading_rules/trading_rules')">
        <image src="/static/mineImg/03.png" />
        <text>交易规则</text>
        <text class="tip" v-if="false"></text>
        <image src="../../../static/mineImg/arrow.png" />
      </view>
      <view class="uni-flex" hover-class="self-hover" @tap="go('red_envelope/red_envelope')">
        <image src="/static/mineImg/04.png" />
        <text>我的红包</text>
        <text class="tip" v-if="false"></text>
        <image src="../../../static/mineImg/arrow.png" />
      </view>
      <view class="uni-flex bb6" hover-class="self-hover"  @tap="go('invite_friends/invite_friends')">
        <image src="/static/mineImg/05.png" />
        <text>邀请好友</text>
        <text class="tip" v-if="false"></text>
        <image src="../../../static/mineImg/arrow.png" />
      </view>
      <view class="uni-flex" hover-class="self-hover"  @tap="go('my_customer_service/my_customer_service')">
        <image src="/static/mineImg/06.png" />
        <text>联系客服</text>
        <text class="tip" v-if="false"></text>
        <image src="../../../static/mineImg/arrow.png" />
      </view>
      <!-- <view class="uni-flex" hover-class="self-hover">
        <image src="/static/mineImg/07.png" />
        <text>50ETF</text>
        <text class="tip" v-if="false"></text>
        <image src="../../../static/mineImg/arrow.png" />
      </view> -->
      <view class="uni-flex" hover-class="self-hover" @tap="go('about_us/about_us')" >
        <image src="/static/mineImg/08.png" />
        <text>关于我们</text>
        <text class="tip" v-if="true"></text>
        <image src="../../../static/mineImg/arrow.png" />
      </view>
    </view>
  </view>
</template>

<script>
import headerCard from '@/components/mineSub/headerCard.vue'
import { mapState } from 'vuex';
import util from '@/common/util.js'
export default {
  data() {
    return {
			newlength:''
		}
  },
	computed: mapState(['sid','indextimmer']),
  methods: {
    go(href) {
			if(!this.sid){
				 uni.showModal({
				        title:'您还未登录',
				        content:'现在去登录',
				        success:(res)=>{
				            if (res.confirm) {
				                uni.navigateTo({
				                	url: '/pages/login/login',
				                	success: res => {},
				                	fail: () => {},
				                	complete: () => {}
				                });
				            } else if (res.cancel) {
				                console.log('用户点击取消');
				            }
				        }
				    })
						return
			}
			if(href=='bank_card/add_card/add_card'){
				var options = {
						url:'/Sapi/Ubank/info', //请求接口
						method: 'GET', //请求方法全部大写，默认GET
				}
				this.$httpReq(options).then((res) => {
						// 请求成功的回调
						// res为服务端返回数据的根对象
						console.log('我的银行', res)
						if(res.status){
							if(res.data.sub_id!=undefined){
								uni.navigateTo({ url:'/pages/mine_sub/'+href })
							}else{
								uni.navigateTo({ url:'/pages/mine_sub/bank_card/add_card_btn/add_card_btn'})
							}					
						}
				}).catch((err) => {
						// 请求失败的回调
						console.log(err)
				})
			}else{
				uni.navigateTo({ url:'/pages/mine_sub/'+href })
			} 
    },
			getmymessage(){
			var options = {
					url: '/Sapi/Ucenter/message_list', //请求接口
					method: 'GET', //请求方法全部大写，默认GET
					data: {
							page_index: 0,
							page_size: 7,
					},
			}
			this.$httpReq(options).then((res) => {
					// 请求成功的回调
					// res为服务端返回数据的根对象
					console.log('我的消息', res)
					if(res.status){
						this.newlength = res.data.list.length
						// this.newlength = 3
					}
			}).catch((err) => {
					// 请求失败的回调
					console.log(err)
			})
		},
  },
	onShow(){
		clearInterval(util.indextimmer.indexCommonSelectStock)
		util.indextimmer.indexCommonSelectStock = null
		clearInterval(util.indextimmer.quotesCommonSelectStock)
		util.indextimmer.quotesCommonSelectStock=null
		clearInterval(util.indextimmer.quotesQryQuotationList)
		util.indextimmer.quotesQryQuotationList=null
		clearInterval(util.indextimmer.quotesQrySingleQuotationMsg)
		util.indextimmer.quotesQrySingleQuotationMsg = null
		
		this.getmymessage()
	},
  components: {
    headerCard
  }
}
</script>

<style scoped lang="scss">
view.wrap {
  background-color: #f5f5f5;
  min-height: 100vh;
  view.items {
    margin-top: 130upx;
    view {
      justify-content: space-between;
      background-color: #fff;
      font-size: 15px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(24, 28, 40, 1);
      margin-bottom: 1px;
      height: 96upx;
      line-height: 96upx;
      padding: 0 26upx 0 42upx;
      text {
        flex-grow: 1;
      }
      text.tip {
        flex-grow: 0;
        width: 16upx;
        height: 16upx;
        border-radius: 50%;
        background-color: #f16164;
        margin: 40upx 20upx 0 0;
      }
      image:first-child {
        width: 48upx;
        height: 48upx;
        margin: 24upx 46upx 0 0;
      }
      image:last-child {
        width: 30upx;
        height: 30upx;
        margin-top: 32upx;
      }
    }
    view.bb6 {
      margin-bottom: 12upx;
    }
  }
}
</style>
