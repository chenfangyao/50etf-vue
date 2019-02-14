<template>
  <van-actionsheet v-model="showPickSelf" class='black1' :close-on-click-overlay='true'>
    <div class="uni-title self textc1">
      <span :class="{active:inLeft}" @click="changeActive(true)">{{year}}-{{month}}-{{day}}</span> 至
      <span :class="{active:!inLeft}" @click="changeActive(false)">{{year2}}-{{month2}}-{{day2}}</span>
      <span class='okTap' @click='handleConfirm'>确认</span>
    </div>
    <div v-show="showTips" class="tips">开始时间不能大于结束时间</div>
    <van-picker class='black2' :columns="timeDatas" @change="bindChange"   type="date"/>
  </van-actionsheet>
</template>

<script>
import { Picker, Actionsheet } from 'vant';
export default {
  data() {
    const date = new Date()
    const years = []
    const year = date.getFullYear()
    const year2 = year
    const months = []
    var month = date.getMonth() + 1//todo
    const month2 = month < 10 ? '0' + month : month
    month=month2
    const days = []
    var day = date.getDate()//
    const day2 = day < 10 ? '0' + day : day
    day=day2
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
      currentDate: new Date(),
      showTips: false,
      value: [9999, month - 1, day - 1],
      inLeft: true,
      visible: false,
      showPickSelf: this.showPick,
      timeDatas:[{values:years,defaultIndex:100},{values:months},{values:days},]
    }
  },
  created() {
    setTimeout(() => {
      this.visible = true
    }, 0)
  },
  methods: {
    bindChange (_picker,valueArr,i) {
      if (this.inLeft) {
        this.year = valueArr[0]
        this.month = valueArr[1]
        this.day =valueArr[2]
      } else {
        this.year2 = valueArr[0]
        this.month2 = valueArr[1]
        this.day2 =valueArr[2]
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
      if ((this.year == this.year2) && (this.month > this.month2)) return true;
      if ((this.year == this.year2) && (this.month == this.month2) && (this.day > this.day2)) return true;
      return false
    },
    handleConfirm() {
      if (this.verify()) {
        this.showTips = true
        return
      }
      this.showTips = false
      var times = this.sbFormat?{ starttime: this.year + '' + this.month + this.day, endtime: this.year2 + '' + this.month2 + this.day2 }:{ starttime: this.year + '-' + this.month + '-' + this.day, endtime: this.year2 + '-' + this.month2 + '-' + this.day2 }
      this.$emit('select-complete', times)
    },

  },
  props: ['showPick','sbFormat'],
  components: {
    [Picker.name]: Picker,
    [Actionsheet.name]: Actionsheet,
  },
  watch: {
    showPick(val) { this.showPickSelf = val },
    showPickSelf(val) { !val && this.hidMe() }
  }
}
</script>


<style lang='scss' scoped>

div.tips {
    color: #f05f5c;
    text-align: center;
  }
.item {
  line-height: 1rem;
  text-align: center;
}
div.self {
  text-align: center;
  z-index: 10;
  position: relative;
  margin: 10px 0;
  span.okTap{
    position: absolute;
    right: 0;
  }
  span {
    padding-bottom: 3px;
    border-bottom: 1px solid #eee;
    margin: 0 0.35rem;
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
