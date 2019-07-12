<template>
  <div class="wrap black1" :style="{'padding-top': statusbarHeight+140+'px'}">
    <headerCard></headerCard>
    <div class="items black1">
      <div class="uni-flex black2 textc1" v-hover-class="'self-hover'" v-vtap="{method: go , params: 'capital_flow/capital_flow'}">
        <img src="../../../assets/mineImg/01.png" />
        <span>资金流水</span>
        <span class="tip" v-if="false"></span>
        <img src="../../../assets/mineImg/arrow.png" />
      </div>
      <div class="uni-flex black2 textc1" v-hover-class="'self-hover'" v-vtap="{method: go , params: 'add_card_btn'}">
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
      <!-- <div class="uni-flex black2 textc1" v-hover-class="'self-hover'" v-vtap="{method: go , params: 'red_envelope_1/red_envelope_1'}">
        <img src="../../../assets/mineImg/04.png" />
        <span>我的红包</span>
        <span class="tip" v-if="false"></span>
        <img src="../../../assets/mineImg/arrow.png" />
      </div> -->
      <div class="uni-flex bb6 black2 textc1" v-hover-class="'self-hover'" v-if='switchObj.show_invite==="1"' v-vtap="{method: go , params: 'invite_friends/invite_friends'}">
        <img src="../../../assets/mineImg/05.png" />
        <span>邀请好友</span>
        <span class="tip" v-if="false"></span>
        <img src="../../../assets/mineImg/arrow.png" />
      </div>
      <div class="uni-flex black2 textc1" v-hover-class="'self-hover'" v-vtap="{method: go , params: 'my_customer_service/my_customer_service'}">
        <img src="../../../assets/mineImg/06.png" />
        <span>联系客服</span>
        <span class="tip" v-if="false"></span>
        <img src="../../../assets/mineImg/arrow.png" />
      </div>
      <div class="uni-flex black2 textc1" v-if="switchObj.show_skin_btn==='1'">
        <s-icon icon-class="moon"></s-icon>
        <span>夜间模式</span>
        <van-switch size="20px" active-color='$primary1' :value="atNight" @input="changeTheme" />
      </div>
      <!-- <div class="uni-flex" v-hover-class="'self-hover'">
        <img src="/assets/mineImg/07.png" />
        <span>50ETF</span>
        <span class="tip" v-if="false"></span>
        <img src="../../../static/mineImg/arrow.png" />
      </div> -->
      <!--  <div class="uni-flex black2 textc1" v-hover-class="'self-hover'" v-vtap="{method: go , params: 'about_us/about_us'}" >
        <img src="../../../assets/mineImg/08.png" />
        <span>关于我们</span>
        <img src="../../../assets/mineImg/arrow.png" />
      </div> -->

    </div>
  </div>
</template>

<script>
import headerCard from '@/components/mineSub/headerCard.vue'
import { mapState, mapMutations } from 'vuex';
import { Switch } from 'vant';

export default {
  data() {
    return {
    }
  },
  computed: mapState(['sid', 'indextimmer', 'newlengths', 'switchObj', 'statusbarHeight', 'atNight']),
  methods: {
    ...mapMutations(['setnewlengths', 'setatNight']),
    go(href) {
      if (!this.sid) {
        this.$tipLogin()
        return
      }
      this.$navigateTo({ url: '/pages/mine_sub/' + href })
    },
    changeTheme(val) {
      val ? localStorage.setItem('selfTheme', 0) : localStorage.setItem('selfTheme', 1)
      this.setatNight(val)
      location.reload()
    },
    getmymessage() {
      var options = {
        url: '/Sapi/Ucenter/message_list',
        method: 'GET',
        data: {
          page_index: 0,
          page_size: 7,
        },
      }
      this.$httpReq(options).then((res) => {
        if (res.status) {
          this.setnewlengths(res.data.list.length.toString())
        }
      }).catch((err) => {
        console.error(err, '捕捉')
      })
    },
  },
  created() {
    this.getmymessage()
  },
  components: {
    headerCard,
    [Switch.name]: Switch
  },
  activated() {
    if (process.env.API_HOST) plus.navigator.setStatusBarStyle("light");
  },
  deactivated() {
    if (process.env.API_HOST) this.atNight || plus.navigator.setStatusBarStyle("dark");
  }
}
</script>

<style scoped lang="scss">
div.wrap {
  background-color: #f5f5f5;
  min-height: calc(100vh - 51px);
  div.items {
    margin: 0 0.2rem;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    z-index: 50;
    background-color: #f5f5f5;
    > div {
      justify-content: space-between;
      background-color: #fff;
      font-size: 15px;
      font-weight: 400;
      align-items: center;
      color: rgba(24, 28, 40, 1);
      margin-bottom: 1px;
      height: 0.96rem;
      line-height: 0.96rem;
      padding: 0 0.26rem 0 0.42rem;
      span {
        flex-grow: 1;
      }
      span.tip {
        flex-grow: 0;
        width: 0.16rem;
        height: 0.16rem;
        border-radius: 50%;
        background-color: #f16164;
        margin: 0.4rem.20rem 0 0;
      }
      img:first-child {
        width: 0.48rem;
        height: 0.48rem;
        margin-right: 0.46rem;
      }
      .s-icon {
        margin-right: 0.49rem;
        margin-left: 2px;
        width: 0.4rem;
        height: 0.4rem;
      }
      img:last-child {
        width: 0.3rem;
        height: 0.3rem;
      }
    }
    .van-switch--on {
      background-color: $primary1;
    }
    div.bb6 {
      margin-bottom: 0.12rem;
    }
  }
}
</style>
