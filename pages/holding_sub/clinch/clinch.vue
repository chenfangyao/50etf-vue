<template>
	<view class="wrap">
		<base-header title="成交结果" has-back='1'></base-header>
    <view class="heightUp">
      <view class="fix">
        <filter-list :total='total' ></filter-list>
      </view>
    </view>
    <scroll-view class="list2" lower-threshold='10' scroll-y @scrolltolower="loadMore">
      <view v-for="(item,i) in list"   :key="i" class='listItem uni-flex'>
        <view class="leftPart">
          <view class="title">
            <text>XD购6月2450</text>
            <text>10A01409</text>
          </view>
          <view class="uni-flex tip4">
            <view class="uni-flex ">
              <view class="uni-flex uni-column">
                <text>委托:</text>
                <text>成交:</text>
              </view>
              <view class="uni-flex uni-column">
                <text>13</text>
                <text>32</text>
              </view>
            </view>
            <view class="uni-flex ">
              <view class="uni-flex uni-column">
                <text>方向:</text>
                <text>方式:</text>
              </view>
              <view class="uni-flex uni-column">
                <text>卖出</text>
                <text>市价</text>
              </view>
            </view>
          </view>
        </view>
        <view class="rightPart">
          <view class="time">2018-10-02 10:09:10</view>
          <view class="price">0.1428</view>
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
      list: [, , , , , , , , , , , , , , , , , , , , , , , ,],
      startI: 0,
      total: '',
      resquestState: 0,
    };
  },
  components: { filterList, uniLoadMore },
  methods: {
    loadMore() {
      console.log('到底了');
      if (this.resquestState < 2) {
        this.startI++
        this.getDatas('add')
      }
    },
    getDatas(add) {
      this.resquestState = 1
      var options = {
        url: '/Sapi/Squery/list_balsell', //请求接口
        data: {
          page_index: this.startI,
          page_size: 10,
          sdate: 19700101,
          edate: 20500101
        },
        method: 'GET'
      }
      this.$httpReq(options).then((res) => {
        this.total = res.data.total
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

}
</script>

<style lang="scss" scoped>
view.wrap {
  min-height: 100vh;
  .list2 {
    height: calc(100vh - 176upx);
  }
  view.heightUp {
    height: 88upx;
    view.fix {
      background-color: #fff;
      position: fixed;
      left: 0;
      right: 0;
      top: calc(45px + var(--status-bar-height));
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
      view.tip4 {
        > view {
          flex-grow: 1;
          line-height: 58upx;
          font-size: 12px;
          view:first-child {
            color: rgba(153, 153, 153, 1);
            margin-right: 28upx;
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
