<template>
  <div class="wrap">
    <base-header title="成交结果" class='lowZindex' has-back="1" ></base-header>
    <div class="heightUp">
      <div class="fix black2" :style="{top:45+statusbarHeight+'px'}">
        <filter-list :total="total" @select-complete="getChooseTime"></filter-list>
      </div>
    </div>
    <scroll-view class="list2" ref='scroll1' @scrollToEnd="loadMore">
      <div class='padding1'>
        <div v-for="(item,i) in list" :key="i" class="listItem uni-flex black2">
          <div class="leftPart">
            <div class="title">
              <span class="textc1">{{item.stock_name}}</span>
              <span>{{item.stock_code}}</span>
            </div>
            <div class="uni-flex tip4">
              <div class="uni-flex">
                <div class="uni-flex uni-column textc2">
                  <span>委托：</span>
                  <span>成交：</span>
                </div>
                <div class="uni-flex uni-column">
                  <span>{{item.entrust_amount}}张</span>
                  <span>{{business_amount[i]}}张</span>
                </div>
              </div>
              <div class="uni-flex">
                <div class="uni-flex uni-column textc2">
                  <span>方向：</span>
                  <span>方式：</span>
                </div>
                <div class="uni-flex uni-column">
                  <span>{{item.entrust_bs==2?'卖出':'买入'}}</span>
                  <span>{{item.entrust_type==2?'市价':'现价'}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="rightPart">
            <div class="time">{{businessTime[i]}}</div>
            <div class="price textc1">{{item.business_price}}</div>
            <div class="txt">均价</div>
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
      businessTime: [],//过滤用
      business_amount: [],//过滤用
      sdate: 20080101,
      edate: 20300101,

    };
  },
  computed: mapState(['statusbarHeight']),

  components: { filterList, uniLoadMore, scrollView },
  methods: {
    loadMore() {
      if (this.resquestState < 2) {
        this.startI++
        this.getDatas('add')
      }
    },
    getChooseTime(obj) {
      this.sdate = obj.starttime
      this.edate = obj.endtime
      this.startI = 0
      this.getDatas()
    },
    filterVal(val) {
      if (!val) return;
      val.forEach((item, i) => {
        this.businessTime.push(this.$formatetimestr(item.business_time))
        this.business_amount.push(parseInt(item.business_amount))
      });
    },
    getDatas(add) {
      this.resquestState = 1
      var options = {
        url: '/Sapi/Squery/list_buss', 
        data: {
          page_index: this.startI,
          page_size: 10,
          sdate: this.sdate,
          edate: this.edate,
          history: 1
        },
        method: 'GET'
      }
      this.$httpReq(options).then((res) => {
        this.total = res.data.total
        this.businessTime = []
        this.business_amount = []
        if (add) {
          this.list = this.list.concat(res.data.list)
          this.$refs.scroll1.refresh()

        } else {
          this.list = res.data.list
        }
        this.filterVal(this.list)
        this.resquestState = res.data.list.length == 10 ? 0 : 2
      }).catch((err) => {
        console.error(err, '捕捉')
      })
    }
  },
  created() { this.getDatas() }
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
    height: calc(100vh - 1.76rem);
    overflow: hidden;
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
    justify-content: space-between;
    padding: 0.25rem 0.26rem;
    div.leftPart {
      flex-grow: 1;
      div.tip4 {
        > div {
          flex-grow: 1;
          line-height: 0.58rem;
          font-size: 12px;
          div:first-child {
            color: #666;
          }
          div:last-child {
            color: #333;
          }
        }
        > div:last-child {
          justify-content: flex-end;
        }
      }
      div.title {
        margin-bottom: 0.3rem;
        span:first-child {
          font-size: 15px;
          color: #333;
          font-weight: bold;
          line-height: 15px;
          margin-right: 0.11rem;
        }
        line-height: 15px;
        font-size: 12px;
        color: #999;
      }
    }
    div.rightPart {
      text-align: right;
      flex-grow: 1;
      .time {
        font-size: 12px;
        color: rgba(153, 153, 153, 1);
        line-height: 12px;
      }
      .price {
        font-size: 16px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 16px;
        margin: 0.39rem 0 0.12rem;
      }
      .txt {
        font-size: 12px;
        color: #666;
        line-height: 12px;
      }
    }
  }
}
</style>
