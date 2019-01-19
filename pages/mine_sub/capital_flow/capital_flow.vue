<template>
    <view class="Bigwrap">
        <base-header :hasBack="true"  title='资金流水'></base-header>
        <view class="line1 uni-flex">
            <text>共{{total}}笔</text>
            <image class="right" @tap="showDatepick" src='/static/mineImg/datePicker.png'/>
        </view>
        <scroll-view class='listscrow' lower-threshold='10' scroll-y @scrolltolower="loadMore">
            <view class="listsContainer" v-for="(item,i) in monetlist" :key="i">
                <view class="line1 uni-flex">
                    <view>
                        <text class="txt1">{{item.stock_name}}</text>
                        <text class="txt2">{{item.stock_code}}</text>
                    </view>
                    <view class="timetxt">
                        <!-- <text>{{$formatetimestr(item.create_time)}}</text> -->
                        <text>{{formatetime[i]}}</text>
                    </view>
                </view>
                <view class="line2">
                    <view class="bigTxt">{{item.pay_money}}</view>
                    <view class="uni-flex info">
                        <view>
                            <text class="infoName">手续费：</text>
                            <text>{{item.fee_money}}</text>
                        </view>
                        <view>
                            <text class="infoName">账户余额：</text>
                            <text>{{item.bal_money}}</text>
                        </view>
                    </view>
                </view>
            </view>
            <uni-load-more :loading-type="resquestState"></uni-load-more>
        </scroll-view>

        <date-pick v-if="showPick" @hid-me='closeme' @select-complete='getTime'></date-pick>
    </view>
</template>

<script>
import datePick from '@/components/datePick2.vue';
import uniLoadMore from '@/components/uni-load-more.vue';
export default {
  data() {
    return {
      showPick: false,
      monetlist: [],
      pageindex: 0,
      resquestState: 0,
      formatetime: [],
      total: 0,
      date_start: 0,
      date_end: 0
    }
  },
  methods: {
    showDatepick() {
      this.showPick = true
    },
    loadMore() {
      if (this.resquestState < 2) {
        this.pageindex += 1
        this.capicalflow( 'add')
      }
    },
    getTime(val) {
      this.showPick = false;
      this.pageindex = 0
      this.date_start = this.$timestamp(val.starttime)
      this.date_end = this.$timestamp(val.endtime)
      this.capicalflow()
    },
    closeme() {
      this.showPick = false;
    },
    // 资金流水
    capicalflow(add) {
      this.resquestState = 1
      var options = {
        url: '/Sapi/Squery/list_funds', //请求接口
        method: 'GET', //请求方法全部大写，默认GET
        data: {
          page_index: this.pageindex,
          page_size: 10,
          date_start: this.date_start,
          date_end: this.date_end
        },
      }
      this.$httpReq(options).then((res) => {
        if (res.status) {
          this.total = res.data.total
          if (add) {
            this.monetlist = this.monetlist.concat(res.data.list)
            var temarr = []
            for (let i = 0; i < res.data.list.length; i++) {
              temarr.push(this.$formatetimestr(res.data.list[i].create_time))
            }
            this.formatetime = this.formatetime.concat(temarr)
          } else {
            this.monetlist = res.data.list
            this.formatetime = []
            for (let i = 0; i < res.data.list.length; i++) {
              this.formatetime.push(this.$formatetimestr(res.data.list[i].create_time))
            }
          }
        }
        this.resquestState = res.data.list.length == 10 ? 0 : 2
      }).catch((err) => {
        // 请求失败的回调
        console.error(err,'捕捉')
      })
    }
  },
  components: { datePick, uniLoadMore },
  onLoad() {
    // uni.startPullDownRefresh();
  },
  onPullDownRefresh() {
    // 		setTimeout(()=>{
    // 			uni.stopPullDownRefresh();
    // 		},1000)
  },
  onShow() {
    this.capicalflow()
  }
}
</script>

<style lang="scss" scoped>
view.Bigwrap {
  min-height: 100vh;
  background-color: #f5f5f5;
  view.line1 {
    height: 88upx;
    justify-content: space-between;
    padding: 0 26upx;
    background-color: #fff;
    align-items: center;
    margin-top: 1px;
    image.right {
      width: 15px;
      height: 17px;
    }
  }
  .listscrow {
    /* #ifndef H5 */
    height: calc(100vh - 178upx - var(--status-bar-height));
    /* #endif */
    /* #ifdef H5 */
    height: calc(100vh - 178upx);
    /* #endif */
  }
  view.listsContainer {
    background-color: #fff;
    margin: 12upx 0;
    view.line1 {
      justify-content: space-between;
      height: 72upx;
      padding: 0 26upx;

      border-bottom: 1px solid #f5f5f5;
      text.txt1 {
        line-height: 72upx;
        font-size: 15px;
        color: rgba(24, 28, 40, 1);
        margin-right: 20upx;
      }
      text.txt2 {
        line-height: 72upx;
        font-size: 13px;
        font-family: ArialMT;
        color: #999;
      }
      view.timetxt {
        font-size: 13px;
        font-family: ArialMT;
        color: rgba(130, 133, 151, 1);
        line-height: 72upx;
        text.mr5 {
          margin-right: 5px;
        }
      }
    }

    view.line2 {
      padding: 0 26upx;

      view.bigTxt {
        font-size: 26px;
        font-family: ArialMT;
        color: rgba(240, 95, 92, 1);
        line-height: 26px;
        margin: 32upx 0 25upx;
      }
      view.info {
        justify-content: space-between;
        font-size: 14px;
        font-family: ArialMT;
        color: rgba(24, 28, 40, 1);
        line-height: 14px;

        text.infoName {
          color: rgba(112, 118, 128, 1);
          line-height: 14px;
          margin-right: 20upx;
        }
      }
    }
  }
}
</style>
