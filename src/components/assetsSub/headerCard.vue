<template>
  <div class="subWrap black2">
    <s-icon icon-class="zichan_bg"></s-icon>
    <article>
      <div class="panel1 ">
        <h2>可用资金（元）</h2>
        <h1>{{transmoney.enable_money||0.00}}</h1>
        <div class="h3">
          <!-- <span>总资产</span>
        <span>{{transmoney.dta_money}}</span><span v-if='!transmoney.enable_money'>0.00</span> -->
        </div>
      </div>
      <div class="panel2  uni-flex">
        <div>
          <h4>可买市值</h4>
          <h4>{{transmoney.stock_enable_money||0.00}}</h4>
        </div>
        <div>
          <h4>总资产</h4>
          <h4>{{transmoney.dta_money}}</h4>
          <h4 v-if='!transmoney.enable_money'>0.00</h4>
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
    </article>
    <div class="uni-flex btn2 black2">
      <div class=" " v-vtap="{method: go , params: 1}">
        <s-icon icon-class="zichan_chonzhi"></s-icon>
        <span>充值</span>
      </div>
      <div v-vtap="{method: go , params: 2}">
        <s-icon icon-class="zichan_tixian"></s-icon>

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
  computed: mapState(['sid', 'atNight']),
  props: ['transmoney'],
  methods: {
    go(i) {
      if (!this.sid) {
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
  padding: 0 0.22rem;
  margin-bottom: 5px;
  position: relative;
  background-color: #fff;
  article {
    position: absolute;
    top: 33px;
    left: 0;
    right: 0;
    > div {
      background-color: transparent;
    }
  }
  .s-icon {
    width: 100%;
    height: 3.6rem;
  }
  .panel1 {
    border-radius: 0.2rem.20rem 0px 0px;
    text-align: center;
    color: #fff;
    h2 {
      font-size: 14px;
      margin: 0;
    }
    h1 {
      font-size: 28px;

      line-height: 28px;
      font-weight: bold;
      margin: 0.1rem 0;
    }
    div.h3 {
      font-size: 14px;
      height: 5px;
    }
  }
  .panel2 {
    color: #fff;
    padding: 0.2rem 0;
    justify-content: space-around;
    h4 {
      font-size: 17px;
      font-weight: bold;
      margin: 0;
    }
    h4:first-child {
      font-size: 12px;
      font-weight: normal;
    }
  }
  div.btn2 {
    background-color: #fff;
    height: 0.93rem;
    border-radius: 0 0 0.2rem 0.2rem;
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
    .s-icon {
      width: 0.44rem;
      height: 0.44rem;
      vertical-align: middle;
      margin-right: 0.23rem;
    }
  }
}
</style>
