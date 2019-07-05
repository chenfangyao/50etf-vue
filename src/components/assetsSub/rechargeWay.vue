<template>
  <div>
    <div class="rechargeWay root-el uni-flex" v-vtap="{method:switchPop}">
      <img class="zhifubao" :src="banklogo">
      <div class="txt">
        <div class="textc1">{{textbank}}</div>
        <div v-if="txt2">
          <span class="textc2">{{txt2}}</span>
        </div>
        <div v-if="txt1">
          <span class="textc2">{{txt1}}</span>
        </div>
      </div>
      <s-icon class="to_r" icon-class="enterright"></s-icon>

    </div>
    <recharge-actionsheet :show-action="showAction" @choose-way='chooseWay' @calc-complete='assignment' @close-me='switchPop'></recharge-actionsheet>

  </div>
</template>
<script>
import rechargeActionsheet from '@/components/assetsSub/rechargeActionsheet.vue'
import { mapState, mapMutations } from 'vuex';

export default {
  components: { rechargeActionsheet },
  computed: mapState(['paylist']),
  data() {
    return {
      showAction: false,
      textbank: '',
      banklogo: '',
      txt2: '',
    }
  },
  props: {
    txt1: '',
    logoImg: '',
    toAddcard: 0

  },
  methods: {
    chooseWay(obj) {
      this.$emit('change-wayi', obj)
      this.setSth(obj)
      this.switchPop()
    },
    switchPop() {
      if (this.toAddcard) {
        this.$navigateTo({
          url: '/pages/mine_sub/bank_card/add_card/add_card',
          query: { bankinfo: 0 }
        })
        return
      }
      this.showAction = !this.showAction
    },
    assignment(arr) {
      if (arr.length === 0) return;
      let obj = arr[0]
      if (this.paylist.default_pay) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].pay_code === this.paylist.default_pay) {
            obj = arr[i]
            break
          }
        }
      } 
      this.$emit('calc-default', obj)
      this.setSth(obj)
    },
    setSth(obj) {
      this.textbank = obj.pay_name || obj.bank_name
      this.banklogo = obj.logo
      obj.pay_name || (this.txt2 = obj.cardno.slice(-4))
    }
  },

}
</script>

<style lang="scss" scoped>
div.rechargeWay {
  height: 1.4rem;
  background-color: #fff;
  margin: 0.12rem 0;
  align-items: center;
  .zhifubao {
    width: 0.76rem;
    height: 0.76rem;
    margin-left: 0.46rem;
    // background-color: $primary1;
  }
  div.txt {
    flex-grow: 1;
    margin-left: 0.35rem;
    div {
      font-size: 15px;
      color: rgba(24, 28, 40, 1);
      line-height: 0.33rem;
      margin-bottom: 0.08rem;
    }
    span {
      margin-right: 0.08rem;
      font-size: 12px;
      color: rgba(168, 168, 168, 1);
      line-height: 0.28rem;
    }
  }
  .to_r {
    width: 0.25rem;
    margin-right: 0.24rem;
    height: 0.3rem;
  }
}
</style>
