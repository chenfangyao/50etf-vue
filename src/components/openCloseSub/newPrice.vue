<template>
  <div class="wrap">
    <div v-show="onClose">
      <div class="entrustType">
        <span class="type commonStyle1">委托类型</span>
        <span class="commonStyle2">持仓笔数 {{fbcclength}}</span>
      </div>
      <div class="chooseType uni-flex">
        <div class="tabOpen uni-flex">
          <div @click="tapChange(false)">合并</div>
          <div @click="tapChange(true)">分笔</div>
          <div :class="['slider',{active:tabActive}]">{{tabActive?'分笔':'合并'}}</div>
        </div>
        <div class="chooseCount">
          <!-- <div v-show="!tabActive">{{maxprice.own_amount}}张</div> -->
          <div v-show="!tabActive" @click.self="showPopCheckbox">
            <!--<span class="txt">{{maxprice.enable_amount}}张</span>-->
            <span class="txt">{{sellnumber}}</span>
            <uni-icon type="arrowdown" size="24"></uni-icon>
            <van-popup v-model="showpop" position="bottom">
              <div >
                <div class="pop-title">
                  <!--<span class="cancelCheck" @click="cancelCheck">取消</span>-->
                  <span class="confirmCheck" @click="confirmCheck">确认</span>
                </div>
                <div style="height: 200px;overflow-y: auto">
                  <van-cell clickable >
                    <van-checkbox v-model='checked' @change="allcheckbox" />
                    <span style="position: absolute;left:40px;top:5px">全部</span>
                  </van-cell>
                  <van-checkbox-group v-model="result" >
                    <van-cell-group>
                      <!--<van-cell v-for="(item,index) in items" clickable :key="index" :title="item.name" @click="toggle(index)" style="position: relative">-->
                      <van-cell v-for="(item,index) in items" clickable :key="index" @click="toggle(index)" style="position: relative">
                        <van-checkbox :name="item.valueid" ref="checkboxes" />
                        <img :src="props.checked ? icon.active : icon.normal" slot="icon"
                             slot-scope="props">
                        <span style="position: absolute;left:40px;top:5px">{{item.name}}</span>
                        <span style="position: absolute;right:100px;top:5px">{{item.texts}}</span>
                      </van-cell>
                    </van-cell-group>
                  </van-checkbox-group>
                </div>
              </div>
            </van-popup>
          </div>
          <div v-show="tabActive" @click.self="showPickers">
            <span class="txt">{{pickerText}}</span>
            <uni-icon type="arrowdown" size="24"></uni-icon>
            <vue-pickers class="vuePickera"
                         :show="show1"
                         :columns="column1"
                         :defaultData="defaultData"
                         :selectData="pickerValueArray"
                         @cancel="onCancelPicker"
                         @confirm="onConirmPicker"></vue-pickers>
          </div>
        </div>
      </div>
    </div>
    <div class="commonStyle1">{{pricetitle}}</div>
    <div class="uni-flex line2">
      <div>
        <img
          @click="plusStep2(-1)"
          :class="!btn3_i?'opacityclass':''"
          src="../../assets/openCloseImg/minus.png"
        >
        <span class="newPrice" :class="{yellow1:onClose}">{{pricevalue}}</span>
        <img
          @click="plusStep2(1)"
          :class="!btn3_i?'opacityclass':''"
          src="../../assets/openCloseImg/plus.png"
        >
      </div>

      <div class="uni-flex btn3">
        <div
          v-for="(item,i) in btn3Arr"
          :key="i"
          :class="{active:btn3_i==i,yellow1:onClose}"
          :data-i="i"
          @click="changePriceType(i,item)"
        >{{item}}</div>
      </div>
    </div>
    <div class="uni-flex entrustCount">
      <div>
        <span class="commonStyle1">委托数量</span>
        <span class="useCount mr5 commonStyle2">{{onClose?'可用数':'最大可买'}}</span>
        <span class="commonStyle2" v-if="!onClose">{{maxprice.maxcounts||0}}</span>
        <span class="commonStyle2" v-else>{{maxprice.enable_amount}}</span>
      </div>
      <div v-show="!onClose">
        <span class="commonStyle2 mr5">当前持仓</span>
        <span class="commonStyle2">{{maxprice.own_amount}}</span>
      </div>
    </div>
    <div v-if="tabActive || !onClose" class="sliderPart uni-flex">
      <div>
        <img  @click="plusStep(-1)" src="../../assets/openCloseImg/minus.png">
        <span class="countxt">{{sliderVal}}</span>

        <img  @click="plusStep(1)" src="../../assets/openCloseImg/plus.png">
      </div>
      <div  class="sliderItem">
        <!-- <slider @change="slidering" :disabled="sliderdisable"  :max='maxprice.maxcounts' min='0' :value='sliderVal'
        backgroundColor='#e6e6e6' block-size='18' :activeColor="onClose?'#e6aa12':'#409de5'" />-->
         <el-slider v-model="sliderVal" @change="slidering" :max='maxprice.maxcounts' :disabled="sliderdisable" :min='0' :show-tooltip="false"></el-slider>
      </div>
    </div>
    <div v-else class="sliderPart uni-flex">
      <span class="countxt">{{stockamunt}}</span>
    </div>


  </div>
