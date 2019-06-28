<template>
  <van-popup v-model="showPickSelf" class='black1' position="right" :style="{ height: '100%' ,width:'300px'}">
    <h3>选择日期</h3>
    <div class="uni-title self textc1">
      <span :class="{active:inLeft}" v-vtap="{method: changeActive , params: true}">{{year}}-{{month}}-{{day}}</span><i>~</i>
      <span :class="{active:!inLeft}" v-vtap="{method: changeActive , params: false}">{{year2}}-{{month2}}-{{day2}}</span>
    </div>
    <div class="tips" :class="{showTips}">开始时间不能大于结束时间</div>
    <van-picker :visible-item-count="8" class='black2' :columns="timeDatas" @change="bindChange" type="date" />
    <div class="uni-flex btn2">
      <div v-vtap="{method:hidMe}">取消</div>
      <div v-vtap="{method:handleConfirm}">确定</div>
    </div>
  </van-popup>
</template>

<script>
import { Picker, Popup } from 'vant';
export default {
  data() {
    const date = new Date()
    const years = []
    const year = date.getFullYear()
    const year2 = year
    const months = []
    var month = date.getMonth() + 1//todo
    const month2 = month < 10 ? '0' + month : month
    month = month2
    const days = []
    var day = date.getDate()//
    const day2 = day < 10 ? '0' + day : day
    day = day2
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
      timeDatas: [{ values: years, defaultIndex: 100 }, { values: months }, { values: days },]
    }
  },
  created() {
    setTimeout(() => {
      this.visible = true
    }, 0)
  },
  methods: {
    bindChange(_picker, valueArr, i) {
      if (this.inLeft) {
        this.year = valueArr[0]
        this.month = valueArr[1]
        this.day = valueArr[2]
      } else {
        this.year2 = valueArr[0]
        this.month2 = valueArr[1]
        this.day2 = valueArr[2]
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
      var times = this.sbFormat ? { starttime: this.year + '' + this.month + this.day, endtime: this.year2 + '' + this.month2 + this.day2 } : { starttime: this.year + '-' + this.month + '-' + this.day, endtime: this.year2 + '-' + this.month2 + '-' + this.day2 }
      this.$emit('select-complete', times)
    },

  },
  props: ['showPick', 'sbFormat'],
  components: {
    [Picker.name]: Picker,
    [Popup.name]: Popup,
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
  opacity: 0;
  transition: opacity 1s;
  &.showTips {
    opacity: 1;
  }
}
div.btn2 {
  justify-content: space-between;
  margin:  20px ;
  div {
    width: 2.3rem;
    height: 0.72rem;
    text-align: center;
    line-height: 0.72rem;
    color: #fff;
    background-color: $primary1;
  }
  div:first-child {
    color: $primary1;
    background-color: #fff;
    border: solid 1px $primary1;
    border-radius: 2px;
  }
}
.item {
  line-height: 1rem;
  text-align: center;
}
div.self {
  text-align: center;
  z-index: 10;
  position: relative;
  height: 0.72rem;
  line-height: 0.72rem;
  margin: 10px 30px;
  background-color: #ededed;

  span.active {
    color: $primary1;
  }
  i {
    font-size: 20px;
    margin: 0 15px;
  }
  span {
    font-size: 15px;
  }
}
.van-picker {
  margin-top: 20px;
  /deep/ .van-picker-column__item--selected {
    color: $primary1;
  }
}
h3 {
  font-weight: 500;
  margin-left: 30px;
  color: #666;
}
</style>
