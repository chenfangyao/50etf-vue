<template>
  <div class="wrap">
    <base-header title="平仓结算" class='lowZindex' has-back='1'></base-header>
    <div class="heightUp ">
      <div class="fix black2" :style="{top:45+statusbarHeight+'px'}">
        <filter-list :total='total' @select-complete='getChooseTime'></filter-list>
      </div>
    </div>
    <scroll-view class="list2" ref='scroll1' @scrollToEnd="loadMore">
      <div>
        <div v-for="(item,i) in list" v-hover-class='"self-hover"' v-vtap="{method: go , params: item}" :key="i" class='listItem uni-flex black2'>
          <div class="content">
            <div class="line1 uni-flex">
              <div>
                <span class="nameTxt textc1">{{item.stock_name}}</span>
                <span class='codeTxt textc2'>{{item.stock_code}}</span>
              </div>
              <div class="price textc1" :class="{green1:parseInt(item.all_income)<0}">{{item.all_income}}</div>
            </div>
            <div class="line2 uni-flex">
              <div>
                <span>
                  <span class="textc2">持仓数：</span>
                  <span class="digital textc1">{{item.sum_buy_amount}}</span>
                </span>
                <span>
                  <span class="textc2">平仓数：</span>
                  <span class="digital textc1">{{sell_amount[i]}}</span>
                </span>
              </div>
              <div class="time textc2">{{close_time[i]}}</div>
            </div>
          </div>
          <div class="imgContainer">
            <s-icon :icon-class="'enterright' | atNightIcon"></s-icon>
          </div>

        </div>
        <uni-load-more :loading-type="resquestState"></uni-load-more>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import filterList from '@/components/holdingSub/filterList.vue';
import uniLoadMore from '@/components/uni-load-more.vue';
import scrollView from '@/components/other/scroll-view'
import { mapState } from 'vuex';

export default {
  data() {
    return {
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
  computed: mapState(['statusbarHeight']),
  components: { filterList, uniLoadMore, scrollView },
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
      if (this.resquestState < 2) {
        this.startI++
        this.getDatas('add')
      }
    },
    go(item) {
      this.$store.commit('setpingCItem', item)
      this.$navigateTo({ url: '/ping_c_item' })
    },
    getDatas(add) {
      this.resquestState = 1
      var options = {
        url: '/Sapi/Squery/list_balsell', 
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
          this.$refs.scroll1.refresh()

        } else {
          this.list = res.data.list
        }
        this.resquestState = res.data.list.length == 10 ? 0 : 2
      }).catch((err) => {
        console.error(err, '捕捉')
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
  width: 100%;
  .list2 {
    /* #ifndef H5 */
    // height: calc(100vh -1.76rem - var(--status-bar-height));
    /* #endif */
    /* #ifdef H5 */
    overflow: hidden;
    height: calc(100vh - 1.76rem);
    /* #endif */
  }
  div.heightUp {
    height: 0.88rem;
    div.fix {
      position: fixed;
      left: 0;
      right: 0;
      /* #ifndef H5 */
      // top: calc(45px + var(--status-bar-height));
      /* #endif */
      z-index: 20;
    }
  }
  background-color: #f5f5f5;
  div.listItem {
    background-color: #fff;
    margin: 0.13rem 0;
    padding: 0.2rem 0.26rem;
    color: #666;
    justify-content: space-between;
    div.imgContainer {
      align-self: center;
      flex-grow: 1;
      text-align: right;
      img {
        width: 0.2rem;
        height: 0.28rem;
      }
    }
    div.content {
      flex-grow: 1;
      div.line1 {
        // margin-bottom:.38rem;
        justify-content: space-between;
        align-items: center;
        line-height: 14px;
        span.nameTxt {
          margin-right: 0.16rem;
          font-size: 14px;
          color: #333;
          font-weight: bold;
        }
        span.codeTxt {
          font-size: 12px;
          
          color: #999;
        }
        div.price {
          font-size: 16px;
          font-weight: bold;
          color: $primary1;
          &.green1{
            color: $green1;
          }
        }
      }
      div.line2 {
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        div.time {
          font-size: 11px;
        }
        span.digital {
          color: #000;
          margin-right: 0.39rem;
        }
      }
    }
  }
}
</style>
