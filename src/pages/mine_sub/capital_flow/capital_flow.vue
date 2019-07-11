<template>
  <div class="Bigwrap black1">
    <base-header :hasBack="true" title='资金流水'></base-header>
    <div class="line1 uni-flex black2 textc1">
      <span>共{{total}}笔</span>
      <s-icon class="right" v-vtap="{method:showDatepick}" :icon-class="'select_rili' | atNightIcon" />
    </div>
    <scroll-view class='listscrow' ref="scroll3" @scrollToEnd="loadMore">
      <div>
        <div class="listsContainer black2 textc1" v-for="(item,i) in monetlist" :key="i">
          <div class="line1 black2 uni-flex">
            <div>
              <span class="txt1 textc1">{{item.stock_name}}</span>
              <span class="txt2 textc2">{{item.stock_code}}</span>
            </div>
            <div class="timetxt textc2">
              <!-- <span>{{$formatetimestr(item.create_time)}}</span> -->
              <span>{{formatetime[i]}}</span>
            </div>
          </div>
          <div class="line2 uni-flex">
            <div>
              <div>
                <span class="infoName textc1">手续费：</span>
                <span class="textc2">{{item.fee_money}}</span>
              </div>
              <div>
                <span class="infoName textc1">账户余额：</span>
                <span class="textc2">{{item.bal_money}}</span>
              </div>
            </div>
            <div class="bigTxt textc1">{{item.pay_money}}</div>
          </div>
        </div>
        <uni-load-more :loading-type="resquestState"></uni-load-more>
      </div>
    </scroll-view>

    <date-pick @hid-me='closeme' :show-pick='showPick' @select-complete='getTime'></date-pick>
  </div>
</template>

<script>
import datePick from '@/components/datePick.vue';
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
        this.capicalflow('add')
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
        url: '/Sapi/Squery/list_funds',
        method: 'GET',
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

        console.error(err, '捕捉')
      })
    }
  },
  components: { datePick, uniLoadMore, scrollView },
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
  > div.line1 {
    height: 0.78rem;
    justify-content: space-between;
    padding: 0 0.26rem;
    font-size: 12px;
    color: #666;
    align-items: center;
    margin-top: 1px;
    .right {
      width: 20px;
      height: 20px;
    }
  }
  .listscrow {
    height: calc(100vh - 1.78rem);
    overflow: hidden;
  }
  div.listsContainer {
    background-color: #fff;
    margin: 0.2rem 0.22rem;
    border-radius: 5px;
    div.line1 {
      justify-content: space-between;
      height: 0.72rem;
      margin: 0 0.26rem;
      color: #999;
      border-bottom: 1px solid #f5f5f5;
      span.txt1 {
        line-height: 0.72rem;
        color: #333;
        font-weight: bold;
        margin-right: 0.2rem;
      }
      span.txt2 {
        line-height: 0.72rem;
        font-size: 13px;
        
      }
      div.timetxt {
        font-size: 13px;
        
        line-height: 0.72rem;
        span.mr5 {
          margin-right: 5px;
        }
      }
    }

    div.line2 {
      padding: 0 0.26rem;

      div.bigTxt {
        font-size: 16px;
        color: #333;
        font-weight: bold;
        margin: 0.32rem 0 0.25rem;
      }
      justify-content: space-between;
      font-size: 14px;
      color: rgba(24, 28, 40, 1);
      line-height: 14px;

      span.infoName {
        color: #666;
        /* width: 5em;
        display: inline-block; */
        font-size: 12px;
        line-height: 14px;
        margin-right: 0.2rem;
        & + span {
          font-size: 12px;
          color: #000;
        }
      }
    }
  }
}
</style>
