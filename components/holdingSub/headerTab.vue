<template>
  <view>
    <view class="headerContainer">
      <view class="occupy"></view>
      <view class="wrap">
        <text @tap='tabTap' :class="{now:currentI==i}" :data-tabi='i' :key="i"  v-for='(item,i) in titleList'>{{item.name}}</text>
      </view>
    </view>
    <view class="h44"></view>
  </view>
</template>

<script>
	import { mapState } from 'vuex';
export default {
  props: ['titleList','tabI'],
  data() {
    return {
      currentI:0
    }
  },
	computed: mapState(['weituoindex']),
	created(){
		if(this.weituoindex==2){
			this.currentI=this.weituoindex
		}
	},
  methods: {
//     back() {
//       uni.navigateBack({ delta: 1 });
//     },
    tabTap(e) {
      this.$emit('tab-tap',e.target.dataset.tabi)
      this.currentI=e.target.dataset.tabi
    }
  }
}
</script>

<style lang="scss">
view.h44 {
  height: 44px;
}
.headerContainer {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background-color: #fff;
  view.wrap {
    text-align: center;
    height: 44px;
    font-size: 16px;
    line-height: 44px;
    position: relative;
    text {
      margin: 0 25upx;
      font-size: 15px;
      color: rgba(153, 153, 153, 1);
      line-height: 44px;
      padding-bottom: 24upx;
    }
    text.now {
      border-bottom: 4upx solid #409DE5;
      color: #409de5;
    }
  }
  .occupy {
    height: var(--status-bar-height);
  }
}
</style>
