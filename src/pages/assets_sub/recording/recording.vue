<template>
	<div class="wrap">
		<base-header has-back='1' :title="type==1?'充值记录':'提现记录'"></base-header>
    <div class="line1 uni-flex">
        <span>总计：{{total}}笔</span>
        <img class="right" @touchend="switchDatepick" src="/assets/mineImg/datePicker.png">
    </div>
    <scroll-view v-if='type==1' class='listscrow' lower-threshold='10' scroll-y @scrolltolower="loadMore">
        <div class="listsContainer uni-flex" v-for="(item,i) in recordlist" :key="i">
          <div class="left">{{item.order_status==1?'成功':item.order_status==2?'失败':'充值中'}}</div>
          <div class="middle">
            <div>人民币账户</div>
            <div>平台充值</div>
            <div class="time">{{formatetime[i]}}</div>
          </div>
          <div class="money">{{item.pay_money}}</div>
        </div>
        <uni-load-more :loading-type="resquestState"></uni-load-more>
    </scroll-view>
    <scroll-view v-else class='listscrow' lower-threshold='10' scroll-y @scrolltolower="loadMore">
        <div class="listsContainer uni-flex" v-for="(item,i) in recordlist" :key="i">
          <div class="left">{{item.status}}</div>
          <div class="middle">
            <div>{{bank_code[i][0]}}</div>
            <div>{{bank_code[i][1]}}</div>
            <div class="time">{{formatetime[i]}}</div>
          </div>
          <div class="money">{{item.money}}</div>
        </div>
        <uni-load-more :loading-type="resquestState"></uni-load-more>
    </scroll-view>
    <date-pick v-if="showPick" @hid-me='switchDatepick' @select-complete='getTime'></date-pick>

	</div>
</template>

<script>
import datePick from '@/components/datePick.vue';
import uniLoadMore from '@/components/uni-load-more.vue';
export default {
  data() {
    return {
      showPick: false,
      recordlist: [],
      resquestState: 0,
      pageindex: 0,
      formatetime: [],
      total: '',
      type: 1,//1充值、2提现
      bank_code: []
    };
  },
  components: { datePick, uniLoadMore },
  methods: {
    switchDatepick() {
      this.showPick = !this.showPick
    },
    loadMore() {
      if (this.resquestState < 2) {
        this.pageindex += 1
        this.getRecords(0, 0, this.pageindex, 'add')
      }
    },
    getTime(val) {
      this.showPick = false;
      this.getRecords(val.starttime, val.endtime, 0)
    },
    getRecords(starttime, endtime, index, add) {
      this.resquestState = 1
      let url = this.type == 1 ? '/Sapi/Ufund/pay_list' : '/Sapi/Ufund/cash_list'
      var options = {
        url, //请求接口
        method: 'GET', //请求方法全部大写，默认GET
        data: {
          page_index: index || 0,
          page_size: 10,
          sdate: starttime || 0,
          edate: endtime || 0
        },
      }
      this.$httpReq(options).then((res) => {
        this.total = res.data.total
        if (res.status) {
          if (add) {
            this.recordlist = this.recordlist.concat(res.data.list)
            var temarr = []
            for (let i = 0; i < res.data.list.length; i++) {
              temarr.push(this.$formatetimestr(res.data.list[i].create_time))
              if (res.data.list[i].bankcard) {
                this.bank_code.push(res.data.list[i].bankcard.split(' '))
              }
            }
            this.formatetime = this.formatetime.concat(temarr)
          } else {
            this.formatetime=[]
            this.recordlist = res.data.list
            for (let i = 0; i < res.data.list.length; i++) {
              this.formatetime.push(this.$formatetimestr(res.data.list[i].create_time))
              if (res.data.list[i].bankcard) {
                this.bank_code[i] = res.data.list[i].bankcard.split(' ')
              }

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
  onLoad(opts) {
    this.type = opts.type
  },
  created() {
    this.getRecords(1)
  }
}
</script>


<style lang="scss" scoped>
div.wrap {
  min-height: 100vh;
  background-color: #f5f5f5;
  div.line1 {
    height:.88rem;
    justify-content: space-between;
    padding: 0.26rem;
    background-color: #fff;
    align-items: center;
    margin-top: 1px;
    img.right {
      width: 15px;
      height: 17px;
    }
  }
  .listscrow {
    /* #ifndef H5 */
    height: calc(100vh -1.78rem - var(--status-bar-height));
    /* #endif */
    /* #ifdef H5 */
    height: calc(100vh -1.78rem);
    /* #endif */
    div.listsContainer {
      background-color: #fff;
      margin:.12rem 0;
      padding:.08rem.32rem 0;
      justify-content: space-between;
      div.money {
        font-size: 20px;
        font-weight: 500;
        flex-grow: 1;
        color: rgba(240, 95, 92, 1);
        letter-spacing: 1px;
        text-align: right;
      }
      div.left {
        font-size: 16px;
        line-height:1.64rem;
        width:1.22rem;
        font-weight: 500;
        color: rgba(24, 144, 255, 1);
        letter-spacing: 1px;
      }
      div.middle {
        font-size: 14px;
        color: rgba(51, 51, 51, 1);
        .time {
          font-size: 11px;
          color: rgba(102, 102, 102, 1);
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
