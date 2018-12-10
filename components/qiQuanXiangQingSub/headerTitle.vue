<template>
  <view class="wrap " >
    <image src='/static/arrow/l.png' @tap="back"/>
    <view>
      <h4>{{name1}}</h4>
      <h5>{{name2}}</h5>
    </view>
    
  </view>
</template>
<script>
export default {
  props: {
    name1: {
      default: '50ETF购11月2250'
    },
    name2: {
      default: '10001493'
    }
  },
  methods: {
    back() {
      uni.navigateBack({
        delta: 1
      });
    }
  }
}
</script>

<style lang="scss" scoped>
view.wrap {
  border-bottom: 1px solid #ededed;
  position: relative;
  padding-top: 9upx;
  > view {
    flex-grow: 1;
    text-align: center;
  }
  image {
    width: 13px;
    height: 15px;
    align-self: center;
    left: 20upx;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
  }
  h4 {
    font-size: 15px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(24, 28, 40, 1);
    margin: 0;
    line-height: 15px;
    margin-bottom: 9upx;
  }
  h5 {
    font-size: 10px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(24, 28, 40, 1);
    margin: 0;
    line-height: 10px;
    margin-bottom: 13upx;
  }
}
</style>
