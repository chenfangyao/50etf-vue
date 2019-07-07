<template>
  <div class="tipItems black2">
    <div v-vtap="{method: go , params: 4}">
      <div class="hasBg">
        <img :src="img1">
      </div>
      <span class="textc1">交易</span>
    </div>
    <div v-vtap="{method: go , params: 1}" v-hover-class='"self-hover"'>
      <div class="hasBg bg2">
        <img :src="img2">
      </div>
      <span class="textc1">公告</span>
    </div>
    <div v-vtap="{method: go , params: 3}">
      <div class="hasBg bg3">
        <img :src="img3">
      </div>
      <span class="textc1">充值</span>
    </div>
    <div v-vtap="{method: go , params: 2}" v-hover-class='"self-hover"'>
      <div class="hasBg bg4">
        <img :src="img4">
      </div>
      <span class="textc1">新手指引</span>
    </div>
  </div>
</template>
<script>
import img1 from '@/assets/indexTabImg/jiaoyi.png'
import img2 from '@/assets/indexTabImg/gonggao.png'
import img3 from '@/assets/indexTabImg/chonzhi.png'
import img4 from '@/assets/indexTabImg/xinshou.png'
export default {
  data() {
    return { img1, img2, img3, img4, }
  },
  methods: {
    go(i) {
      let url = ''
      switch (i) {
        case 3: url = '/pages/assets_sub/recharge/recharge'
          break
        case 4: this.$redirectTo({ url: '/quotes' })
          return
        default: url = '/pages/msg_common/list/list'
      }
      this.$navigateTo({ url, query: { type: i } })
    }
  },
}
</script>
<style lang="scss">
div.tipItems {
  background-color: #fff;
  padding: 0.24rem 0;
  margin-top: 0.1rem;
  border-radius: 5px;
  > div {
    text-align: center;
  }
  div.hasBg {
    img {
      width: 0.94rem;
      height: 0.94rem;
      margin-top: 0.22rem;
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
