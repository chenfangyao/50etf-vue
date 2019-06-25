<template>
  <div class="subWrap ">
    <div class="panel1 black2">
      <h2 class="textc2">可用资金（元）</h2>
      <h1>{{transmoney.enable_money||0.00}}</h1>
      <div class="h3">
        <!-- <span>总资产</span>
        <span>{{transmoney.dta_money}}</span><span v-if='!transmoney.enable_money'>0.00</span> -->
      </div>
    </div>
    <div class="panel2 black2 uni-flex">
      <div>
        <h4>{{transmoney.stock_enable_money||0.00}}</h4>
        <h4 class="textc2">可买市值</h4>
      </div>
			<div>
			  <h4>{{transmoney.dta_money}}</h4><h4 v-if='!transmoney.enable_money'>0.00</h4>
			  <h4 class="textc2">总资产</h4>
			</div>
      <!-- <div>
        <h4>{{transmoney.freeze_money}}</h4><h4 v-if='!transmoney.enable_money'>0.00</h4>
        <h4>冻结金</h4>
      </div>
      <div>
        <h4>{{transmoney.add_fee_money}}</h4><h4 v-if='!transmoney.enable_money'>0.00</h4>
        <h4>管理费</h4>
      </div> -->
    </div>
    <div class="uni-flex btn2 black4">
      <div class="hasBorder blue1" v-vtap="{method: go , params: 1}">
        <img v-if="atNight" src="../../assets/assetsImg/recharge1.png">
        <img v-else src="../../assets/assetsImg/recharge.png">
        <span>充值</span>
      </div>
      <div  v-vtap="{method: go , params: 2}" >
        <img v-if="atNight" src="../../assets/assetsImg/withdraw1.png">
        <img v-else src="../../assets/assetsImg/withdraw.png">
        <span>提现</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {

    }
  },
  computed: mapState(['sid','atNight']),
  props: ['transmoney'],
  methods: {
    go(i) {
      if(!this.sid){
        this.$tipLogin()
        return
      }
      // this.$dialog.confirm({
      //   title: '您还未登录',
      //   message: '是否登录？'
      // }).then(() => {
      //   // on confirm
      // }).catch(() => {
      //   // on cancel
      // });
      switch (i) {
        case 1:
          this.$navigateTo({ url: '/pages/assets_sub/recharge/recharge' })
          break
        case 2:
          this.$navigateTo({ url: '/pages/assets_sub/withdraw/withdraw' })
          break
      }
    }
  },
  created() {

  },

}
</script>
<style lang="scss" scoped>
div.subWrap {
  margin:.12rem .22rem;
  .panel1 {
    background: linear-gradient(
      0deg,
      rgba(41, 123, 205, 1),
      $primary1
    );
    border-radius:.20rem.20rem 0px 0px;
    text-align: center;
    color: #fff;
    h2 {
      font-size: 14px;
      margin: 0;
    }
    h1 {
      font-size: 28px;
      font-family: ArialMT;
      line-height: 28px;
      font-weight: bold;
      margin:.20rem 0;
    }
    div.h3 {
      font-size: 14px;
			height: 5px;
    }
  }
  .panel2 {
    background: rgba(41, 123, 205, 1);
    color: #fff;
    padding:.30rem 0;
    justify-content: space-around;
    h4 {
      font-size: 14px;
      font-weight: normal;
      margin: 0;
    }
    h4:first-child {
      font-size: 15px;
    }
  }
  div.btn2 {
    background-color: #fff;
    height: 0.93rem;
    border-radius: 0  0 .20rem .20rem;
    overflow: hidden;
    span {
      font-size: 15px;
      vertical-align: middle;
    }
    > div {
      text-align: center;
      flex-grow: 1;
      height: 100%;
      padding: 0.19rem 0;
    }
    div.hasBorder {
      border-right: solid 1px #e6e6e6;
    }
    img {
      width:.44rem;
      height:.44rem;
      vertical-align: middle;
      margin-right:.23rem;
    }
  }
}
</style>
