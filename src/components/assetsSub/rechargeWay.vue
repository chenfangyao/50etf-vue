<template>
<div >
  <div class="rechargeWay root-el uni-flex" v-vtap="{method:switchPop}">
		<!-- wayLists是否绑定银行 -->
		<!-- 暂时无logo先隐藏 -->
      <img  class="zhifubao" :src="banklogo" >
      <div class="txt">
        <div class="textc1">{{textbank}}</div>
        <div v-if="txt2">
          <span class="textc2" >{{txt2}}</span>
        </div>
      </div>
      <img  class="to_r" src="../../assets/arrow/r.png">
  </div>
  <recharge-actionsheet v-if="showAction" @choose-way='chooseWay'  @close-me='switchPop'></recharge-actionsheet>
  
</div>
</template>
<script>
import rechargeActionsheet from '@/components/assetsSub/rechargeActionsheet.vue'
import { mapState, mapMutations } from 'vuex';

export default {
  components: {   rechargeActionsheet },
	computed: {...mapState(['paylist'])},
  data() {
    return {
      showAction: false,
			textbank:'',
			banklogo:'',			
    }
  },
  props:{
    txt1:'',
    txt2:{},
    goTo:'',
  },
  methods: {
    chooseWay(i) {
      this.$emit('change-wayi',i)
			this.textbank=i.pay_name
			this.banklogo=i.logo
      this.switchPop()
    },
    switchPop() {
      if(this.goTo){
        // this.$navigateTo({url:'/pages/mine_sub/bank_card/card_list/card_list'})
        this.$navigateTo({url:'/pages/mine_sub/bank_card/add_card/add_card'})
        return
      }
      this.showAction = !this.showAction
    },
  },
  watch:{
    paylist(val){
	    this.textbank=val.remitance[0].bank_name
			this.banklogo=val.remitance[0].logo
    }
  }

}
</script>

<style lang="scss" scoped>
 div.rechargeWay {
    height:1.40rem;
    background-color: #fff;
    margin:.12rem 0;
    align-items: center;
    .zhifubao {
      width:.76rem;
      height:.76rem;
      margin-left:.46rem;
      // background-color: #409de5;
    }
    div.txt {
      flex-grow: 1;
      margin-left:.35rem;
      div {
        font-size: 15px;
        color: rgba(24, 28, 40, 1);
        line-height:.33rem;
        margin-bottom:.08rem;
      }
      span {
        margin-right:.08rem;
        font-size: 12px;
        color: rgba(168, 168, 168, 1);
        line-height:.28rem;
      }
    }
    img.to_r {
      width: .25rem;
      margin-right:.24rem;
      height: .30rem;
    }
  }
</style>