</template>
<script>
import uniIcon from "@/components/uni-icon.vue";
import { mapState, mapMutations } from 'vuex';
import { Slider  } from 'element-ui';
import { Popup,Cell, CellGroup,Checkbox, CheckboxGroup} from 'vant';
import vuePickers from 'vue-pickers'
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
  components: {
    uniIcon,
    vuePickers,
    [Slider.name]:Slider,
    [Popup.name]:Popup,
    [Cell.name]:Cell,
    [CellGroup.name]:CellGroup,
    [Checkbox.name]:Checkbox,
    [CheckboxGroup.name]:CheckboxGroup,
  },
  data() {
    return {
      tabActive: false,
      btn3Arr: ['市价', '限价'],
      btn3_i: 0,
      sliderVal: 0,
      pickerText: '', //选择的值,默认取lists的第一个值，从后端获取后初始化
      pickerValueArray: {}, //后端获得lists替换此处
      pricevalue: '',
      pricetitle: '最新价',
      fbcclength: '',
      hbcclength: '',
      sliderdisable: false,
      show1:false,
      column1:1,
      defaultData:[],
      showpop:false,
      checked:false,
      icon: {
        normal: '../../assets/holdingImg/unchecked.png',
        active: '../../assets/holdingImg/checked.png'
      },
      result: [],
      items: [],
      sellnumber:'全部'
    }
  },
  methods: {
    ...mapMutations(['setnewprice', 'setstockamunt', 'setenttype', 'setentrusttype', 'setfbccid', 'sethbfbcell',
      'setcctotalmoney'
    ]),
    cancelCheck(){
      this.showpop=false
    },
    // 合并分笔
    tapChange(val) {
      this.tabActive = val
      this.setentrusttype(val)
      this.sliderVal = 0
      if (val == true) {
        this.maxprice.maxcounts = 0.1
        var picktext = this.pickerText
        picktext = picktext.split(' ')
        picktext = picktext[1]
        if (picktext != undefined) {
          picktext = picktext.replace('张', '')
          this.maxprice.maxcounts = parseInt(picktext)
        }
        if (this.maxprice.maxcounts == 0.1) {
          this.sliderdisable = true
        }
      }
      this.$emit('hbfb-switch', {
        val: val,
        picktext: parseInt(picktext)
      })
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
      this.$emit('price-step', {
        num: this.sliderVal,
        price: this.pricevalue
      })
    },
    // 滑块滑动事件
    slidering() {
      this.setstockamunt(this.sliderVal)
      this.$emit('price-step', {
        num: this.sliderVal,
        price: this.pricevalue
      })
    },
    // 修改委托数量
    plusStep(i) {
      var maxtradecount = 0
      if (this.maxprice.maxcounts === NaN) {
        return
      }
      if (this.onClose) {
        maxtradecount = this.maxprice.enable_amount
      } else {
        maxtradecount = this.maxprice.maxcounts
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
      this.$emit('plus-step', {
        num: this.sliderVal,
        price: this.pricevalue
      })
    },
    plusStep2(i) {
      // 市价不允许修改
      if (this.btn3_i == 0) {
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
      this.$emit('plus-step', {
        num: this.sliderVal,
        price: this.pricevalue
      })
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    allcheckbox(e) {
      this.result = []
      if (e == true) {
        for (var i = 0; i < this.items.length; i++) {
          this.result[i] = this.items[i].valueid
        }
      }
    },
    onCancelPicker(){
      this.show1=false
    },
    // 新的分笔平仓确认
    onConirmPicker(val){
      this.show1=false
      this.setfbccid(val.select1.id)
      this.$emit('fb-num', parseInt(val.select1.value))
      this.pickerText = '笔 ' + parseInt(val.select1.index) + ' | ' + val.select1.value + '张'
      if (this.onClose) {
        this.maxprice.maxcounts = parseInt(val.select1.value[0])
      }
      this.sliderVal = 0
    },
    // 合并平仓确认
    confirmCheck(){
      this.sellnumber='共'+this.result.length+'笔'
      this.showpop=false
      var totalhynum = 0
      this.sethbfbcell(this.result)
      if(this.checked){
        this.setstockamunt(this.maxprice.enable_amount)
        totalhynum = this.maxprice.enable_amount
      }else{
        var allNum = 0
        for (var k = 0; k < this.result.length; k++) {
          var hynum = this.result[k].split('-')[0]
          allNum += parseInt(hynum)
        }
        this.setstockamunt(allNum)
        totalhynum = allNum
      }
      var hycsnum = this.maxbuy.volume_multiple
      var djmoney = parseFloat(totalhynum * parseFloat(this.pricevalue) * hycsnum)
      this.setcctotalmoney((djmoney + parseFloat(this.maxbuy.fee_money)).toFixed(2))
    },
    showPickers(){
      this.show1=true
    },
    showPopCheckbox(){
      this.showpop=true
    }
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
        this.pickerText = '0'
        // 设置默认分笔持仓id
        this.setfbccid(this.fbcclist[0] ? this.fbcclist[0].id : '')
        if (this.fbcclist[0]) {
          this.pickerText = '笔 1 | ' + this.fbcclist[0].enable_amount + '张'
          var data1=[]
          this.pickerValueArray={}
          for (var i = 0; i < this.fbcclist.length; i++) {
            var pickobj = {}
            var secpartcontent=this.fbcclist[i].enable_amount + '张'
            if(this.fbcclist[i].enable_amount==0){
              secpartcontent='不可卖'
            }
            pickobj.text = '第' + parseInt(i + 1) + '笔' + ' ' + secpartcontent
            pickobj.texts = secpartcontent
            pickobj.name = '第' + parseInt(i + 1) + '笔'
            pickobj.value = this.fbcclist[i].enable_amount.toString()
            pickobj.index = parseInt(i + 1)
            pickobj.valueid = this.fbcclist[i].enable_amount.toString()+'-'+this.fbcclist[i].id
            pickobj.id =this.fbcclist[i].id
            pickobj.checked = false
            data1.push(pickobj)
          }
          this.pickerValueArray.data1=data1
          this.items = data1
        }
      }
    },
    hbcclist(val) {
      if (val) { }
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
    this.pricetitle = this.btn3Arr[0]
  },
  computed: {
    ...mapState(['softconf', 'maxbuy','stockamunt'])
  }
}
</script>
<style lang="scss" scoped>
div.wrap {
  padding: 0.3rem 0.32rem;
  background-color: #fff;

  .commonStyle1 {
    font-size: 18px;
    font-weight: 700;
    color: rgba(69, 69, 69, 1);
    line-height: 0.5rem;
  }
  span.commonStyle2 {
    font-size: 12px !important;
    color: rgba(153, 153, 153, 1) !important;
    line-height: 16px;
    font-family: MicrosoftYaHei;
    font-weight: normal !important;
  }

  div.line2 {
    align-items: center;
    justify-content: space-between;
    margin: 0.29rem 0 0.48rem;

    .newPrice {
      font-size: 24px;
      line-height: 0.6rem;
      font-family: Arial-BoldMT;
      font-weight: bold;
      display: inline-block;
      width: 1.85rem;
      text-align: center;
      color: rgba(64, 157, 229, 1);
    }

    .yellow1 {
      color: #e6aa12;
    }

    div.btn3 {
      > div {
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

      > div.active {
        border-color: rgba(64, 157, 229, 1);
        color: #409de5;
      }

      > div.active.yellow1 {
        border-color: #e6aa12;
        color: #e6aa12;
      }

      > div:nth-child(2) {
        margin: 0 0.26rem;
      }
    }
  }

  div.entrustType {
    span {
      // font-size: 14px;
      // color: #707680;
    }

    span.type {
      margin-right: 5px;
    }
  }

  div.chooseType {
    justify-content: space-between;
    align-items: center;

    div.chooseCount {
      width: 3.4rem;
      height: 0.64rem;
      text-align: center;
      font-size: 14px;
      color: #848689;
      background: rgba(239, 239, 239, 1);

      uni-icon {
        vertical-align: middle;
      }

      border-radius: 0.08rem;

      div {
        line-height: 0.64rem;
      }

      span.txt {
        margin-right: 0.96rem;
      }
    }
  }

  div.tabOpen {
    width: 2.7rem;
    height: 0.64rem;
    border-radius: 15px;
    align-self: center;
    background-color: #efefef;
    margin: 0.3rem 0 0.3rem 1px;
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

    > div {
      flex-grow: 1;
      text-align: center;
      line-height: 0.6rem;
      font-size: 12px;
      color: #999;
    }

    > div.active.slider {
      left: 50%;
    }
  }

  div.entrustCount {
    font-size: 16px;
    line-height: 16px;
    justify-content: space-between;
    font-weight: bold;
    color: rgba(102, 102, 102, 1);

    span.useCount {
      margin-left: 7px;
    }

    span.mr5 {
      margin-right: 5px;
    }
  }

  div.sliderPart {
    justify-content: space-between;
    margin: 0.35rem 0 0.14rem;
    align-items: center;

    span.countxt {
      font-size: 24px;
      font-family: ArialMT;
      color: rgba(51, 51, 51, 1);
      line-height: 24px;
      width: 1.85rem;
      text-align: center;
      display: inline-block;
    }

    div.sliderItem {
      flex-grow: 1;
      padding-left: 0.5rem;
    }
  }

  img {
    width: 18px;
    height: 18px;
  }

  .opacityclass {
    opacity: 0;
  }
  .pop-title{
    height: 50px;
    background-color: white;
    position: relative;
    border-bottom: 1px solid #eeeeee;
    span{
      position: absolute;
      top:10px;
      font-size: 16px;
    }
  }
.confirmCheck{
  right:10px;
  color: #3b7bd5;
}
.cancelCheck{
  left:10px;
  color: #9c9c9c;
}
}

</style>

