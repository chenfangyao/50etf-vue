<template>
    <view class="wrap">
      <base-header :hasBack='true' title="选择时间" @right-tap='handleConfirm' rightTxt='确定'></base-header>
			<view class="uni-title self">
        <text :class="{active:inLeft}" @tap="changeActive(true)">{{year}}-{{month}}-{{day}}</text> 至
        <text :class="{active:!inLeft}" @tap="changeActive(false)">{{year2}}-{{month2}}-{{day2}}</text>
			</view>
      <view v-show='showTips' class="tips">开始时间不能大于结束时间</view>
      <picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
          <picker-view-column>
              <view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
          </picker-view-column>
          <picker-view-column>
              <view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
          </picker-view-column>
          <picker-view-column>
              <view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
          </picker-view-column>
      </picker-view>
    </view>
</template>

<script>
export default {
  data() {
    const date = new Date()
    const years = []
    const year = date.getFullYear()
    const year2 = year
    const months = []
    const month = date.getMonth() + 1
    const month2 = month
    const days = []
    const day = date.getDate()
    const day2 = day

    for (let i = 2008; i <= date.getFullYear(); i++) {
      years.push(i)
    }

    for (let i = 1; i <= 12; i++) {
      months.push(i)
    }

    for (let i = 1; i <= 31; i++) {
      days.push(i)
    }
    return {
      years,
      year,
      year2,
      months,
      month,
      month2,
      days,
      day,
      day2,
      showTips: false,
      value: [9999, month - 1, day - 1],
      inLeft: true,
      visible: false,
      indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth / (750 / 100))}px;`
    }
  },
  created() {
    setTimeout(() => {
      this.visible = true
    }, 0)
  },
  methods: {
    bindChange: function (e) {
      const val = e.detail.value
      if (this.inLeft) {
        this.year = this.years[val[0]]
        this.month = this.months[val[1]]
        this.day = this.days[val[2]]
      } else {
        this.year2 = this.years[val[0]]
        this.month2 = this.months[val[1]]
        this.day2 = this.days[val[2]]
      }
    },
    changeActive(val) {
      this.inLeft = val
    },
    verify() {
      if (this.year > this.year2) return true;
      if (this.year <= this.year2 && this.month > this.month2) return true;
      if (this.year <= this.year2 && this.month <= this.month2 && this.day > this.day2) return true;
      return false
    },
    handleConfirm() {
      if (this.verify()) {
        this.showTips = true
        return
      }
			var times={starttime:this.year+'-'+this.month+'-'+this.day,endtime:this.year2+'-'+this.month2+'-'+this.day2}
      this.$emit('select-complete', times)
    },

  }
}
</script>

<style lang='scss' scoped>
view.wrap {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 2500;
  view.tips{
    color: #F05F5C;
    text-align: center;
  }
}
picker-view {
  width: 100%;
  height: 600upx;
  margin-top: 20upx;
}

.item {
  line-height: 100upx;
  text-align: center;
}
view.self {
  text-align: center;
  z-index: 10;
  position: relative;
  margin-top: 100px;
  text {
    padding-bottom: 3px;
    border-bottom: 1px solid #eee;
    margin: 0 35upx;
  }
  text.active {
    border-color: #409def;
    color: #409def;
  }
}
</style>
