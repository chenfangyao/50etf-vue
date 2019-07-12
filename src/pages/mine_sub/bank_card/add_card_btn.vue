<template>
  <div class='wrap black2'>
    <base-header title='我的银行卡' has-back='1'></base-header>
    <ul class="black2">
      <li class="uni-flex" v-for="(item ,i) in cardList" :key="i" :style="item | calcBg">
        <div class="iconDiv">
          <img :src="item.logo" alt="">
        </div>
        <div class="rightPart">
          <div class="flr" v-vtap="{method:showPop,params:item.cardno}">解绑</div>
          <div class="line1">{{item.bank_name}}</div>
          <div class="line2">储蓄卡</div>
          <div class="line3">
            <span v-for="(item2 ,i) in [,,,]" :key="i">****</span>
            <span>{{item.cardno | getLast4}}</span>
          </div>
        </div>
      </li>
    </ul>
    <div class='btnclass black2' v-vtap="{method:addbank}" v-if="cardList.length<5">
      <s-icon :icon-class="atNight?'add_black':'add_white'" class-name="plusBtn" />
      <div>添加银行卡</div>
    </div>
    <confirm-pop v-if='popShow' @cancle-tap="hidePop" @yes-tap="toUnbind"></confirm-pop>
  </div>
</template>

<script>
import btnBlock from '@/components/btnBlock.vue'
import { mapState } from 'vuex'
import $req from '@/common/request.js'
import confirmPop from '@/components/other/confirm_pop'
export default {
  data() {
    return {
      cardList: [],
      popShow: false,
      unbindNo:''
    };
  },
  filters: {
    getLast4(val) {
      return val.slice(-4)
    },
    calcBg(val) {
      return `background:linear-gradient(106deg,${val.color1} 0%,${val.color2} 99%);`
    }
  },
  computed: mapState(['atNight']),
  components: { btnBlock, confirmPop },
  methods: {
    addbank() {
      this.$navigateTo({
        url: '/pages/mine_sub/bank_card/add_card/add_card',
        query: { bankinfo: 0 }
      })
    },
    hidePop(){
      this.popShow=false
    },
    showPop(val){
      this.popShow = true
      this.unbindNo=val
    },
    toUnbind() {
      this.$router.push({
        path: '/pages/forget_pwd/tep2/tep2',
        query: {
          type: 'unbind',
          cardno:this.unbindNo,
          typeWhat: 2
        }
      })
    },
    getCardList() {
      this.$httpReq({ url: '/Sapi/Ubank/bankcard_list' }).then(res => this.cardList = res.data.list)
    }
  },
  created() {
    this.getCardList()
  }
}
</script>

<style lang="scss" scoped>
div.btnclass {
  padding-top: 50px;
  text-align: center;
  color: #666;
  .plusBtn {
    font-size: 50px;
    margin-bottom: 5px;
  }
}
li {
  width: 7.06rem;
  height: 2.4rem;
  margin: 5px auto;
  align-items: center;
  padding: 0 0.27rem;

  box-shadow: 2px 3px 12px 0px rgba(189, 32, 38, 0.4);
  border-radius: 10px;
  .iconDiv {
    width: 50px;
    height: 50px;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    margin-right: 0.39rem;
    justify-content: center;
    transform: translateY(-10px);
    img {
      width: 48px;
      height: 48px;
    }
  }
  .rightPart {
    flex-grow: 1;
    color: #fff;
    .flr {
      float: right;
      width: 1.2rem;
      height: 0.48rem;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 12px;
      text-align: center;
      font-size: 12px;
      line-height: 0.48rem;
    }
    .line1 {
      font-size: 16px;
      font-weight: bold;
      line-height: 1;
    }
    .line3 {
      font-size: 16px;
      margin-top: 0.2rem;
      span {
        margin-right: 0.4rem;
      }
    }
  }
}
</style>
