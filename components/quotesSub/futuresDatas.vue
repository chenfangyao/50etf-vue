<template>
  <view>
    <view class="uni-flex wrap" v-for="(item,i) in inTemArr" hover-class="self-hover" :key="i">
      <view @tap="go(item.gou)" class="wrap1 " :class="{down_c:item.gou.isDown,up_c:item.gou.isUp}">
        <text :class="{txtred:item.gou.incr_percent>0,txtgreen:item.gou.incr_percent<0}" >{{item.gou.incr_percent}}</text>
        <text :class="{txtred:item.gou.incr_percent>0,txtgreen:item.gou.incr_percent<0}">{{item.gou.last_price}}</text>
      </view>
      <view class="uni-flex">
        <!-- <text class="gou">{{item.buy_amount1}}</text> -->
        <text class="midTxt" :class="{bg1:item.gou.exercise_price==gtPrice,bg2:item.gou.exercise_price==ltPrice}">{{item.gou.exercise_price}}</text>
        <!-- <text class="gou">{{item.sale_amount1}}</text> -->
      </view>
      <view @tap="go(item.gu)" class="wrap1 "  :class="{down_c:item.gu.isDown,up_c:item.gu.isUp}">
        <text :class="{txtred:item.gu.incr_percent>0,txtgreen:item.gu.incr_percent<0}" >{{item.gu.last_price}}</text>
        <text :class="{txtred:item.gu.incr_percent>0,txtgreen:item.gu.incr_percent<0}">{{item.gu.incr_percent}}</text>
      </view>
    </view>
  </view>
</template>
<script>

export default {
  data() {
    return {
      res2arr: [],//暂存分好购沽的数据,
      inTemArr: [],
      ltPrice: 1000000,
      gtPrice: 0,//先置为大值
      calcOnce: 1,
    }
  },
  props: ['quoteList', 'codeList', 'latestPrice'],
  methods: {
    go(obj) {
      uni.navigateTo({
        url: '/pages/quotes_sub/qi_quan_xiang_qing/qi_quan_xiang_qing?code=' + obj.stock_code
      });
    },
    calcBg(val, old) {
      if (old == 2) return;
      if (this.gtPrice !== 0 && val[0].latestPrice == old[0].latestPrice) return;
      this.codeList.forEach(item => {
        var snap = item.exercise_price
        if (snap.indexOf('A') == -1) {
          if (snap < val[0].latestPrice) {
            this.gtPrice < snap && (this.gtPrice = snap)
          } else {
            this.ltPrice > snap && (this.ltPrice = snap)
          }
        }
      })
      this.gtPrice !== 0 && (this.calcOnce = 2)
    },
    dealCodeList() {//把传进来的合约代码分购、沽两组
      var arr = [...this.codeList]
      this.res2arr = []
      for (; arr.length > 0;) {
        var obj = arr.shift()
        for (var i = 0; i < arr.length; i++) {
          var resultObj = {}
          if (arr[i].stock_name.replace(/购|沽/, '') == obj.stock_name.replace(/购|沽/, '')) {
            if (arr[i].options_type == 1 && obj.options_type == 2) {
              resultObj.gou = arr[i]
              resultObj.gu = obj
            } else if (arr[i].options_type == 2 && obj.options_type == 1) {
              resultObj.gou = obj
              resultObj.gu = arr[i]
            }
            this.res2arr.push(resultObj)
            arr.splice(i, 1)
            break
          }
        }
      }
    },
    getTemDatas(arr) {//根据codelist 处理qrylist
      this.res2arr.forEach((obj, j) => {
        for (var i = 0; i < arr.length; i++) {
          if (obj.gou.stock_code == arr[i].stock_code) {
            this.res2arr[j].gou.incr_percent = arr[i].incr_percent
            this.res2arr[j].gou.last_price = arr[i].last_price
            if (this.res2arr[j].gu.incr_percent != undefined) {
              arr.splice(i, 1)
              break
            }
          }
          if (obj.gu.stock_code == arr[i].stock_code) {
            this.res2arr[j].gu.incr_percent = arr[i].incr_percent
            this.res2arr[j].gu.last_price = arr[i].last_price
            if (this.res2arr[j].gou.incr_percent != undefined) {
              arr.splice(i, 1)
              break
            }
          }
        }
      })
      this.inTemArr = this.res2arr.sort((a, b) => parseFloat(a.gou.exercise_price) - parseFloat(b.gou.exercise_price))
    },
    toFixed4(val) {
      var arr = []
      val.forEach(item => {
        let obj = { ...item }
        obj.last_price = Number(item.last_price).toFixed(4)
        obj.incr_percent = Number(item.incr_percent * 100).toFixed(2)
        arr.push(obj)
      });
      return arr
    },
    compareDiff(newval, oldval) {
      var difArrUp = []
      var difArrDown = []
      newval.forEach((obj, i) => {
        obj.last_price < oldval[i].last_price && difArrDown.push(obj)//价格不等
        obj.last_price > oldval[i].last_price && difArrUp.push(obj)//价格不等
      })
      this.calcDiff(difArrUp, 1)
      this.calcDiff(difArrDown, 0)
    },
    calcDiff(difArr, Q) {
      var arr = this.inTemArr//为了少敲几个字
      difArr.forEach(item => {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].gou.stock_code == item.stock_code) {
            arr[i].gou.last_price = item.last_price
            arr[i].gou.incr_percent = item.incr_percent
            Q == 1 ? (arr[i].gou.isUp = true) : (arr[i].gou.isDown = true)
            this.$set(this.inTemArr, i, arr[i])
            this.clearChange(i, 'gou')
            break
          }
          if (arr[i].gu.stock_code == item.stock_code) {
            arr[i].gu.last_price = item.last_price
            arr[i].gu.incr_percent = item.incr_percent
            Q == 1 ? (arr[i].gu.isUp = true) : (arr[i].gu.isDown = true)
            this.$set(this.inTemArr, i, arr[i])
            this.clearChange(i, 'gu')
            break
          }
        }
      })
    },
    clearChange(i, str) {
      setTimeout(() => {
        var obj = this.inTemArr[i]
        obj[str].isUp = false
        obj[str].isDown = false
        this.$set(this.inTemArr, i, obj)
      }, 500)
    }

  },
  watch: {
    quoteList(newval, oldval) {
      this.calcBg(this.latestPrice, this.calcOnce)
      if (newval.length != oldval.length) {
        this.dealCodeList()
        this.getTemDatas(this.toFixed4(newval))
      } else {
        this.compareDiff(this.toFixed4(newval), oldval)
      }
    },
    latestPrice(val, old) {//股票最新价
      this.calcBg(val, old)
    }
  }
}
</script>

