<template>
  <div >
    <div class="base-spase"></div>
    <van-tabbar v-model="active" :z-index="100" class="black2" active-color="#ff3838">
      <van-tabbar-item  v-vtap="{method: go , params: '/'}"   v-hover-class='"self-hover"'>
        <span>首页</span>
        <s-icon slot="icon" slot-scope="props" class-name="bottomIcon" :icon-class="props.active ?'tab_home_pre':atNight?'tab_home_nor2':'tab_home_nor'"  />
      </van-tabbar-item>
      <van-tabbar-item  v-vtap="{method: go , params: '/quotes'}"  v-hover-class='"self-hover"'>
        <span>行情</span>
        <s-icon slot="icon" slot-scope="props" class-name="bottomIcon" :icon-class="props.active ?'tab_hangqing_pre':atNight?'tab_hangqing_nor2':'tab_hangqing_nor'"  />
      </van-tabbar-item>
      <van-tabbar-item v-vtap="{method: go , params: '/holding_warehouse'}"   v-hover-class='"self-hover"'>
        <span>持仓</span>
        <s-icon slot="icon" slot-scope="props" class-name="bottomIcon" :icon-class="props.active ?'tab_chicang_pre':atNight?'tab_chicang_nor2':'tab_chicang_nor'"  />
      </van-tabbar-item>
      <van-tabbar-item v-vtap="{method: go , params: '/assets'}"   v-hover-class='"self-hover"'>
        <span>资产</span>
        <s-icon slot="icon" slot-scope="props" class-name="bottomIcon" :icon-class="props.active ?'tab_zichan_pre':atNight?'tab_zichan_nor2':'tab_zichan_nor'"  />
      </van-tabbar-item>
      <van-tabbar-item v-vtap="{method: go , params: '/mine'}"   v-hover-class='"self-hover"'>
        <span>我的</span>
        <s-icon slot="icon" slot-scope="props" class-name="bottomIcon" :icon-class="props.active ?'tab_wode_pre':atNight?'tab_wode_nor2':'tab_wode_nor'"  />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

import { Tabbar, TabbarItem } from 'vant'

import { mapState } from 'vuex'
export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  computed: mapState(['tabIndex','atNight']),
  data() {
    return {
      active: this.tabIndex,
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
  font-size: 14px;
  line-height: 1;
  .bottomIcon{
    font-size: 24px;
  }
}
[class*=van-hairline]::after {
  border: 0
}
.van-tabbar--fixed{
  padding-top: 5px;
  border-top: solid 1px #e5e5e5;

}
</style>
