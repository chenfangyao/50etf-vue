<template>
  <div>
    <div class="rechargeWay root-el uni-flex" v-vtap="{method:switchPop}">
      <!-- wayLists是否绑定银行 -->
      <!-- 暂时无logo先隐藏 -->
      <img class="zhifubao" :src="logoImg||banklogo">
      <div class="txt">
        <div class="textc1">{{textbank}}</div>
        <div v-if="txt2">
          <span class="textc2">{{txt2}}</span>
        </div>
        <div v-if="txt1">
          <span class="textc2">{{txt1}}</span>
        </div>
      </div>
      <img class="to_r" v-if="!logoImg" src="../../assets/arrow/r.png">
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
    }
  },
  props: {
    txt1: '',
    txt2: {},
    logoImg:''
  },
  methods: {
    chooseWay(i) {
      this.$emit('change-wayi', i)
      this.textbank = i.pay_name
      this.banklogo = i.logo
      this.switchPop()
    },
    switchPop() {
      if(this.logoImg)return;
      this.showAction = !this.showAction
    },
    assignment(arr) {
      if (arr.length === 0) return;
      if (this.paylist.default_pay) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].pay_code === this.paylist.default_pay) {
            this.textbank = arr[i].pay_name
            this.banklogo = arr[i].logo
            this.$emit('calc-default',arr[i])
            return
          }
        }
      }
      this.textbank = arr[0].pay_name
      this.banklogo = arr[0].logo
      this.$emit('calc-default',arr[0])
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
    // background-color: #409de5;
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
  img.to_r {
    width: 0.25rem;
    margin-right: 0.24rem;
    height: 0.3rem;
  }
}
</style>
