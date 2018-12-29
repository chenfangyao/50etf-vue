<template>
  <view class="uni-flex">
    <view class="v1" @tap="go(0)" hover-class="tap-hover">开仓</view>
    <view class="v2" @tap="go(1)" hover-class="tap-hover">平仓</view>
  </view>
</template>
<style lang="scss" scoped>
@import "../../common/customize.scss";

$v1bg: #409de5;
$v2bg: #e6aa12;
view.uni-flex {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 98upx;
  font-size: 16px;
  text-align: center;
  .v1 {
    line-height: 98upx;
    background-color: $v1bg;
    width: 50%;
  }
  .v1.tap-hover {
    background: darken($v1bg, 5%);
  }
  .v2.tap-hover {
    background: darken($v2bg, 5%);
  }
  .v2 {
    line-height: 98upx;
    width: 50%;
    background-color: $v2bg;
  }
  color: rgba(255, 255, 255, 1);
}
</style>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {}
  },
  methods: {
    ...mapMutations(['sethycode']),
    go(val) {
        this.sethycode(10001442)
      uni.navigateTo({ url: '/pages/quotes_sub/open_close/open_close?val='+val+''})

    }
  }
}
</script>
