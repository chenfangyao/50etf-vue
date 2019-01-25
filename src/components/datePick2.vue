<template>
    <div class="wrap">
      <base-header :hasBack='true' @special-back='hidMe' special-back=1 title="选择时间" @right-tap='handleConfirm' rightTxt='确定'></base-header>
			<div class="uni-title self">
        <span :class="{active:inLeft}" @touchend="changeActive(true)">{{year}}-{{month}}-{{day}}</span> 至
        <span :class="{active:!inLeft}" @touchend="changeActive(false)">{{year2}}-{{month2}}-{{day2}}</span>
			</div>
      <div v-show='showTips' class="tips">开始时间不能大于结束时间</div>
      <picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
          <picker-view-column>
              <div class="item" v-for="(item,index) in years" :key="index">{{item}}年</div>
          </picker-view-column>
          <picker-view-column>
              <div class="item" v-for="(item,index) in months" :key="index">{{item}}月</div>
          </picker-view-column>
          <picker-view-column>
              <div class="item" v-for="(item,index) in days" :key="index">{{item}}日</div>
          </picker-view-column>
      </picker-view>
    </div>
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
    const month2 = month < 10 ? '0' + month : month
    const days = []
    const day = date.getDate()
    const day2 = day < 10 ? '0' + day : day

    for (let i = 2008; i <= date.getFullYear(); i++) {
      years.push(i)
    }

    for (let i = 1; i <= 12; i++) {
      if (i < 10) {
        i = '0' + i
      }
      months.push(i)
    }

    for (let i = 1; i <= 31; i++) {
      if (i < 10) {
        i = '0' + i
      }
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
    hidMe() {
      this.showTips = false
      this.$emit('hid-me')
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
      this.showTips = false
      var times = { starttime: this.year + '-' + this.month + '-' + this.day, endtime: this.year2 + '-' + this.month2 + '-' + this.day2 }
      // var times = { starttime: this.year + '' + this.month + this.day, endtime: this.year2 + '' + this.month2 + this.day2 }
      this.$emit('select-complete', times)
    },

  }
}
</script>

<style lang='scss' scoped>
div.wrap {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 210;
  div.tips {
    color: #f05f5c;
    text-align: center;
  }
}
picker-div {
  width: 100%;
  height:6.00rem;
  margin-top:.20rem;
}

.item {
  line-height:1.00rem;
  text-align: center;
}
div.self {
  text-align: center;
  z-index: 10;
  position: relative;
  margin-top: 100px;
  span {
    padding-bottom: 3px;
    border-bottom: 1px solid #eee;
    margin: 0.35rem;
  }
  span.active {
    border-color: #409def;
    color: #409def;
    /* font-size: 16px; */
  }
  span {
    font-size: 15px;
  }
}
</style>
