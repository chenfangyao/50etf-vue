<template>
  <div>

    <div class="root-el uni-flex">
      <div class="txt black2 ">
        <span class="total textc2">合计</span>
        <!-- <span class="totalPrice">￥{{totalmoney||0}}</span> -->
        <span class="totalPrice textc1">￥{{cctotalmoney||0}}</span>
      </div>
      <div class="buyBtn" :class="{c1:onClose==1}" v-vtap="{method:showPop}" v-hover-class="'tap-hover'">{{onClose?'平仓':'开仓'}}</div>
    </div>
    <div class="h1 black1"></div>
    <order-pop v-if="popShow" :on-close="onClose" @close-pop='closePop' :res-obj='resObj' :total-money='cctotalmoney'></order-pop>
  </div>
</template>
<script>
import orderPop from './orderPop.vue'
import { mapState } from 'vuex';

export default {
  data() {
    return {
      popShow: false
    }
  },
  props: ['onClose', 'totalmoney','resObj'],
  components: { orderPop },
  computed: mapState(['sid','cctotalmoney','stockamunt']),
  methods: {
    showPop() {
      if (this.sid) {
        if(this.stockamunt!=0){
          if(this.onClose){
            if(this.stockamunt>89){
              this.$toast('合并平仓数量不能大于90，请减少平仓数量！')
              return
            }
          }
          this.popShow = true
        }else{
          this.$toast('数量不能为0！')
          return
        }
      } else {
        this.$tipLogin()
      }
    },
    closePop() {
      this.popShow = false
    },
  }

}
</script>
<style lang="scss" scoped>
div.h1 {
  height: 1px;
  margin-top:.98rem;
  background-color: #ededed;
}
div.root-el {
  height:.98rem;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  div.txt {
    width:5.00rem;
    background-color: #fff;
    span.total {
      margin-left:.30rem;
      font-size: 12px;
      color: rgba(51, 51, 51, 1);
    }
    span {
      font-size: 16px;
      line-height:.98rem;
    }
    span.totalPrice {
      font-size: 20px;
      font-family: Arial-BoldMT;
      color: rgba(51, 51, 51, 1);
      line-height:.46rem;
    }
  }
  div.buyBtn {
    font-size: 16px;
    flex-grow: 1;
    text-align: center;
    background: rgba(64, 157, 229, 1);
    color: rgba(255, 255, 255, 1);
    line-height:.98rem;
  }
  .buyBtn.tap-hover {
    background: darken(rgb(64, 157, 229), 5%);
  }
  .c1.buyBtn {
    background-color: #e6ab12;
  }
}
</style>
