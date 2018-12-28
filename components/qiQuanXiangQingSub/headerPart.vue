
<template>
  <view>
    <view class="uni-flex">
      <view class="leftPart">
        <view class="leftTop uni-flex">
          <view class="price">0.2527</view>
          <view class="flexColumn">
            <text>-0.00095</text>
            <text>-4.75%</text>
          </view>
        </view>
        <view class="leftBottom uni-flex">
          <view class="time">交易时间：</view>
          <view class="flexColumn">
            <text>AM 09:30-11:30</text>
            <text>PM 01:00-02:57</text>
          </view>
        </view>
      </view>
      <view class="rightPart">
        <view class="uni-flex rightTop">
          <view>
            <text>今开</text>
            <text>0.2032</text>
          </view>
          <view>
            <text>昨收</text>
            <text>0.2187</text>
          </view>
        </view>
        <view class="uni-flex rightBottom">
          <view>
            <text>成交量</text>
            <text>1380</text>
          </view>
          <view>
            <text>持仓量</text>
            <text>2850</text>
          </view>
        </view>
      </view>
    </view>
    <header-part-detail :isshowDetail="isshowDetail"></header-part-detail>
    <view class="arrowImg" @tap="showPartDetail">
      <image v-show="isshowDetail" src="/static/arrow/b.png"></image>
      <image v-show="!isshowDetail" src="/static/arrow/t.png"></image>
    </view>

  </view>
</template>
<script>
import headerPartDetail from './headerPartDetail.vue'
export default {
  data() {
    return {
      isshowDetail:true
    }
  },
  components: { headerPartDetail },
  methods: {
    showPartDetail(){
      this.isshowDetail = !this.isshowDetail
    }
  }
}
</script>
<style lang="scss" scoped>
view.leftPart {
  margin: 30upx 0 0 26upx;
  view.leftTop {
    color: rgba(240, 95, 92, 1);
    font-family: MicrosoftYaHei;
    .price {
      font-size: 32px;
      font-weight: bold;
      line-height: 32px;
    }
  }
  .flexColumn {
    display: flex;
    flex-direction: column;
    text {
      font-size: 12px;
      line-height: 15px;
      font-weight: 400;
      
    }
  }
  view.leftBottom {
    color: #a8a8a8;
    margin-top: 36upx;
    font-size: 10px;
    view.time {
      align-self: flex-start;
      line-height: 16px;
      font-size: 10px;
    }
    text {
      font-size: 10px;
    }
  }
}
view.rightPart {
  flex-grow: 1;
  margin: 30upx 85upx 0 80upx;
  view.uni-flex {
    justify-content: space-between;
  }
  .rightBottom > view,
  .rightTop > view {
    margin-bottom: 24upx;
    text:first-child {
      font-size: 12px;
      color: #828597;
      line-height: 12px;
    }
    text:last-child {
      font-size: 12px;
      font-family: ArialMT;
      color: rgba(24, 28, 40, 1);
    }
    display: flex;
    flex-direction: column;
  }
}
view.arrowImg {
  text-align: center;
  image {
    width: 29upx;
    height: 17upx;
  }
}

</style>
