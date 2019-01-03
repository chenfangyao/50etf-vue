<template>
	<view class="wrap">
		<base-header title="平仓结算" v-if='showHeader' has-back='1'></base-header>
    <view class="heightUp">
      <view class="fix">
        <filter-list :total='total' @begin-choose='beginChoose' @end-choose='endChoose' @select-complete='getChooseTime'></filter-list>
      </view>
    </view>
    <scroll-view class="list2" lower-threshold='10' scroll-y @scrolltolower="loadMore">
      <view v-for="(item,i) in list" hover-class='self-hover' @tap='go(item)' :key="i" class='listItem uni-flex'>
        <view class="content">
          <view class="line1 uni-flex">
            <view>
              <text class="nameTxt">{{item.stock_name}}</text>
              <text class='codeTxt'>{{item.stock_code}}</text>
            </view>
            <view class="price">{{item.all_income}}</view>
          </view>
          <view class="line2 uni-flex">
            <view>
              <text>
                <text>持仓数：</text>
                <text class="digital">{{item.sum_buy_amount}}</text>
              </text>
              <text>
                <text>平仓数：</text>
                <text class="digital">{{sell_amount[i]}}</text>
              </text>
            </view>
            <view class="time">{{close_time[i]}}</view>
          </view>
        </view>
        <view class="imgContainer"><image src='/static/arrow/r.png'></image></view>
      </view>
      <uni-load-more :loading-type="resquestState" ></uni-load-more>

    </scroll-view>
	</view>
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
      // console.log(this.$store.state.pingCItem);
      uni.navigateTo({ url: '../ping_c_item/ping_c_item' })
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
        console.log(res);
        if (add) {
          this.list = this.list.concat(res.data.list)
        } else {
          this.list = res.data.list
        }
        this.resquestState = res.data.list.length == 10 ? 0 : 2
      }).catch((err) => {
        console.log(err)
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
view.wrap {
  min-height: 100vh;
  .list2 {
    /* #ifdef H5 */
    height: calc(100vh - 176upx);
    /* #endif */
    /* #ifndef H5 */
    height: calc(100vh - 176upx - var(--status-bar-height));
    /* #endif */
  }
  view.heightUp {
    height: 88upx;
    view.fix {
      position: fixed;
      background-color: #fff;
      left: 0;
      right: 0;
      /* #ifndef H5 */
      top: calc(45px + var(--status-bar-height));
      /* #endif */
      /* #ifdef H5 */
      top: 45px;
      /* #endif */
      z-index: 20;
    }
  }
  background-color: #f5f5f5;
  view.listItem {
    background-color: #fff;
    margin: 13upx 0;
    padding: 25upx 26upx;
    justify-content: space-between;
    view.imgContainer {
      align-self: center;
      flex-grow: 1;
      text-align: right;
      image {
        width: 20upx;
        height: 28upx;
      }
    }
    view.content {
      flex-grow: 1;
      view.line1 {
        margin-bottom: 38upx;
        justify-content: space-between;
        align-items: center;
        text.nameTxt {
          margin-right: 16upx;
          font-size: 14px;
          color: rgba(24, 28, 40, 1);
        }
        text.codeTxt {
          font-size: 13px;
          font-family: ArialMT;
          color: rgba(102, 102, 102, 1);
        }
        view.price {
          font-size: 24px;
          font-family: Arial-BoldMT;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
        }
      }
      view.line2 {
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        color: #999;
        view.time {
          font-size: 11px;
        }
        text.digital {
          color: #333;
          margin-right: 39upx;
        }
      }
    }
  }
}
</style>
