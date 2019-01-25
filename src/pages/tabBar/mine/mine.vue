<template>
  <div class="wrap">
    <headerCard ></headerCard>
    <div class="items" >
      <div class="uni-flex" hover-class="self-hover"  @touchend="go('capital_flow/capital_flow')" >
        <img src="/assets/mineImg/01.png" />
        <span>资金流水</span>
        <span class="tip" v-if="false"></span>
        <img src="../../../static/mineImg/arrow.png" />
      </div>
      <!-- <div class="uni-flex" hover-class="self-hover" @touchend="go('bank_card/card_list/card_list')"> -->
      <div class="uni-flex" hover-class="self-hover" @touchend="go('bank_card/add_card/add_card')">
        <img src="/assets/mineImg/02.png" />
        <span>银行卡</span>
        <span class="tip" v-if="false"></span>
        <img src="../../../static/mineImg/arrow.png" />
      </div>
      <div class="uni-flex bb6" hover-class="self-hover" @touchend="go('trading_rules/trading_rules')">
        <img src="/assets/mineImg/03.png" />
        <span>交易规则</span>
        <span class="tip" v-if="false"></span>
        <img src="../../../static/mineImg/arrow.png" />
      </div>
      <div class="uni-flex" hover-class="self-hover" @touchend="go('red_envelope/red_envelope')">
        <img src="/assets/mineImg/04.png" />
        <span>我的红包</span>
        <span class="tip" v-if="false"></span>
        <img src="../../../static/mineImg/arrow.png" />
      </div>
      <div class="uni-flex bb6" hover-class="self-hover"  @touchend="go('invite_friends/invite_friends')">
        <img src="/assets/mineImg/05.png" />
        <span>邀请好友</span>
        <span class="tip" v-if="false"></span>
        <img src="../../../static/mineImg/arrow.png" />
      </div>
      <div class="uni-flex" hover-class="self-hover"  @touchend="go('my_customer_service/my_customer_service')">
        <img src="/assets/mineImg/06.png" />
        <span>联系客服</span>
        <span class="tip" v-if="false"></span>
        <img src="../../../static/mineImg/arrow.png" />
      </div>
      <!-- <div class="uni-flex" hover-class="self-hover">
        <img src="/assets/mineImg/07.png" />
        <span>50ETF</span>
        <span class="tip" v-if="false"></span>
        <img src="../../../static/mineImg/arrow.png" />
      </div> -->
      <div class="uni-flex" hover-class="self-hover" @touchend="go('about_us/about_us')" >
        <img src="/assets/mineImg/08.png" />
        <span>关于我们</span>
        <span class="tip" v-if="true"></span>
        <img src="../../../static/mineImg/arrow.png" />
      </div>
    </div>
  </div>
</template>

<script>
import headerCard from '@/components/mineSub/headerCard.vue'
import { mapState, mapMutations } from 'vuex';
import util from '@/common/util.js'
export default {
  data() {
    return {
		}
  },
	computed: mapState(['sid','indextimmer','newlengths']),
  methods: {
		...mapMutations(['setnewlengths']),
    go(href) {
			if(!this.sid){
				 uni.showModal({
				        title:'您还未登录',
				        content:'现在去登录',
				        success:(res)=>{
				            if (res.confirm) {
				                this.$navigateTo({
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
								this.$navigateTo({ url:'/pages/mine_sub/'+href })
							}else{
								this.$navigateTo({ url:'/pages/mine_sub/bank_card/add_card_btn/add_card_btn'})
							}					
						}
				}).catch((err) => {
						// 请求失败的回调
						console.error(err,'捕捉')
				})
			}else{
				this.$navigateTo({ url:'/pages/mine_sub/'+href })
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
						this.setnewlengths(res.data.list.length.toString())
					}
			}).catch((err) => {
					// 请求失败的回调
					console.error(err,'捕捉')
			})
		},
  },
	created(){
		this.getmymessage()
		clearInterval(util.indextimmer.indexCommonSelectStock)
		util.indextimmer.indexCommonSelectStock = null
		clearInterval(util.indextimmer.quotesCommonSelectStock)
		util.indextimmer.quotesCommonSelectStock=null
		clearInterval(util.indextimmer.quotesQryQuotationList)
		util.indextimmer.quotesQryQuotationList=null
		clearInterval(util.indextimmer.quotesQrySingleQuotationMsg)
		util.indextimmer.quotesQrySingleQuotationMsg = null	
	},
  components: {
    headerCard
  }
}
</script>

<style scoped lang="scss">
div.wrap {
  background-color: #f5f5f5;
  min-height: 100vh;
  div.items {
    margin-top:1.30rem;
    div {
      justify-content: space-between;
      background-color: #fff;
      font-size: 15px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(24, 28, 40, 1);
      margin-bottom: 1px;
      height:.96rem;
      line-height:.96rem;
      padding: 0.26rem 0.42rem;
      span {
        flex-grow: 1;
      }
      span.tip {
        flex-grow: 0;
        width:.16rem;
        height:.16rem;
        border-radius: 50%;
        background-color: #f16164;
        margin:.40rem.20rem 0 0;
      }
      img:first-child {
        width:.48rem;
        height:.48rem;
        margin:.24rem.46rem 0 0;
      }
      img:last-child {
        width:.30rem;
        height:.30rem;
        margin-top:.32rem;
      }
    }
    div.bb6 {
      margin-bottom:.12rem;
    }
  }
}
</style>
