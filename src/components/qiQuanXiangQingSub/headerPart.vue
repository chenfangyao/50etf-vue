
<template>
  <div class="bgfff black2">
    <div class="uni-flex">
      <div class="leftPart">
        <div class="leftTop uni-flex">
          <div class="price">{{resObj.latestPrice}}</div>
          <div class="flexColumn">
            <span>{{resObj.priceChange}}</span>
            <span>{{priceChangeRate}}</span>
          </div>
        </div>
        <div class="leftBottom uni-flex">
          <div class="time">交易时间：</div>
          <div class="flexColumn">
            <span>AM 09:30-11:30</span>
            <span>PM 01:00-02:57</span>
          </div>
        </div>
      </div>
      <div class="rightPart">
        <div class="uni-flex rightTop">
          <div>
            <span>今开</span>
            <span class="textc1">{{resObj.openPrice}}</span>
          </div>
          <div>
            <span>昨收</span>
            <span class="textc1">{{resObj.preclosePrice}}</span>
          </div>
        </div>
        <div class="uni-flex rightBottom">
          <div>
            <span>成交量</span>
            <span class="textc1">{{resObj.dealAmount}}</span>
          </div>
          <div>
            <span>持仓量</span>
            <span class="textc1">{{resObj.openInterest}}</span>
          </div>
        </div>
      </div>
    </div>
    <header-part-detail :isshowDetail="isshowDetail" :resdata='resObj' :hynumbers='hynumbers' :hyinfos='hyinfos'></header-part-detail>
    <div class="arrowImg" @click="showPartDetail">
      <img v-show="isshowDetail" src="../../assets/arrow/t.png">
      <img v-show="!isshowDetail" src="../../assets/arrow/b.png">
      <!-- <img v-show="!isshowDetail" src="/assets/arrow/t.png"> -->
    </div>

  </div>
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
div.leftPart {
  margin:.30rem  0  0 .26rem;
  div.leftTop {
    color: rgba(240, 95, 92, 1);
    font-family: MicrosoftYaHei;
    .price {
      font-size: 32px;
      font-weight: bold;
      line-height: 32px;
      margin-right:.04rem;
    }
  }
  .flexColumn {
    display: flex;
    flex-direction: column;
    span {
      font-size: 13px;
      line-height: 15px;
      font-weight: 400;
    }
  }
  div.leftBottom {
    color: #a8a8a8;
    margin-top:.20rem;
    font-size: 10px;
    div.time {
      align-self: flex-start;
      line-height: 16px;
      font-size: 10px;
    }
    span {
      font-size: 12px;
    }
  }
}
div.rightPart {
  flex-grow: 1;
  margin:.30rem .85rem  0 .80rem;
  div.uni-flex {
		view:nth-child(1){
			margin-left: 10px;
		}
    justify-content: space-between;
		span {
			font-size: 14px;
		}
  }
  .rightBottom > div,
  .rightTop > div {
    margin-bottom:.12rem;
    span:first-child {
      font-size: 14px;
      color: #828597;
      line-height: 12px;
    }
    span:last-child {
      font-size: 14px;
      font-family: ArialMT;
      color: rgba(24, 28, 40, 1);
    }
    display: flex;
    flex-direction: column;
  }
}
div.arrowImg {
  text-align: center;
  img {
    width:.29rem;
    height:.17rem;
  }
}
</style>
