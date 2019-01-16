<template>
	<view class="wrap">
		<base-header title="成交结果" has-back='1' v-if='showHeader'></base-header>
    <view class="heightUp">
      <view class="fix">
        <filter-list :total='total' @begin-choose='beginChoose' @end-choose='endChoose' @select-complete='getChooseTime'></filter-list>
      </view>
    </view>
    <scroll-view class="list2" lower-threshold='10' scroll-y @scrolltolower="loadMore">
      <view v-for="(item,i) in list"   :key="i" class='listItem uni-flex'>
        <view class="leftPart">
          <view class="title">
            <text>{{item.stock_name}}</text>
            <text>{{item.stock_code}}</text>
          </view>
          <view class="uni-flex tip4">
            <view class="uni-flex ">
              <view class="uni-flex uni-column">
                <text>委托：</text>
                <text>成交：</text>
              </view>
              <view class="uni-flex uni-column">
                <text>{{item.entrust_amount}}张</text>
                <text>{{business_amount[i]}}张</text>
              </view>
            </view>
            <view class="uni-flex ">
              <view class="uni-flex uni-column">
                <text>方向：</text>
                <text>方式：</text>
              </view>
              <view class="uni-flex uni-column">
                <text>{{item.entrust_bs==2?'卖出':'买入'}}</text>
                <text>{{item.entrust_type==2?'市价':'现价'}}</text>
              </view>
            </view>
          </view>
        </view>
        <view class="rightPart">
          <view class="time">{{businessTime[i]}}</view>
          <view class="price">{{item.business_price}}</view>
          <view class="txt">均价</view>
        </view>
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
      list: [],
      startI: 0,
      total: '',
      resquestState: 0,
      businessTime: [],//过滤用
      business_amount: [],//过滤用
      showHeader: true,
      sdate: 20080101,
      edate: 20300101,

    };
  },
  components: { filterList, uniLoadMore },
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
    beginChoose() {
      this.showHeader = false
    },
    endChoose() {
      this.showHeader = true
    },
    getDatas(add) {
      this.resquestState = 1
      var options = {
        url: '/Sapi/Squery/list_buss', //请求接口
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
        } else {
          this.list = res.data.list
        }
        this.filterVal(this.list)
        this.resquestState = res.data.list.length == 10 ? 0 : 2
      }).catch((err) => {
        console.error(err)
      })
    }
  },
  created() { this.getDatas() }
}
</script>

<style lang="scss" scoped>
view.wrap {
  min-height: 100vh;
  .list2 {
    /* #ifndef H5 */
    height: calc(100vh - 176upx - var(--status-bar-height));
    /* #endif */
    /* #ifdef H5 */
    height: calc(100vh - 176upx);

    /* #endif */
  }
  view.heightUp {
    height: 88upx;
    view.fix {
      background-color: #fff;
      position: fixed;
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
  view.listItem {
    background-color: #fff;
    margin: 13upx 0;
    justify-content: space-between;
    padding: 25upx 26upx;
    view.leftPart {
      flex-grow: 1;
      view.tip4 {
        > view {
          flex-grow: 1;
          line-height: 58upx;
          font-size: 12px;
          view:first-child {
            color: rgba(153, 153, 153, 1);
            // margin-right: 28upx;
          }
          view:last-child {
            color: #333;
          }
        }
        > view:last-child {
          justify-content: flex-end;
        }
      }
      view.title {
        margin-bottom: 36upx;
        text:first-child {
          font-size: 15px;
          color: rgba(51, 51, 51, 1);
          line-height: 15px;
          margin-right: 11upx;
        }
        line-height: 15px;
        font-size: 13px;
        color: rgba(102, 102, 102, 1);
      }
    }
    view.rightPart {
      text-align: right;
      flex-grow: 1;
      .time {
        font-size: 12px;
        color: rgba(153, 153, 153, 1);
        line-height: 12px;
      }
      .price {
        font-size: 24px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
        margin: 39upx 0 12upx;
      }
      .txt {
        font-size: 12px;
        color: rgba(153, 153, 153, 1);
        line-height: 12px;
      }
    }
  }
}
</style>
