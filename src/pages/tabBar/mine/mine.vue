<template>
  <div class="wrap">
    <headerCard ></headerCard>
    <div class="items" >
      <div class="uni-flex black2 textc1" v-hover-class="'self-hover'"  v-vtap="{method: go , params: 'capital_flow/capital_flow'}" >
        <img src="../../../assets/mineImg/01.png" />
        <span>资金流水</span>
        <span class="tip" v-if="false"></span>
        <img src="../../../assets/mineImg/arrow.png" />
      </div>
      <!-- <div class="uni-flex" v-hover-class="'self-hover'" v-vtap="{method: go , params: 'bank_card/card_list/card_list'}"> -->
      <div class="uni-flex black2 textc1" v-hover-class="'self-hover'" v-vtap="{method: go , params: 'bank_card/add_card/add_card'}">
        <img src="../../../assets/mineImg/02.png" />
        <span>银行卡</span>
        <span class="tip" v-if="false"></span>
        <img src="../../../assets/mineImg/arrow.png" />
      </div>
      <div class="uni-flex bb6 black2 textc1" v-hover-class="'self-hover'" v-vtap="{method: go , params: 'trading_rules/trading_rules'}">
        <img src="../../../assets/mineImg/03.png" />
        <span>交易规则</span>
        <span class="tip" v-if="false"></span>
        <img src="../../../assets/mineImg/arrow.png" />
      </div>
      <div class="uni-flex black2 textc1" v-hover-class="'self-hover'" v-vtap="{method: go , params: 'red_envelope_1/red_envelope_1'}">
        <img src="../../../assets/mineImg/04.png" />
        <span>我的红包</span>
        <span class="tip" v-if="false"></span>
        <img src="../../../assets/mineImg/arrow.png" />
      </div>
      <div class="uni-flex bb6 black2 textc1" v-hover-class="'self-hover'"  v-vtap="{method: go , params: 'invite_friends/invite_friends'}">
        <img src="../../../assets/mineImg/05.png" />
        <span>邀请好友</span>
        <span class="tip" v-if="false"></span>
        <img src="../../../assets/mineImg/arrow.png" />
      </div>
      <div class="uni-flex black2 textc1" v-hover-class="'self-hover'"  v-vtap="{method: go , params: 'my_customer_service/my_customer_service'}">
        <img src="../../../assets/mineImg/06.png" />
        <span>联系客服</span>
        <span class="tip" v-if="false"></span>
        <img src="../../../assets/mineImg/arrow.png" />
      </div>
      <!-- <div class="uni-flex" v-hover-class="'self-hover'">
        <img src="/assets/mineImg/07.png" />
        <span>50ETF</span>
        <span class="tip" v-if="false"></span>
        <img src="../../../static/mineImg/arrow.png" />
      </div> -->
      <div class="uni-flex black2 textc1" v-hover-class="'self-hover'" v-vtap="{method: go , params: 'about_us/about_us'}" >
        <img src="../../../assets/mineImg/08.png" />
        <span>关于我们</span>
        <!-- <span class="tip" v-if="true"></span> -->
        <img src="../../../assets/mineImg/arrow.png" />
      </div>


    </div>
  </div>
</template>

<script>
import headerCard from '@/components/mineSub/headerCard.vue'
import { mapState, mapMutations } from 'vuex';
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
				this.$tipLogin()
						return
			}
			if(href=='bank_card/add_card/add_card'){
				var options = {
						url:'/Sapi/Ubank/info', //请求接口
						method: 'GET', 
				}
				this.$httpReq(options).then((res) => {
						if(res.status){
							if(res.data.sub_id!=undefined){
								this.$navigateTo({ url:'/pages/mine_sub/bank_card/add_card/add_card' })
							}else{
								this.$navigateTo({ url:'/pages/mine_sub/bank_card/add_card_btn/add_card_btn'})
							}
						}
				}).catch((err) => {
						console.error(err,'捕捉')
				})
			}else{
				this.$navigateTo({ url:'/pages/mine_sub/'+href })
			}
    },
		getmymessage(){
			var options = {
					url: '/Sapi/Ucenter/message_list', //请求接口
					method: 'GET', 
					data: {
							page_index: 0,
							page_size: 7,
					},
			}
			this.$httpReq(options).then((res) => {
					if(res.status){
						this.setnewlengths(res.data.list.length.toString())
					}
			}).catch((err) => {
					console.error(err,'捕捉')
			})
		},
  },
	created(){
		this.getmymessage()
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
      padding: 0 .26rem 0 .42rem;
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
