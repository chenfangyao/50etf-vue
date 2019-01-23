<template>
    <view class="wrap">
        
        <view v-show="onClose">
            <view class="entrustType">
                <text class="type commonStyle1">委托类型</text>
                <text class="commonStyle2">持仓笔数 {{fbcclength}}</text>
            </view>
            <view class="chooseType uni-flex">
                <view class="tabOpen uni-flex">
                    <view @tap='tapChange(false)'>合并</view>
                    <view @tap='tapChange(true)'>分笔</view>
                    <view :class="['slider',{active:tabActive}]">{{tabActive?'分笔':'合并'}}</view>
                </view>
                <view class="chooseCount">
                    <!-- <view v-show="!tabActive">{{maxprice.own_amount}}张</view> -->
										<view v-show="!tabActive" @tap='showPicker'>
										  <text class="txt">{{maxprice.own_amount}}张</text>
										    <uni-icon type="arrowdown" size="24"></uni-icon>
										</view>
                    <view v-show="tabActive" @tap='showPicker'>
                      <text class="txt">{{pickerText}}</text>
                        <uni-icon type="arrowdown" size="24"></uni-icon>
                    </view>
                </view>
            </view>
        </view>
        <view class=" commonStyle1">{{pricetitle}}</view>
        <view class="uni-flex line2">
        <view>
            <!-- <image v-if="btn3_i" @tap="plusStep2(-1)" class='opacityclass' src='/static/openCloseImg/minus.png'></image> -->
            <image  @tap="plusStep2(-1)" :class="!btn3_i?'opacityclass':''" src='/static/openCloseImg/minus.png'></image>
            <text class=" newPrice" :class="{yellow1:onClose}">{{pricevalue}}</text>
            <image  @tap="plusStep2(1)" :class="!btn3_i?'opacityclass':''" src='/static/openCloseImg/plus.png'></image>
        </view>

            <view class="uni-flex btn3">
                <view v-for="(item,i) in btn3Arr" :key="i" :class="{active:btn3_i==i,yellow1:onClose}" :data-i='i'
                      @tap='changePriceType(i,item)'>{{item}}
                </view>
            </view>
        </view>
        <view class="uni-flex entrustCount">
            <view>
                <text class="commonStyle1">委托数量</text>
                <text class="useCount mr5 commonStyle2">{{onClose?'可用数':'最大可买'}}</text>
                <text class="commonStyle2" v-if="!onClose">{{maxprice.maxcounts||0}}</text>
                <text class="commonStyle2" v-else>{{maxprice.enable_amount}}</text>
            </view>
            <view v-show="!onClose">
                <text class="commonStyle2 mr5">当前持仓</text>
                <text class="commonStyle2">{{maxprice.own_amount}}</text>
            </view>
        </view>
        <mpvue-picker themeColor="#007AFF" ref="typePick" mode="selector" :deepLength="1" :pickerValueDefault="[0]"
                      @onConfirm="onConfirm" @onCancel="onCancel" :picker-value-array="pickerValueArray"></mpvue-picker>
				<mpvue-checkbox themeColor="#007AFF" ref="typeCheckbox"   :pickerValueDefault="[0]"
											@onConfirm="onConfirms" @onCancel="onCancel" :picker-value-array="items"></mpvue-checkbox>
        <view v-if="tabActive || !onClose" class="sliderPart uni-flex">
            <view>
                <image @tap='plusStep(-1)' src='/static/openCloseImg/minus.png'></image>
                <text class="countxt">{{sliderVal}}</text>
                <image @tap='plusStep(1)' src='/static/openCloseImg/plus.png'></image>
            </view>
            <view class="sliderItem">
                <slider  @change="slidering" @changing="sliders" :max='maxprice.maxcounts' min='0' :value='sliderVal'
                        backgroundColor='#e6e6e6' block-size='18' :activeColor="onClose?'#e6aa12':'#409de5'"/>
            </view>
        </view>
    </view>
</template>
<script>
import mpvuePicker from '@/components/mpvuePicker.vue';
import mpvueCheckbox from '@/components/mpvueCheckbox.vue';
import uniIcon from "@/components/uni-icon.vue";
import { mapState, mapMutations } from 'vuex';


