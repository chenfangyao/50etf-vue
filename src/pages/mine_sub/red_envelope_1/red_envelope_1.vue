<template>
  <div class="wrap22 black1">
    <base-header title="我的红包" has-back="1"></base-header>
    <div class="redEnvelope">
      <div class="redlist black2" v-for="(item,i) in redList" :key="i">
        <s-icon icon-class="black_code_bj"></s-icon>
        <main class="uni-flex">
          <div class="red-left">
            <span>￥</span>
            <span>{{parseInt(item.amount)}}</span>
          </div>
          <div class="red-right ">
            <label class="textc1">{{item.type}}</label>
            <!-- <label class="textc1">·发生时间:{{$formatetimestr(item.create_time)}}</label> -->
            <label class="textc1">·来自:{{item.giver_uname}}</label>
          </div>
        </main>
      </div>
      <div v-if="redList.length==0" class="">暂无红包</div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      redList: []
    }
  },
  methods: {
    getredEnvList() {
      var options = {
        url: '/Sapi/Ufund/redbag_list', //请求接口
        method: 'GET',
        data: {
          page_index: 0,
          page_size: 15,
        },
      }
      this.$httpReq(options).then((res) => {
        if (res.status) {
          this.redList = res.data.list
        }
        else {
          this.$toast(res.info ? res.info : '暂无记录')
        }
      }).catch((err) => {
        // 请求失败的回调
        console.error(err, '捕捉')
      })
    }
  },
  created() {
    this.getredEnvList()
  }
}
</script>

<style lang="scss" scoped>
div.wrap22 {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 20px;

  .redEnvelope {
    margin: 22px 11px 0 13px;
    .redlist {
      .s-icon {
        width: 7.06rem;
        height: 1.6rem;
      }
      position: relative;
      align-items: center;
      margin-top: 20px;
      line-height: 1;
      main {
        position: absolute;
        color: #fff;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        // justify-content: space-between;
        align-items: center;
      }
      .red-left {
        font-weight: 500;
        span {
          width: 58px;
          height: 50px;
          font-size: 36px;
          font-weight: 500;
          line-height: 50px;
        }
        span:nth-child(1) {
          margin-top: 17px;
          font-size: 18px;
          line-height: 25px;
        }
      }
      .red-right {
        label {
          display: block;
          font-size: 11px;
          line-height: 16px;
        }
        label:nth-child(1) {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 4px;
          line-height: 20px;
        }
      }
    }
  }
}
</style>

