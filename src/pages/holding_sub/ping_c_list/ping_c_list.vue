<template>
	<div class="wrap">
		<base-header title="平仓结算" v-if='showHeader' has-back='1'></base-header>
    <div class="heightUp">
      <div class="fix">
        <filter-list :total='total' @begin-choose='beginChoose' @end-choose='endChoose' @select-complete='getChooseTime'></filter-list>
      </div>
    </div>
    <scroll-view class="list2" lower-threshold='10' scroll-y @scrolltolower="loadMore">
      <div v-for="(item,i) in list" hover-class='self-hover' @click='go(item)' :key="i" class='listItem uni-flex'>
        <div class="content">
          <div class="line1 uni-flex">
            <div>
              <span class="nameTxt">{{item.stock_name}}</span>
              <span class='codeTxt'>{{item.stock_code}}</span>
            </div>
            <div class="price">{{item.all_income}}</div>
          </div>
          <div class="line2 uni-flex">
            <div>
              <span>
                <span>持仓数：</span>
                <span class="digital">{{item.sum_buy_amount}}</span>
              </span>
              <span>
                <span>平仓数：</span>
                <span class="digital">{{sell_amount[i]}}</span>
              </span>
            </div>
            <div class="time">{{close_time[i]}}</div>
          </div>
        </div>
        <div class="imgContainer"><img src="/assets/arrow/r.png"></div>
      </div>
      <uni-load-more :loading-type="resquestState" ></uni-load-more>

    </scroll-view>
	</div>
</template>

<script>
import filterList from '@/components/holdingSub/filterList.vue';
import uniLoadMore from '@/components/uni-load-more.vue';

export default {
  data() {
    return {
      showHeader: true,
      list: [],
      startI: 0,
      total: '',
      resquestState: 0,
      close_time: [],//过滤数值
      sell_amount: [],
      sdate: 20080101,
      edate: 20300101,
    };
  },
  components: { filterList, uniLoadMore },
  created() {
    this.getDatas()
  },
  methods: {
    getChooseTime(obj) {
      this.sdate = obj.starttime
      this.edate = obj.endtime
      this.startI = 0
      this.getDatas()
    },
    loadMore() {
      console.log('到底了');
      if (this.resquestState < 2) {
        this.startI++
        this.getDatas('add')
      }
    },
    beginChoose() {
      this.showHeader = false
    },
    endChoose() {
      this.showHeader = true
    },
    go(item) {
      this.$store.commit('setpingCItem', item)
      this.$navigateTo({ url: '/pages/holding_sub/ping_c_item/ping_c_item' })
    },
    getDatas(add) {
      this.resquestState = 1
      var options = {
        url: '/Sapi/Squery/list_balsell', //请求接口
        data: {
          page_index: this.startI,
          page_size: 10,
          sdate: this.sdate,
          edate: this.edate,
        },
        method: 'GET'
      }
      this.$httpReq(options).then((res) => {
        this.total = res.data.total
        this.close_time = []
        this.sell_amount = []
        if (add) {
          this.list = this.list.concat(res.data.list)
        } else {
          this.list = res.data.list
        }
        this.resquestState = res.data.list.length == 10 ? 0 : 2
      }).catch((err) => {
        console.error(err,'捕捉')
      })
    }
  },
  watch: {
    list(val) {
      if (!val) return;
      val.forEach((item, i) => {
        this.close_time.push(this.$formatetimestr(item.close_time))
        this.sell_amount.push(parseInt(item.sell_amount))
      });
    }
  },
}
</script>

<style lang="scss" scoped>
div.wrap {
  min-height: 100vh;
  .list2 {
    /* #ifndef H5 */
    height: calc(100vh -1.76rem - var(--status-bar-height));
    /* #endif */
    /* #ifdef H5 */
    height: calc(100vh -1.76rem);
    /* #endif */
  }
  div.heightUp {
    height:.88rem;
    div.fix {
      position: fixed;
      background-color: #fff;
      left: 0;
      right: 0;
      top: 45px;
      /* #ifndef H5 */
      top: calc(45px + var(--status-bar-height));
      /* #endif */
      z-index: 20;
    }
  }
  background-color: #f5f5f5;
  div.listItem {
    background-color: #fff;
    margin:.13rem 0;
    padding:.25rem.26rem;
    justify-content: space-between;
    div.imgContainer {
      align-self: center;
      flex-grow: 1;
      text-align: right;
      img {
        width:.20rem;
        height:.28rem;
      }
    }
    div.content {
      flex-grow: 1;
      div.line1 {
        margin-bottom:.38rem;
        justify-content: space-between;
        align-items: center;
        span.nameTxt {
          margin-right:.16rem;
          font-size: 14px;
          color: rgba(24, 28, 40, 1);
        }
        span.codeTxt {
          font-size: 13px;
          font-family: ArialMT;
          color: rgba(102, 102, 102, 1);
        }
        div.price {
          font-size: 24px;
          font-family: Arial-BoldMT;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
        }
      }
      div.line2 {
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        color: #999;
        div.time {
          font-size: 11px;
        }
        span.digital {
          color: #333;
          margin-right:.39rem;
        }
      }
    }
  }
}
</style>
