 <template>
   <view class='infoWrap uni-flex'>
     <view class="leftPart">
       <view class="line1">
         <view class="bigTxt">{{latestPrice}}</view>
         <view class="txt2">
           <text>{{priceChange}}</text>
           <text>{{priceChangeRate}}%</text>
         </view>
       </view>
     </view>
     <view class="middlePart">
       <view class="line1 uni-flex">
         <view class="uni-flex uni-column">
           <text>今&nbsp&nbsp&nbsp开</text>
           <text>最&nbsp&nbsp&nbsp高</text>
         </view>
         <view class="uni-flex uni-column">
           <text>{{openPrice}}</text>
           <text>{{highPrice}}</text>
         </view>
       </view>
     </view>
     <view class="rightPart">
       <view class="line1 uni-flex">
         <view class="uni-flex uni-column">
           <text>昨&nbsp&nbsp&nbsp收</text>
           <text>最&nbsp&nbsp&nbsp低</text>
           <text>成交额</text>

         </view>
         <view class="uni-flex uni-column">
           <text>{{preclosePrice}}</text>
           <text>{{lowPrice}}</text>
           <text>{{dealAmount}}亿</text>

         </view>
       </view>
     </view>
     <view class="abs">交易时间 09 : 15 - 11 : 30 13 : 00 - 15 : 00</view>
   </view>
 </template>
 <script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      latestPrice: '',
      priceChange: '',
      priceChangeRate: '',
      dealAmount: '',
      openPrice: '',
      highPrice: '',
      preclosePrice: '',
      lowPrice: '',
    };
  },
  computed: mapState(['commonstock']),
  props: ['index'],
  methods: {

  },
  mounted() {
    this.latestPrice = parseFloat(this.commonstock[this.index].latestPrice).toFixed(2)
    this.priceChange = parseFloat(this.commonstock[this.index].priceChange).toFixed(2)
    this.priceChangeRate = parseFloat(this.commonstock[this.index].priceChangeRate).toFixed(2)
    this.dealAmount = parseFloat(this.commonstock[this.index].dealAmount / 100000000).toFixed(2)
    this.openPrice = parseFloat(this.commonstock[this.index].openPrice).toFixed(2)
    this.highPrice = parseFloat(this.commonstock[this.index].highPrice).toFixed(2)
    this.preclosePrice = parseFloat(this.commonstock[this.index].preclosePrice).toFixed(2)
    this.lowPrice = parseFloat(this.commonstock[this.index].lowPrice).toFixed(2)
  },
}
</script>
 <style lang="scss" scoped>
view.infoWrap {
  border-bottom: 12upx solid #f5f5f5;
  padding: 35upx 28upx 0;
  justify-content: space-between;
  position: relative;
  view.abs {
    position: absolute;
    bottom:22upx;
    left: 30upx;
    font-size: 11px;
    color: rgba(153, 153, 153, 1);
  }
  .line2 {
    margin-top: 21upx;
  }
  .line1 {
    margin-top: 7upx;
  }
  view.uni-column:first-child {
    font-size: 13px;
    color: rgba(112, 118, 128, 1);
    margin-right: 21upx;
    line-height: 13px;
  }
  view.uni-column:last-child {
    font-size: 13px;
    font-family: ArialMT;
    color: rgba(24, 28, 40, 1);
    line-height: 13px;
  }
  view.uni-column > text {
    margin-bottom: 29upx;
  }

  view.leftPart {
    view.line1 {
      font-size: 12px;
      color: rgba(240, 95, 92, 1);
      line-height: 12px;
      margin-top: 0;
      view.bigTxt {
        font-size: 25px;
        line-height: 25px;
        font-weight: bold;
      }
      view.txt2 {
        //  margin-bottom: 36upx;
        //  margin-top: 46upx;
      }
      text {
        margin-right: 27upx;
        line-height: 12px;
      }
    }
  }
}
</style>
 