<style lang="scss" scoped>
view.wrap {
  justify-content: space-between;
  height: 70upx;
  line-height: 70upx;
  border-bottom: 1px solid #f5f5f5;
  text {
    font-size: 14px;
    // color: rgba(31, 31, 38, 1);
    color: #454545;
    width: 51px;
  }
  text.txtred {
    color: #ec605e;
  }
  text.txtgreen {
    color: #3aba8f;
  }
  text.midTxt {
    background-color: #eaeeed;
    display: inline-block;
    height: 100%;
    line-height: 70upx;
    font-weight: bold;
    padding: 0 23upx;
    font-size: 14px;
    width: 154upx;
    color: #333;
    text-align: center;
  }
  text.midTxt.bg1 {
    background-color: #e6aa12;
  }
  text.midTxt.bg2 {
    background-color: #409de5;
  }
  view.wrap1 {
    flex-grow: 1;
    justify-content: space-between;
    display: flex;
    text {
      flex-grow: 1;
      line-height: 70upx;
    }
  }
  view.wrap1:first-child {
    padding-left: 25upx;
  }
  view.wrap1:last-child {
    padding-right: 25upx;
    text {
      text-align: right;
    }
  }
  .gou {
    width: 36upx;
    text-align: center;
    color: #999;
    line-height: 18upx;
    padding: 4upx 6upx;
    // display: inline-block;
    align-self: center;
    font-size: 28upx;
    border-radius: 11upx;
    text-align: center;
  }
  view.down_c {
    background: linear-gradient(
      90deg,
      rgba(58, 186, 148, 1),
      rgba(167, 229, 208, 1)
    );

    text {
      color: #fff;
    }
  }
  view.up_c {
    background: linear-gradient(
      90deg,
      rgba(240, 95, 92, 1),
      rgba(245, 186, 184, 1)
    );

    // box-shadow: 0 0 4px rgba(58, 186, 143, 0.9);
    text {
      color: #fff;
    }
  }
  view.down_c:first-child {
    background: linear-gradient(
      -90deg,
      rgba(58, 186, 148, 1),
      rgba(167, 229, 208, 1)
    );

    text {
      color: #fff;
    }
  }
  view.up_c:first-child {
    background: linear-gradient(
      -90deg,
      rgba(240, 95, 92, 1),
      rgba(245, 186, 184, 1)
    );

    // box-shadow: 0 0 4px rgba(58, 186, 143, 0.9);
    text {
      color: #fff;
    }
  }
}
</style>
