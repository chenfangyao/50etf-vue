<template>
  <div >
    <div class="base-spase"></div>
    <van-tabbar v-model="active" :z-index="100" class="black2">
      <van-tabbar-item  v-vtap="{method: go , params: '/'}"   v-hover-class='"self-hover"'>
        <span>首页</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.img1s : icon.img1">
      </van-tabbar-item>
      <van-tabbar-item  v-vtap="{method: go , params: '/quotes'}"  v-hover-class='"self-hover"'>
        <span>行情</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.img2s : icon.img2">
      </van-tabbar-item>
      <van-tabbar-item v-vtap="{method: go , params: '/holding_warehouse'}"   v-hover-class='"self-hover"'>
        <span>持仓</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.img3s : icon.img3">
      </van-tabbar-item>
      <van-tabbar-item v-vtap="{method: go , params: '/assets'}"   v-hover-class='"self-hover"'>
        <span>资产</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.img4s : icon.img4">
      </van-tabbar-item>
      <van-tabbar-item v-vtap="{method: go , params: '/mine'}"   v-hover-class='"self-hover"'>
        <span>我的33</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.img5s : icon.img5">
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
//导入图片资源
import img1 from '@/assets/tabBarImg/index.png'
import img1s from '@/assets/tabBarImg/index_selected.png'
import img2 from '@/assets/tabBarImg/quotes.png'
import img2s from '@/assets/tabBarImg/quotes_seleted.png'
import img3 from '@/assets/tabBarImg/holding_warehouse.png'
import img3s from '@/assets/tabBarImg/holding_warehouse_selected.png'
import img4 from '@/assets/tabBarImg/assets.png'
import img4s from '@/assets/tabBarImg/assets_selected.png'
import img5 from '@/assets/tabBarImg/mine.png'
import img5s from '@/assets/tabBarImg/mine_selected.png'

import { Tabbar, TabbarItem } from 'vant'

import { mapState } from 'vuex'
export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  computed: mapState(['tabIndex']),
  data() {
    return {
      active: this.tabIndex,
      icon: { img1, img1s, img2, img2s, img3, img3s, img4, img4s, img5, img5s, }
    }
  },
  methods:{
    go(url){
      this.$redirectTo({url})
    }
  },
  mounted() {
    this.active = this.tabIndex
  },
  watch: {
    tabIndex(n) {
      this.active = n
    }
  }
}
</script>

<style  lang="scss">
.base-spase {
  height: 50px;
}
.van-tabbar-item__icon  {
  margin-bottom: 0 !important;
  img {
    width: 24px;
    height: 24px !important;
  }
}
[class*=van-hairline]::after {
  border: 0
}
.van-tabbar--fixed{
  padding-top: 6px;
}
</style>
