<template>
	<view class="wrap">
		<base-header title="平仓结算" has-back='1'></base-header>
    <view class="heightUp">
      <view class="fix">
        <filter-list :total='total' ></filter-list>
      </view>
    </view>
    <scroll-view class="list2" lower-threshold='10' scroll-y @scrolltolower="loadMore">
      <view v-for="(item,i) in list" hover-class='self-hover' @tap='go' :key="i" class='listItem uni-flex'>
        <view class="content">
          <view class="line1 uni-flex">
            <view>
              <text class="nameTxt">XD购12月2892A</text>
              <text class='codeTxt'>10001409</text>
            </view>
            <view class="price">-7412.01</view>
          </view>
          <view class="line2 uni-flex">
            <view>
              <text>
                <text>持仓数：</text>
                <text class="digital">9</text>
              </text>
              <text>
                <text>平仓数：</text>
                <text class="digital">22</text>
              </text>
            </view>
            <view class="time">2018-08-08 10:30:30</view>
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
    go(){
      uni.navigateTo({url:'../ping_c_item/ping_c_item'})
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
      position: fixed;
      background-color: #fff;
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
