<template>
  <view>
    <view class="wrap">
      <view class="occupy"></view>
      <view class="wrap2">
        <view class="left" @tap="back">
          <image src='/static/arrow/l.png' />
        </view>
        <view>
          <h4>{{commonstock[index].stockName}} </h4>
          <h5>{{commonstock[index].stockCode}}</h5>
        </view>
      </view>
    </view>
    <view class="h44"></view>
  </view>
</template>
 <script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
    };
  },
  methods: {
    back() {
      uni.navigateBack({ delta: 1 });
    }
  },
  computed: mapState(['commonstock']),
  props: ['index'],
}
</script>
<style lang="scss" scoped>
view.h44 {
  height: 44px;
}
view.wrap {
  border-bottom: 1px solid #ededed;
  position: fixed;
  left: 0;
  right: 0;
  background-color: #fff;
  top: 0;
  z-index: 50;
  .wrap2 {
    height: 44px;
    padding-top: 12upx;
    position: relative;
  }
  .occupy {
    height: var(--status-bar-height);
  }
  > view {
    flex-grow: 1;
    text-align: center;
  }
  view.left {
    padding: 13px 20upx 0 30upx;
    height: 44px;
    position: absolute;
    left: 0;
    top: 0;
    image {
      width: 13px;
      height: 15px;
    }
  }
  h4 {
    font-size: 15px;
    font-weight: 400;
    color: rgba(24, 28, 40, 1);
    margin: 0;
    line-height: 15px;
    margin-bottom: 9upx;
  }
  h5 {
    font-size: 10px;
    font-weight: 400;
    color: rgba(24, 28, 40, 1);
    margin: 0;
    line-height: 10px;
    margin-bottom: 13upx;
  }
}
</style>
