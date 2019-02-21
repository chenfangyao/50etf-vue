<template>
  <div v-if="codeList">
    <div class="uni-flex root-el textc1" :class="{specialBg:item.gou.exercise_price==gtPrice||item.gou.exercise_price==ltPrice}" v-for="(item,i) in inTemArr" v-hover-class="'self-hover'" :key="i">
      <div @click="go(item.gou)" class="wrap1" :class="{down_c:item.gou.isDown,up_c:item.gou.isUp}">
        <span
          :class="{txtred:item.gou.incr_percent>0,txtgreen:item.gou.incr_percent<0}"
        >{{item.gou.incr_percent}}</span>
        <span
          :class="{txtred:item.gou.incr_percent>0,txtgreen:item.gou.incr_percent<0}"
        >{{item.gou.last_price}}</span>
      </div>
      <div class="uni-flex">
        <!-- <span class="gou">{{item.buy_amount1}}</span> -->
        <span
          class="midTxt textc1"
          :class="{bg1:item.gou.exercise_price==gtPrice,bg2:item.gou.exercise_price==ltPrice}"
        >{{item.gou.exercise_price}}</span>
        <!-- <span class="gou">{{item.sale_amount1}}</span> -->
      </div>
      <div @click="go(item.gu)" class="wrap1" :class="{down_c:item.gu.isDown,up_c:item.gu.isUp}">
        <span
          :class="{txtred:item.gu.incr_percent>0,txtgreen:item.gu.incr_percent<0}"
        >{{item.gu.last_price}}</span>
        <span
          :class="{txtred:item.gu.incr_percent>0,txtgreen:item.gu.incr_percent<0}"
        >{{item.gu.incr_percent}}</span>
      </div>
    </div>
  </div>
  <h2 v-else class="textc1">空空如野~您还未登录吧</h2>
</template>
<script>

export default {
  data() {
    return {
      res2arr: [],//暂存分好购沽的数据,
      inTemArr: [],
      ltPrice: 10000,
      gtPrice: 0,//先置为大值
      calcOnce: 1,
    }
  },
  props: ['quoteList', 'codeList', 'latestPrice'],
  methods: {
    go(obj) {
      this.$navigateTo({
        url: '/qi_quan_xiang_qing',
        query: { code: obj.stock_code }

      });
    },
    calcBg(val, old) {
      if (old == 2 || !this.codeList) return;
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
      this.gtPrice !== 0&&this.ltPrice!==10000 && (this.calcOnce = 2)
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
    },


  },
  watch: {
    quoteList(newval, oldval) {

     this.calcBg(this.latestPrice, this.calcOnce)
      if (newval.length == 0) {
        return this.inTemArr = []
      }
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
h2 {
  text-align: center;
  color: #aaa;
}
div.specialBg{
  background: #f5f5ff
}

div.root-el {
  justify-content: space-between;
  height: 0.7rem;
  line-height: 0.7rem;
  border-bottom: 1px solid #f5f5f5;
    color: #454545;
  span {
    font-size: 14px;
    // color: rgba(31, 31, 38, 1);
    width: 51px;
  }
  span.txtred {
    color: #ec605e;
  }
  span.txtgreen {
    color: #3aba8f;
  }
  
  span.midTxt {
    background-color: #eaeeed;
    display: inline-block;
    height: 100%;
    line-height: 0.7rem;
    font-weight: bold;
    padding: 0 0.23rem;
    font-size: 14px;
    width: 1.54rem;
    color: #333;
    text-align: center;
  }
  span.midTxt.bg1 {
    background-color: #e6aa12;
  }
  span.midTxt.bg2 {
    background-color: #409de5;
  }
  div.wrap1 {
    flex-grow: 1;
    justify-content: space-between;
    display: flex;
    span {
      flex-grow: 1;
      line-height: 0.7rem;
    }
  }
  div.wrap1:first-child {
    padding-left: 0.25rem;
  }
  div.wrap1:last-child {
    padding-right: 0.25rem;
    span {
      text-align: right;
    }
  }
  .gou {
    width: 0.36rem;
    text-align: center;
    color: #999;
    line-height: 0.18rem;
    padding: 0.04rem.06rem;
    // display: inline-block;
    align-self: center;
    font-size: 0.28rem;
    border-radius: 0.11rem;
    text-align: center;
  }
  div.down_c {
    background: linear-gradient(
      90deg,
      rgba(58, 186, 148, 1),
      rgba(167, 229, 208, 1)
    );

    span {
      color: #fff;
    }
  }
  div.up_c {
    background: linear-gradient(
      90deg,
      rgba(240, 95, 92, 1),
      rgba(245, 186, 184, 1)
    );

    // box-shadow: 0 0 4px rgba(58, 186, 143, 0.9);
    span {
      color: #fff;
    }
  }
  div.down_c:first-child {
    background: linear-gradient(
      -90deg,
      rgba(58, 186, 148, 1),
      rgba(167, 229, 208, 1)
    );

    span {
      color: #fff;
    }
  }
  div.up_c:first-child {
    background: linear-gradient(
      -90deg,
      rgba(240, 95, 92, 1),
      rgba(245, 186, 184, 1)
    );

    // box-shadow: 0 0 4px rgba(58, 186, 143, 0.9);
    span {
      color: #fff;
    }
  }
}
div.at-night{
 span.midTxt{
    background-color: #2E3245;
  }
  div.specialBg{
    background-color: #2E3245 !important;
  }
}
</style>
