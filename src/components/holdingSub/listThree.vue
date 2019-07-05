<template>
<div>

  <div v-for='(item,i) in list' class="list2Item black2"  :key="i">
    <div class="line1 uni-flex">
        <div >
          <span class="nameTxt textc1">{{item.stock_name}}</span>
          <span class="codeTxt textc2">{{item.stock_code}}</span>
        </div>
        <div class="badgeView">{{item.status}}</div>
    </div>
    <div class="line2 uni-flex ">
      <div class='uni-flex leftPart'>
        <div>
          <div class="itemView">
            <span class="textc2">委托价</span>
            <span class="textc1">{{item.entrust_price}}</span>
          </div>
          <div>
            <span class="textc2">委托数</span>
            <span class="textc1">{{item.entrust_amount}}</span>
          </div>
        </div>
      </div>
      <div class="businessType" >
        <span class="textc1"> 交易类型</span>
        <span  :class="{yellow:item.entrust_bs==2}">{{item.entrust_bs==2?'平仓':'开仓'}}</span>
      </div>

    </div>
    <div class='line3 uni-flex'>
      <span>委托时间：{{createTime[i]}}</span>
      <div class='countdownBtn' v-hover-class='"hover1"' v-vtap="{method: showPop , params: i}">撤单</div>   <!-- （{{countdown}} S） -->
    </div>
  </div>
  <cedan-pop v-if='showCedanPop' @close-me='closePop'></cedan-pop>
  <cedan-jieguo-pop v-if='showResultPop'></cedan-jieguo-pop>
</div>
</template>
<script>
import cedanPop from '@/components/holdingSub/cedanPop.vue'
import cedanJieguoPop from '@/components/holdingSub/cedanJieguoPop.vue'
export default {
  props: ['list', 'tabI'],
  data() {
    return {
      countdown: 60,
      timer: null,
      countdownArr:[],//倒计时数组存定时器和倒计数字
      showCedanPop: false,
      showResultPop: false,
      createTime: [],//时间数组
      eid: ''
    }
  },
  components: { cedanPop, cedanJieguoPop },
  watch: {
    list(val) {
      if (!val) return;
       this.createTime=[]
      val.forEach((item, i) => {
        this.createTime.push(this.$formatetimestr(item.create_time))
        // this.countdownFun(i)
      });
    }
  },
  mounted() {
    this.countdownFun()
  },
  methods: {
    showPop(i) {
      this.showCedanPop = !this.showCedanPop
      this.eid = this.list[i].id
    },
    closePop(str) {
      this.showCedanPop = !this.showCedanPop
      if (str === 'yes') {//用户确认撤单
        this.revoke()
      }
    },
    revoke() {
      var options = {
        url: '/Sapi/Stock/revoke', 
        data: {
          eid: this.eid
        },
        method: 'GET',
        header: { 'Content-Type': 'application/json' }
      }
      this.$httpReq(options).then((res) => {
        if (res.status) { 
          this.showResult() 
          this.$emit('re-get')
        } else {
          this.$toast(res.info)
        }
      })
    },
    showResult() {
      this.showResultPop = true
      setTimeout(() => {
        this.showResultPop = false
      }, 900)
    },
    countdownFun() {
      this.timer = setInterval(() => {
        if (this.countdown == 1) {
          clearInterval(this.timer)
          this.countdown = 60
          this.timer = null
          return
        }
        this.countdown--;
      }, 1000)
    },
  },
}
</script>

<style lang="scss" scoped>
div#app.at-night .line1{
  border-color:#0f131f
}
div.list2Item {
  > div {
    padding: 0 .25rem;
  }
  div.line1 {
    border-bottom: 1px solid #f5f5f5;
    justify-content: space-between;
    height:.64rem;
    div.badgeView {
      width:1.00rem;
      height:.36rem;
      border-radius:.18rem;
      font-size: 12px;
      color: $primary1;
      border: solid 1px $primary1;
      line-height:.31rem;
      text-align: center;
      align-self: center;
    }
    span.nameTxt {
      font-size: 15px;
      line-height:.64rem;
      margin-right:.14rem;
      color: rgba(51, 51, 51, 1);
    }
    span.codeTxt {
      font-size: 13px;
      color: rgba(102, 102, 102, 1);
    }
  }
  .line2 {
    .businessType {
      font-size: 14px;
      color: rgba(112, 118, 128, 1);
      align-self: center;
      span:last-child {
        margin-left:.39rem;
        color: $primary1;
      }
      span.yellow:last-child {
        color: #e6aa12 !important;
      }
    }
    div.itemView {
      display: flex;
    }
    .leftPart > div {
      color: #707680;
      span:last-child {
        color: #181c28;
        margin-left: 0.5em;
      }
      span {
        font-size: 14px;
      }
    }
    justify-content: space-between;
    padding:.20rem .25rem;
  }
  .line3 {
    font-size: 12px;
    color: rgba(168, 168, 168, 1);
    padding-bottom:.20rem;
    justify-content: space-between;
    align-items: center;
    div.countdownBtn {
      background: $primary1;
      border-radius:.04rem;
      font-size: 12px;
      line-height:.48rem;
      height:.48rem;
      width:2.00rem;
      text-align: center;
      color: rgba(255, 255, 255, 1);
    }
    div.countdownBtn.hover1 {
      background-color: darken($primary1, 10%);
    }
  }
  background-color: #fff;
  margin-bottom:.11rem;
}
</style>
