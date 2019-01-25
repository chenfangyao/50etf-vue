<template>
  <div class="tipItems">
    <div @touchend='go(4)'>
      <div class="hasBg">
        <img :src="img1" >
      </div>
      <span>交易</span>
    </div>
    <div @touchend='go(1)' hover-class='self-hover'>
      <div class="hasBg bg2">
        <img :src="img2" >
      </div>
      <span>公告</span>
    </div>
    <div @touchend='go(3)'>
      <div class="hasBg bg3">
        <img :src="img3" >
      </div>
      <span>充值</span>
    </div>
    <div @touchend='go(2)' hover-class='self-hover'>
      <div class="hasBg bg4">
        <img :src="img4" >
      </div>
      <span>新手指引</span>
    </div>
  </div>
</template>
<script>
import img1 from '@/assets/indexTabImg/jiaoyi.png'
import img2 from '@/assets/indexTabImg/gonggao.png'
import img3 from '@/assets/indexTabImg/chongzhi.png'
import img4 from '@/assets/indexTabImg/xinshouzhiying.png'
export default {
  data(){
    return{img1,img2,img3,img4,}
  },
  methods: {
    go(i) {
      let url = ''
      switch (i) {
        case 3: url = '/pages/assets_sub/recharge/recharge'
          break
        case 4: uni.switchTab({ url: '/pages/tabBar/quotes/quotes' })
          return
        default: url = '/pages/msg_common/list/list?type=' + i
      }
      this.$navigateTo({ url })
    }
  },
}
</script>
<style lang="scss">
div.tipItems {
  background-color: #fff;
  padding:.24rem 0;
  margin-top:.08rem;
  border-radius: 5px;
  > div {
    text-align: center;
  }
  div.hasBg {
    img {
      width:.94rem;
      height:.94rem;
      margin-top:.22rem;
    }
  }
  display: flex;
  justify-content: space-around;
  span {
    font-size: 13px;
    color: rgba(24, 28, 40, 1);
  }
}
</style>
