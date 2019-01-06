 <template>
   <view class='infoWrap uni-flex'>
     <view class="leftPart">
       <view class="line1">
         <view class="bigTxt">{{(commonstock[index].latestPrice)}}</view>
         <view class="txt2">
           <text>{{(commonstock[index].priceChange)}}</text>
           <text>{{commonstock[index].priceChangeRate}}%</text>
         </view>
       </view>
     </view>
     <view class="middlePart">
       <view class="line1 uni-flex">
         <view class="uni-flex uni-column">
           <text>成交额</text>
           <text>今&nbsp&nbsp&nbsp开</text>
           <text>最&nbsp&nbsp&nbsp高</text>
         </view>
         <view class="uni-flex uni-column">
           <text>{{(commonstock[index].dealAmount/100000000)}}亿</text>
           <text>{{(commonstock[index].openPrice)}}</text>
           <text>{{(commonstock[index].highPrice)}}</text>
         </view>
       </view>
     </view>
     <view class="rightPart">
       <view class="line1 uni-flex">
         <view class="uni-flex uni-column">
           <text>&nbsp</text>
           <text>昨&nbsp&nbsp&nbsp收</text>
           <text>最&nbsp&nbsp&nbsp低</text>
         </view>
         <view class="uni-flex uni-column">
           <text>&nbsp</text>
           <text>{{(commonstock[index].preclosePrice)}}</text>
           <text>{{(commonstock[index].lowPrice)}}</text>
         </view>
       </view>
     </view>
   </view>
 </template>
 <script>
 	import { mapState } from 'vuex';
 	
 	export default {
 	  data() {
 	    return {
 	    };
 	  },
 		computed: mapState(['commonstock']),
 	  props:['index'],
 	}
 </script>
 <style lang="scss" scoped>
 view.infoWrap {
   border-bottom: 12upx solid #f5f5f5;
   padding: 35upx 28upx 0;
   justify-content: space-between;
   .line2 {
     margin-top: 21upx;
   }
   .line1{
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
   view.uni-column>text{
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
       view.txt2{
         margin-bottom: 36upx;
         margin-top: 46upx;
       }
       text {
         margin-right: 27upx;
         line-height: 12px;
       }
     }
   }
 }
 </style>
 