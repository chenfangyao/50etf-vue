<template>
  <div class="wrap black1">
    <base-header :hasBack="true" title='我的客服'></base-header>
    <div class="headlogo">
      <img :src="switchObj.logo" alt="">
      <div>{{switchObj.appname}}</div>
    </div>
    <div class="uni-flex item textc1">
      <img :src="img2" alt="">
      <span>客服电话：</span>
      <span>{{switchObj.tel}}</span>
    </div>
    <template v-if="qq">

    <div class="line"></div>

    <div class="uni-flex item textc1" >
      <img :src="img1" alt="">
      <span>客服QQ：</span>
      <ul class="ml5">
        <li v-for="(item,i) in qq" :key="i">{{item}}</li>
      </ul>
    </div>
    </template>
    <template v-if="wechat">

      <div class="line"></div>
      <div class="uni-flex item textc1" >
        <img :src="img3" alt="">
        <span>客服微信：</span>
        <ul>
          <li v-for="(item,i) in wechat" :key="i">{{item}}</li>
        </ul>
      </div>
    </template>
    <div class="line"></div>
    <div class="btn">
      <div class="txt textc1"><span>服务时间 ：周一 至 周五</span><span>{{switchObj.trade_time_range}}</span></div>
      <btn-block txt='电话咨询' @v-tap='call'></btn-block>
    </div>
  </div>
</template>

<script>
import btnBlock from '@/components/btnBlock.vue'
import { mapState } from 'vuex'
import img1 from '@/assets/mineImg/customer/qq.png'
import img2 from '@/assets/mineImg/customer/phone.png'
import img3 from '@/assets/mineImg/customer/wechat.png'

export default {
  data() {
    return {      img1, img2, img3
    };
  },
  computed: {
    ...mapState(['switchObj']),
    qq() {
      if(this.switchObj.qq===undefined||this.switchObj.qq==='') return'';
      return this.switchObj.qq.split('|')
    },
    wechat() {
      if(this.switchObj.wx===undefined||this.switchObj.wx==='') return'';
      return this.switchObj.wx.split('|')
    }
  },
  components: { btnBlock },
  methods: {
    call() {
     process.env.API_HOST && plus.device.dial(this.switchObj.tel);
    }
  },
}
</script>

<style lang="scss" scoped>
div#app.at-night{
  .line{
    border-color: #414a66
  }
}
div.wrap {
  height: 100vh;
  div.headlogo {
    text-align: center;
    margin: 0.59rem 0 0.9rem;
    img {
      height: 0.88rem;
      width: 0.88rem;
    }
  }

  div.item {
    align-items: flex-start;
    line-height: 0.4rem;
    font-size: 13px;
    color: #333;
    margin-left: 0.44rem;
    span:not(:last-child) {
      margin-left: 0.2rem;
    }
    .ml5 {
      margin-left: 5px;
    }
    img {
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 2px;
    }
  }
  div.line {
    margin: 0.2rem 0.44rem 0.2rem 1.04rem;
    display: block;
    border-bottom: 1px solid #ededed;
  }
  div.btn {
    padding: 0 0.22rem;
    position: absolute;
    bottom: 1.3rem;
    left: 0;
    right: 0;
    div.txt{
      text-align: center;
      font-size: 11px;
      color: #333;
      margin-bottom: 0.25rem;
    }
  }
}
</style>
