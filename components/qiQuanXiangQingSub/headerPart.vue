
<template>
  <view class="bgfff">
    <view class="uni-flex">
      <view class="leftPart">
        <view class="leftTop uni-flex">
          <view class="price">{{resObj.latestPrice}}</view>
          <view class="flexColumn">
            <text>{{resObj.priceChange}}</text>
            <text>{{priceChangeRate}}</text>
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
            <text>{{resObj.openPrice}}</text>
          </view>
          <view>
            <text>昨收</text>
            <text>{{resObj.preclosePrice}}</text>
          </view>
        </view>
        <view class="uni-flex rightBottom">
          <view>
            <text>成交量</text>
            <text>{{resObj.dealAmount}}</text>
          </view>
          <view>
            <text>持仓量</text>
            <text>{{resObj.openInterest}}</text>
          </view>
        </view>
      </view>
    </view>
    <header-part-detail :isshowDetail="isshowDetail" :resdata='resObj' :hynumbers='hynumbers' :hyinfos='hyinfos'></header-part-detail>
    <view class="arrowImg" @tap="showPartDetail">
      <image v-show="isshowDetail" src="/static/arrow/t.png"></image>
      <image v-show="!isshowDetail" src="/static/arrow/b.png"></image>
      <!-- <image v-show="!isshowDetail" src="/static/arrow/t.png"></image> -->
    </view>

  </view>
</template>
<script>
import headerPartDetail from './headerPartDetail.vue'

export default {
  data() {
    return {
      isshowDetail: false,
      priceChangeRate: '',
    }
  },
  props:['resObj','hynumbers','hyinfos'],
  components: { headerPartDetail },
  watch: {
    resObj(val) {
      this.priceChangeRate = (val.priceChangeRate * 100).toFixed(2)+'%'
    }
  },
  methods: {
    showPartDetail() {
      this.isshowDetail = !this.isshowDetail
    }
  },
	created(){
		
	}
}
</script>
<style lang="scss" scoped>
.bgfff{background: #fff;}
view.leftPart {
  margin: 30upx 0 0 26upx;
  view.leftTop {
    color: rgba(240, 95, 92, 1);
    font-family: MicrosoftYaHei;
    .price {
      font-size: 32px;
      font-weight: bold;
      line-height: 32px;
      margin-right: 4upx;
    }
  }
  .flexColumn {
    display: flex;
    flex-direction: column;
    text {
      font-size: 13px;
      line-height: 15px;
      font-weight: 400;
    }
  }
  view.leftBottom {
    color: #a8a8a8;
    margin-top: 20upx;
    font-size: 10px;
    view.time {
      align-self: flex-start;
      line-height: 16px;
      font-size: 10px;
    }
    text {
      font-size: 12px;
    }
  }
}
view.rightPart {
  flex-grow: 1;
  margin: 30upx 85upx 0 80upx;
  view.uni-flex {
		view:nth-child(1){
			margin-left: 10px;
		}
    justify-content: space-between;
		text{
			font-size: 14px;
		}
  }
  .rightBottom > view,
  .rightTop > view {
    margin-bottom: 12upx;
    text:first-child {
      font-size: 14px;
      color: #828597;
      line-height: 12px;
    }
    text:last-child {
      font-size: 14px;
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
