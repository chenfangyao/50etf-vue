<template>
  <div class="wrap22 black1">
    <base-header title="我的红包" has-back="1"></base-header>
    <div class="red-envelope">
      <div class="red-list black2" v-for="(item,i) in redList" :key="i">
        <div class="red-left">
          <span>￥</span>
          <span>{{parseInt(item.amount)}}</span>
        </div>
        <div class="red-right ">
          <label class="textc1">{{item.type}}盈利</label>
          <label class="textc1">·发生时间:{{$formatetimestr(item.create_time)}}</label>
          <label class="textc1">·来自:{{item.giver_uname}}</label>
          <label class="textc1">·限50etf交易使用</label>
        </div>
      </div>
      <div class="not-red-list"></div>
    </div>

  </div>
</template>

<script>
import img1 from '@/assets/mineImg/hong_bao_bg.png'
export default {
  data() {
    return {
      redList:[]
    }
  },
  methods:{
    getredEnvList(){
      var options = {
        url: '/Sapi/Ufund/redbag_list', //请求接口
        method: 'GET', //请求方法全部大写，默认GET
        data: {
          page_index: 0,
          page_size: 15,
        },
      }
      this.$httpReq(options).then((res) => {
        if (res.status) {
            this.redList=res.data.list
        }
        else {
          this.$toast(res.info ? res.info : '暂无记录')
        }
      }).catch((err) => {
        // 请求失败的回调
        console.error(err,'捕捉')
      })
    }
  },
  created(){
    this.getredEnvList()
  }
}
</script>

<style lang="scss" scoped>
div.wrap22 {
  width: 100%;
  height: 800px;
  background-color:#F5F5F5 ;
  .red-envelope{
    margin: 22px 11px 0 13px;
    height: 800px;
    .red-list{
      position: relative;
      margin-top: 20px;
      background-color: white;
      height: 104px;
      .red-left{
        position: absolute;
        top: 27px;
        left:16px;
        color:rgba(240,95,92,1);
        font-family:PingFangSC-Medium;
        font-weight:500;
      span{
        width:58px;
        height:50px;
        font-size:36px;
        font-weight:500;
        line-height:50px;
      }
        span:nth-child(1){
          margin-top: 17px;
          font-size:18px;
          line-height:25px;
        }
      }
      .red-right{
        position: absolute;
        left:112px;
        top:16px;
        label{
          display: block;
          font-size: 11px;
          line-height: 16px;
          color: #999;
        }
        label:nth-child(1){
          font-size: 14px;
          color: #333;
          font-weight: 600;
          margin-bottom: 4px;
          line-height: 20px;
          font-family:PingFangSC-Semibold;
        }
      }
    }
  }
  .not-red-list{

  }
}
</style>

