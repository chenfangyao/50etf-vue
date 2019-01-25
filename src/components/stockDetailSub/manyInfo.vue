 <template>
   <div class='infoWrap uni-flex'>
     <div class="leftPart">
       <div class="line1">
         <div class="bigTxt">{{latestPrice}}</div>
         <div class="txt2">
           <span>{{priceChange}}</span>
           <span>{{priceChangeRate}}%</span>
         </div>
       </div>
     </div>
     <div class="middlePart">
       <div class="line1 uni-flex">
         <div class="uni-flex uni-column">
           <span>今&nbsp&nbsp&nbsp开</span>
           <span>最&nbsp&nbsp&nbsp高</span>
         </div>
         <div class="uni-flex uni-column">
           <span>{{openPrice=='NaN'?'--':openPrice}}</span>
           <span>{{highPrice=='NaN'?'--':highPrice}}</span>
         </div>
       </div>
     </div>
     <div class="rightPart">
       <div class="line1 uni-flex">
         <div class="uni-flex uni-column">
           <span>昨&nbsp&nbsp&nbsp收</span>
           <span>最&nbsp&nbsp&nbsp低</span>
           <span>成交额</span>

         </div>
         <div class="uni-flex uni-column">
           <span>{{preclosePrice}}</span>
           <span>{{lowPrice=='NaN'?'--':lowPrice}}</span>
           <span>{{dealAmount=='NaN'?'--':dealAmount}}亿</span>
         </div>
       </div>
     </div>
     <div class="abs">交易时间 09 : 15 - 11 : 30 13 : 00 - 15 : 00</div>
   </div>
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
div.infoWrap {
  border-bottom:.12rem solid #f5f5f5;
  padding:.35rem.28rem 0;
  justify-content: space-between;
  position: relative;
  div.abs {
    position: absolute;
    bottom:22upx;
    left:.30rem;
    font-size: 11px;
    color: rgba(153, 153, 153, 1);
  }
  .line2 {
    margin-top:.21rem;
  }
  .line1 {
    margin-top:.07rem;
  }
  div.uni-column:first-child {
    font-size: 13px;
    color: rgba(112, 118, 128, 1);
    margin-right:.21rem;
    line-height: 13px;
  }
  div.uni-column:last-child {
    font-size: 13px;
    font-family: ArialMT;
    color: rgba(24, 28, 40, 1);
    line-height: 13px;
  }
  div.uni-column > span {
    margin-bottom:.29rem;
  }

  div.leftPart {
    div.line1 {
      font-size: 12px;
      color: rgba(240, 95, 92, 1);
      line-height: 12px;
      margin-top: 0;
      div.bigTxt {
        font-size: 25px;
        line-height: 25px;
        font-weight: bold;
      }
      div.txt2 {
        //  margin-bottom:.36rem;
        //  margin-top:.46rem;
      }
      span {
        margin-right:.27rem;
        line-height: 12px;
      }
    }
  }
}
</style>
 