export default {
  props: {
    onClose: {
      require: true
    },
    maxprice: {
      require: true
    },
    qrysingle: {
      require: true
    },
    hbcclist: {
      require: true
    },
    fbcclist: {
      require: true
    },
  },
  components: { mpvuePicker, uniIcon , mpvueCheckbox },
  data() {
    return {
      tabActive: false,
      btn3Arr: ['市价', '限价'],
      btn3_i: 0,
      sliderVal: 0,
      pickerText: '',//选择的值,默认取lists的第一个值，从后端获取后初始化
      pickerValueArray: [],//后端获得lists替换此处
      pricevalue: '',
      pricetitle: '最新价',
      fbcclength: '',
      hbcclength: '',
      items:[]
    }
  },
  methods: {
    ...mapMutations(['setnewprice', 'setstockamunt', 'setenttype', 'setentrusttype', 'setfbccid','sethbfbcell','setcctotalmoney']),
    // 合并分笔
    tapChange(val) {
      this.tabActive = val
      this.setentrusttype(val)
      this.sliderVal = 0
      if (val == true) {
        var picktext = this.pickerText
        picktext = picktext.split(' ')
        picktext = picktext[1]
        picktext = picktext.replace('张', '')
        this.maxprice.maxcounts = parseInt(picktext)
      }
      this.$emit('hbfb-switch', { val: val, picktext: parseInt(picktext) })
    },
    // 最新、对手、排队价格
    changePriceType(i, item) {
      this.btn3_i = i
      this.pricetitle = item
      this.setenttype = i + 1
      if (this.softconf.ent_price_type == 0) {
        switch (i) {
          // 最新价
          case 0:
            // 开仓
            if (!this.onClose) {
              this.pricevalue = this.qrysingle.latestPrice
              this.setnewprice(this.pricevalue)
            }
            // 平仓
            else {
              this.pricevalue = this.qrysingle.latestPrice
              this.setnewprice(this.pricevalue)
            }
            break;
          // 对手价
          case 1:
            // 开仓
            if (!this.onClose) {
              this.pricevalue = this.qrysingle.salePrice1
              this.setnewprice(this.pricevalue)
            }
            // 平仓
            else {
              this.pricevalue = this.qrysingle.buyPrice1
              this.setnewprice(this.pricevalue)
            }
            break;
          // 排队价
          case 2:
            // 开仓
            if (!this.onClose) {
              this.pricevalue = this.qrysingle.buyPrice1
              this.setnewprice(this.pricevalue)
            }
            // 平仓
            else {
              this.pricevalue = this.qrysingle.salePrice1
              this.setnewprice(this.pricevalue)
            }
            break;
        }
      } else {
        if (i == 0) {
          this.pricevalue = this.qrysingle.latestPrice
        }
      }
      this.$emit('price-step', { num: this.sliderVal, price: this.pricevalue })
    },
    // 滑块滑动事件
    slidering(e) {
      this.sliderVal = e.detail.value
      this.setstockamunt(this.sliderVal)
      this.$emit('price-step', { num: this.sliderVal, price: this.pricevalue })
    },
    sliders(e) {
      this.sliderVal = e.detail.value
    },
    // 修改委托数量
    plusStep(i) {
			var maxtradecount=0
			if(this.onClose){
				maxtradecount=this.maxprice.enable_amount
			}else{
				maxtradecount=this.maxprice.maxcounts
			}
			
      if (i == -1) {
        if (this.sliderVal == 0) {
          return
        }
      } else {
        if (this.sliderVal > this.maxprice.maxcounts - 1) {
        // if (this.sliderVal > maxtradecount - 1) {
          return
        }
      }
      this.sliderVal = parseInt(this.sliderVal)
      this.sliderVal += i
      this.setstockamunt(this.sliderVal)
      this.$emit('plus-step', { num: this.sliderVal, price: this.pricevalue })
    },
    plusStep2(i) {
      // 市价不允许修改
      if (this.btn3_i == 0 ) {
        return
      }
      if (i == -1) {
        if (this.pricevalue == 0.0001) {
          return
        }
      }
      var val = Math.round(this.pricevalue * 10000) + Number(i)
      this.pricevalue = Number(val / 10000).toFixed(4)
      this.setnewprice(this.pricevalue)
      this.$emit('plus-step', { num: this.sliderVal, price: this.pricevalue })
    },

    onCancel(e) {
      // console.log(e)
    },
    onConfirm(val) {
      this.setfbccid(val.id[0])
      this.pickerText = '笔 ' + (parseInt(val.index) + 1) + ' | ' + val.value + '张'
      if (this.onClose) {
        this.maxprice.maxcounts = parseInt(val.value[0])
      }
      this.sliderVal = 0
      this.$emit('fb-num', parseInt(val.value[0]))
    },
		// checkbox确认
		onConfirms(val) {
			// 全卖调用合并持仓接口
			var totalhynum=0
			
			this.sethbfbcell(val)
			if(val[0]=='all'){
				this.setstockamunt(this.maxprice.enable_amount)
				totalhynum=this.maxprice.enable_amount
			}
			// 循环调用分笔持仓接口
			else{
				var tempArr=[]
				var allNum=0
				for(var k=0;k<val.length;k++){
					var hynum=val[k].split('-')[0]
					allNum+=parseInt(hynum)
				}
				this.setstockamunt(allNum)
				totalhynum=allNum
			}
			var hycsnum=this.maxbuy.volume_multiple
			var djmoney = parseFloat(totalhynum * parseFloat(this.pricevalue) * hycsnum)
			this.setcctotalmoney((djmoney + parseFloat(this.maxbuy.fee_money)).toFixed(2))
		},
    // 单列
    showPicker() {
			if(this.tabActive){
				 if (this.pickerValueArray[0]) {
				  this.$refs.typePick.show()
				}
			}else{
				this.$refs.typeCheckbox.show()
			}
     
    },
  },
  watch: {
    qrysingle(val) {
      if (val) {
        if (this.softconf.ent_price_type == 0) {
          switch (this.btn3_i) {
            // 最新价
            case 0:
              // 开仓
              if (!this.onClose) {
                this.pricevalue = this.qrysingle.latestPrice
                this.setnewprice(this.pricevalue)
              }
              // 平仓
              else {
                this.pricevalue = this.qrysingle.latestPrice
                this.setnewprice(this.pricevalue)
              }
              break;
            // 对手价
            case 1:
              // 开仓
              if (!this.onClose) {
                this.pricevalue = this.qrysingle.salePrice1
                this.setnewprice(this.pricevalue)
              }
              // 平仓
              else {
                this.pricevalue = this.qrysingle.buyPrice1
                this.setnewprice(this.pricevalue)
              }
              break;
            // 排队价
            case 2:
              // 开仓
              if (!this.onClose) {
                this.pricevalue = this.qrysingle.buyPrice1
                this.setnewprice(this.pricevalue)
              }
              // 平仓
              else {
                this.pricevalue = this.qrysingle.salePrice1
                this.setnewprice(this.pricevalue)
              }
              break;
          }
        } else {
          if (this.btn3_i == 0) {
            this.pricevalue = this.qrysingle.latestPrice
            this.setnewprice(this.pricevalue)
          }
        }
      }
    },
    fbcclist(val) {
      if (val) {
        this.fbcclength = this.fbcclist.length
        this.hbcclength = this.hbcclist.length
        this.pickerValueArray = []
        this.pickerText = '0'
        // 设置默认分笔持仓id
        this.setfbccid(this.fbcclist[0] ? this.fbcclist[0].id : '')
        if (this.fbcclist[0]) {
          this.pickerText = '笔 1 | ' + this.fbcclist[0].enable_amount + '张'
          for (var i = 0; i < this.fbcclist.length; i++) {
            var pickobj = new Object()
            pickobj.label = '第' + parseInt(i + 1) + '笔' + ' ' + this.fbcclist[i].enable_amount + '张'
            pickobj.name = '第' + parseInt(i + 1) + '笔'
            pickobj.value = this.fbcclist[i].enable_amount.toString()
            pickobj.index = parseInt(i + 1)
            pickobj.id = this.fbcclist[i].id
            pickobj.checked=false
            this.pickerValueArray.push(pickobj)

          }
          this.items=[]
            var firtArr=[{
                value: 'All',
                name: '全部',
                id: '000',
								checked:false
            },]
            // this.items=this.items.concat(firtArr).concat(this.pickerValueArray)
            this.items=this.pickerValueArray
        }
      }
    },
    hbcclist(val) {
      if (val) {
      }
    },
    onClose(val) {
      // 切换委托数量重置为1
      this.sliderVal = 0
    }
  },
  created() {
		// 初始化将合并分笔置空
		this.sethbfbcell([])
    if (this.softconf.ent_price_type == 0) {
      this.btn3Arr = ['最新价', '对手', '排队']
    } else {
      this.btn3Arr = ['市价', '限价']
    }
		this.pricetitle=this.btn3Arr[0]
  },
  computed: {
    ...mapState(['softconf','maxbuy'])
  }
}
</script>
<style lang="scss" scoped>
view.wrap {
  padding: 30upx 32upx;
  background-color: #fff;
  .commonStyle1 {
    font-size: 18px;
    font-weight: 700;
    color: rgba(69, 69, 69, 1);
    line-height: 50upx;
  }
  text.commonStyle2 {
    font-size: 12px !important;
    color: rgba(153, 153, 153, 1) !important;
    line-height: 16px;
    font-family: MicrosoftYaHei;
    font-weight: normal !important;
  }
  view.line2 {
    align-items: center;
    justify-content: space-between;
    margin: 29upx 0 48upx;
    .newPrice {
      font-size: 24px;
      line-height: 60upx;
      font-family: Arial-BoldMT;
      font-weight: bold;
      display: inline-block;
      width: 185upx;
      text-align: center;
      color: rgba(64, 157, 229, 1);
    }
    .yellow1 {
      color: #e6aa12;
    }
    view.btn3 {
      > view {
        width: 50px;
        height: 30px;
        background: rgba(245, 245, 245, 0);
        border: 1px solid rgba(153, 153, 153, 1);
        border-radius: 15px;
        text-align: center;
        font-size: 12px;
        color: rgba(153, 153, 153, 1);
        line-height: 29px;
      }
      > view.active {
        border-color: rgba(64, 157, 229, 1);
        color: #409de5;
      }
      > view.active.yellow1 {
        border-color: #e6aa12;
        color: #e6aa12;
      }
      > view:nth-child(2) {
        margin: 0 26upx;
      }
    }
  }
  view.entrustType {
    text {
      // font-size: 14px;
      // color: #707680;
    }
    text.type {
      margin-right: 5px;
    }
  }
  view.chooseType {
    justify-content: space-between;
    align-items: center;
    view.chooseCount {
      width: 340upx;
      height: 64upx;
      text-align: center;
      font-size: 14px;
      color: #848689;
      background: rgba(239, 239, 239, 1);
      uni-icon {
        vertical-align: middle;
      }
      border-radius: 8upx;
      view {
        line-height: 64upx;
      }
      text.txt {
        margin-right: 96upx;
      }
    }
  }
  view.tabOpen {
    width: 270upx;
    height: 64upx;
    border-radius: 15px;
    align-self: center;
    background-color: #efefef;
    margin: 30upx 0 30upx 1px;
    position: relative;
    .slider {
      position: absolute;
      width: 52%;
      border-radius: 15px;
      bottom: 0;
      top: 0;
      left: -1%;
      transition: left 80ms;
      background-color: #e6aa12;
      color: #fff;
    }
    > view {
      flex-grow: 1;
      text-align: center;
      line-height: 60upx;
      font-size: 12px;
      color: #999;
    }
    > view.active.slider {
      left: 50%;
    }
  }
  view.entrustCount {
    font-size: 16px;
    line-height: 16px;
    justify-content: space-between;
    font-weight: bold;
    color: rgba(102, 102, 102, 1);
    text.useCount {
      margin-left: 7px;
    }
    text.mr5 {
      margin-right: 5px;
    }
  }
  view.sliderPart {
    justify-content: space-between;
    margin: 35upx 0 14upx;
    align-items: center;
    text.countxt {
      font-size: 24px;
      font-family: ArialMT;
      color: rgba(51, 51, 51, 1);
      line-height: 24px;
      width: 185upx;
      text-align: center;
      display: inline-block;
    }

    view.sliderItem {
      flex-grow: 1;
      padding-left: 30upx;
    }
  }
  image {
    width: 18px;
    height: 18px;
  }
  .opacityclass {
    opacity: 0;
  }
}
</style>
