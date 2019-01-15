<template>
<view>

  <view v-for='(item,i) in list' class="list2Item "  :key="i">
    <view class="line1 uni-flex">
        <view >
          <text class="nameTxt">{{item.stock_name}}</text>
          <text class="codeTxt">{{item.stock_code}}</text>
        </view>
        <view class="badgeView">{{item.status}}</view>
    </view>
    <view class="line2 uni-flex ">
      <view class='uni-flex leftPart'>
        <view>
          <view class="itemView">
            <text>委托价</text>
            <text>{{item.entrust_price}}</text>
          </view>
          <view>
            <text>委托数</text>
            <text>{{item.entrust_amount}}</text>
          </view>
        </view>
      </view>
      <view class="businessType" >
        <text> 交易类型</text>
        <text  :class="{yellow:moneyColor[i]}">{{item.entrust_bs==2?'平仓':'开仓'}}</text>
      </view>

    </view>
    <view class='line3 uni-flex'>
      <text>委托时间：{{createTime[i]}}</text>
      <view class='countdownBtn' hover-class='hover1' @tap='showPop(i)'>撤单（{{countdown}} S）</view>
    </view>
  </view>
  <!-- 以下是假数据 -->
  <view v-for='(item,i) in listMock' class="list2Item "  :key="i">
    <view class="line1 uni-flex">
        <view >
          <text class="nameTxt">购6月2450</text>
          <text class="codeTxt">10001409</text>
        </view>
        <view class="badgeView">未成交</view>
    </view>
    <view class="line2 uni-flex ">
      <view class='uni-flex leftPart'>
        <view>
          <view class="itemView">
            <text>委托价</text>
            <text>5543</text>
          </view>
          <view>
            <text>委托数</text>
            <text>33</text>
          </view>
        </view>
      </view>
      <view class="businessType" >
        <text> 交易类型</text>
        <text  :class="{yellow:i%2}">平仓</text>
      </view>

    </view>
    <view class='line3 uni-flex'>
      <text>委托时间：2018-10-02 10:09:10</text>
      <view class='countdownBtn' hover-class='hover1' @tap='showPop'>撤单（{{countdown}} S）</view>
    </view>
  </view>
  <cedan-pop v-if='showCedanPop' @close-me='closePop'></cedan-pop>
  <cedan-jieguo-pop v-if='showResultPop'></cedan-jieguo-pop>
</view>
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
      showCedanPop: false,
      showResultPop: false,
      moneyColor: [],
      createTime: [],//时间数组
      listMock: [],//临时数组
      eid: ''
    }
  },
  components: { cedanPop, cedanJieguoPop },
  watch: {
    list(val) {
      if (!val) return;
      val.forEach((item, i) => {
        this.createTime.push(this.$formatetimestr(item.create_time))
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
        var options = {
          url: '/Sapi/Stock/revoke', //请求接口
          data: {
            eid: this.eid
          },
          method: 'GET',
          header: { 'Content-Type': 'application/json' }
        }
        this.$httpReq(options).then((res) => {
          if (res.status) { this.showResult() } else {
            uni.showToast({
              title: res.info,
              duration: 2000,
              icon: 'none'
            });
          }
          console.log(res);
        })

      }
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
view.list2Item {
  > view {
    padding: 0 25upx;
  }
  view.line1 {
    border-bottom: 1px solid #f5f5f5;
    justify-content: space-between;
    height: 64upx;
    view.badgeView {
      width: 100upx;
      height: 36upx;
      border-radius: 18upx;
      font-size: 12px;
      color: #409de5;
      border: solid 1px #409de5;
      line-height: 31upx;
      text-align: center;
      align-self: center;
    }
    text.nameTxt {
      font-size: 15px;
      line-height: 64upx;
      margin-right: 14upx;
      color: rgba(51, 51, 51, 1);
    }
    text.codeTxt {
      font-size: 13px;
      color: rgba(102, 102, 102, 1);
    }
  }
  .line2 {
    .businessType {
      font-size: 14px;
      color: rgba(112, 118, 128, 1);
      align-self: center;
      text:last-child {
        margin-left: 39upx;
        color: #409de5;
      }
      text.yellow:last-child {
        color: #e6aa12;
      }
    }
    view.itemView {
      display: flex;
    }
    .leftPart > view {
      color: #707680;
      text:last-child {
        color: #181c28;
        margin-left: 0.5em;
      }
      text {
        font-size: 14px;
      }
    }
    justify-content: space-between;
    padding: 20upx 25upx;
  }
  .line3 {
    font-size: 12px;
    color: rgba(168, 168, 168, 1);
    padding-bottom: 20upx;
    justify-content: space-between;
    align-items: center;
    view.countdownBtn {
      background: rgba(64, 157, 229, 1);
      border-radius: 4upx;
      font-size: 12px;
      line-height: 48upx;
      height: 48upx;
      width: 200upx;
      text-align: center;
      color: rgba(255, 255, 255, 1);
    }
    view.countdownBtn.hover1 {
      background-color: darken(rgb(64, 157, 229), 10%);
    }
  }
  background-color: #fff;
  margin-bottom: 11upx;
}
</style>
