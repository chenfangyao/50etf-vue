<template>
    <div class="Bigwrap">
        <base-header :hasBack="true"  title='资金流水'></base-header>
        <div class="line1 uni-flex">
            <span>共{{total}}笔</span>
            <img class="right" @click="showDatepick" src="../../../assets/mineImg/datePicker.png"/>
        </div>
        <scroll-view class='listscrow' lower-threshold='10' ref="scroll3" scroll-y @scrollToEnd="loadMore">
          <div>
            <div class="listsContainer" v-for="(item,i) in monetlist" :key="i">
                <div class="line1 uni-flex">
                    <div>
                        <span class="txt1">{{item.stock_name}}</span>
                        <span class="txt2">{{item.stock_code}}</span>
                    </div>
                    <div class="timetxt">
                        <!-- <span>{{$formatetimestr(item.create_time)}}</span> -->
                        <span>{{formatetime[i]}}</span>
                    </div>
                </div>
                <div class="line2">
                    <div class="bigTxt">{{item.pay_money}}</div>
                    <div class="uni-flex info">
                        <div>
                            <span class="infoName">手续费：</span>
                            <span>{{item.fee_money}}</span>
                        </div>
                        <div>
                            <span class="infoName">账户余额：</span>
                            <span>{{item.bal_money}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <uni-load-more :loading-type="resquestState"></uni-load-more>
          </div>
        </scroll-view>

        <date-pick v-if="showPick" @hid-me='closeme' @select-complete='getTime'></date-pick>
    </div>
</template>

<script>
import datePick from '@/components/datePick2.vue';
import uniLoadMore from '@/components/uni-load-more.vue';
import scrollView from '@/components/other/scroll-view'

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
           this.$refs.scroll3.refresh()

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
  components: { datePick, uniLoadMore ,scrollView},
  created() {
    this.capicalflow()
  }
}
</script>

<style lang="scss" scoped>
div.Bigwrap {
  min-height: 100vh;
  width: 100%;
  background-color: #f5f5f5;
  div.line1 {
    height:.88rem;
    justify-content: space-between;
    padding: 0 .26rem;
    background-color: #fff;
    align-items: center;
    margin-top: 1px;
    img.right {
      width: 15px;
      height: 17px;
    }
  }
  .listscrow {
    height: calc(100vh - 1.78rem);
    overflow: hidden;
  }
  div.listsContainer {
    background-color: #fff;
    margin:.12rem 0;
    div.line1 {
      justify-content: space-between;
      height:.72rem;
      padding: 0 .26rem;

      border-bottom: 1px solid #f5f5f5;
      span.txt1 {
        line-height:.72rem;
        font-size: 15px;
        color: rgba(24, 28, 40, 1);
        margin-right:.20rem;
      }
      span.txt2 {
        line-height:.72rem;
        font-size: 13px;
        font-family: ArialMT;
        color: #999;
      }
      div.timetxt {
        font-size: 13px;
        font-family: ArialMT;
        color: rgba(130, 133, 151, 1);
        line-height:.72rem;
        span.mr5 {
          margin-right: 5px;
        }
      }
    }

    div.line2 {
      padding: 0 .26rem;

      div.bigTxt {
        font-size: 26px;
        font-family: ArialMT;
        color: rgba(240, 95, 92, 1);
        line-height: 26px;
        margin: .32rem 0 .25rem;
      }
      div.info {
        justify-content: space-between;
        font-size: 14px;
        font-family: ArialMT;
        color: rgba(24, 28, 40, 1);
        line-height: 14px;

        span.infoName {
          color: rgba(112, 118, 128, 1);
          line-height: 14px;
          margin-right:.20rem;
        }
      }
    }
  }
}
</style>
