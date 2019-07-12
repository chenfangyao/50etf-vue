<template>
  <div class="root-el">
    <div v-show="onClose" class="wraper">
      <div class="tabOpen uni-flex black2">
        <div v-vtap="{method: tapChange , params: false}">
          <span :class="{active:!entrusttype}">合并</span>
        </div>
        <div v-vtap="{method: tapChange , params: true}">
          <span :class="{active:entrusttype}">分笔</span>
        </div>
      </div>
      <div class="chooseType uni-flex">
        <div class="entrustType">
          <span class="type commonStyle1 textc1">委托类型</span>
          <span class="commonStyle2 textc1">持仓笔数 {{fbcclength}}</span>
        </div>
        <div class="chooseCount black1">
          <!-- <div v-show="!entrusttype">{{maxprice.own_amount}}张</div> -->
          <div v-show="!entrusttype" v-vtap.self="{method:showPopCheckbox}" class="flex1">
            <span class="chooseTxt textc1">{{sellnumber}}</span>
            <s-icon :icon-class="'select_down' | atNightIcon" v-vtap.self="{method:showPopCheckbox}"></s-icon>
            <!-- 合并弹窗 -->
            <van-popup v-model="showpop" position="bottom">
              <div>
                <div class="pop-title uni-flex">
                  <span v-vtap="{method:cancelCheck}">取消</span>
                  <span v-vtap="{method:confirmCheck}">确定</span>
                </div>
                <div>
                  <van-cell class="vanCell">
                    <span :class="{itemCheck:allChecked }">全部</span>
                    <van-checkbox checked-color="#ff3838" icon-size="22px" shape="square" v-model="allChecked" @click="checkAll2" @change="allcheckbox" />
                  </van-cell>
                  <van-checkbox-group v-model="result" @change="toggle">
                    <van-cell-group>
                      <van-cell v-for="(item,index) in items" :key="index" class="vanCell">
                        <div :class="{itemCheck:result.indexOf(item.valueid)!=-1 }">
                          <span>{{item.name}}</span>
                          <span>{{item.texts}}</span>
                        </div>
                        <van-checkbox checked-color="#ff3838" shape="square" icon-size="22px" :name="item.valueid" ref="checkboxes" />
                      </van-cell>
                    </van-cell-group>
                  </van-checkbox-group>
                </div>
              </div>
            </van-popup>
          </div>
          <div v-show="entrusttype" v-vtap.self="{method:showPickers}" class="flex1">
            <span class="chooseTxt textc1">{{pickerText}}</span>
            <s-icon :icon-class="'select_down' | atNightIcon" v-vtap.self="{method:showPickers}"></s-icon>
          </div>
          <vue-pickers class="vuePickera" :show="show1" :columns="1" :selectData="pickerValueArray" @cancel="onCancelPicker" @confirm="onConirmPicker"></vue-pickers>
        </div>
      </div>
    </div>
    <div class="commonStyle1 textc1">{{pricetitle}}</div>
    <div class="uni-flex line2">
      <div>
        <s-icon v-vtap="{method: plusStep2 , params: -1}" :class="!btn3_i?'opacityclass':''" icon-class="adjust_lower"></s-icon>
        <span class="newPrice">{{pricevalue}}</span>
        <s-icon v-vtap="{method: plusStep2 , params: 1}" :class="!btn3_i?'opacityclass':''" icon-class="adjust_jia"></s-icon>
      </div>

      <div class="uni-flex btn3">
        <div v-for="(item,i) in btn3Arr" :key="i" :class="{active:btn3_i==i}" :data-i="i" v-vtap="{method: changePriceType , arr: [ i,item]}">{{item}}</div>
      </div>
    </div>
    <div class="uni-flex entrustCount">
      <div>
        <span class="commonStyle1 textc1">委托数量</span>
        <span class="useCount mr5 commonStyle2">{{onClose?'可用数':'最大可买'}}</span>
        <span class="commonStyle2" v-if="!onClose">{{maxprice.maxcounts||0}}</span>
        <span class="commonStyle2" v-else>{{maxprice.enable_amount}}</span>
      </div>
      <!-- <div v-show="!onClose">重要 先隐藏!!
        <span class="commonStyle2 mr5">当前持仓</span>
        <span class="commonStyle2 textc1">{{maxprice.own_amount}}</span>
      </div> -->
    </div>
    <div v-if="entrusttype || !onClose" class="sliderPart uni-flex">
      <div class="imgbtn uni-flex">
        <div class="hasImg" v-vtap="{method: plusStep , params: -1}">
          <s-icon :icon-class="'adjust_lower' | atNightIcon"></s-icon>
        </div>
        <span class="countxt textc1">{{sliderVal}}</span>
        <div class="hasImg" v-vtap="{method: plusStep , params: 1}">
          <s-icon :icon-class="'adjust_jia' | atNightIcon"></s-icon>
        </div>
      </div>
      <div class="sliderItem">
        <el-slider v-model="sliderVal" @change="slidering" :max="maxprice.maxcounts || 0" :disabled="sliderdisable" :min="0" :show-tooltip="false"></el-slider>
      </div>
    </div>
    <div v-else class="sliderPart uni-flex">
      <span class="countxt textc1">{{stockamunt}}</span>
    </div>
  </div>
</template>
<script>
import uniIcon from "@/components/uni-icon.vue";
import { mapState, mapMutations } from 'vuex';
import { Slider } from 'element-ui';
import { Popup, Cell, CellGroup, Checkbox, CheckboxGroup } from 'vant';
import vuePickers from '@/components/vue-pickers'
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
      // require: true
    },
  },
  components: {
    uniIcon,
    vuePickers,
    [Slider.name]: Slider,
    [Popup.name]: Popup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
  },
  data() {
    return {
      btn3Arr: ['市价', '限价'],
      btn3_i: 0,
      sliderVal: 0,
      pickerText: '', //选择的值,默认取lists的第一个值，从后端获取后初始化
      pickerValueArray: {}, //后端获得lists替换此处
      pricevalue: '',
      pricetitle: '市价',
      fbcclength: '',
      hbcclength: '',
      sliderdisable: false,
      show1: false,
      showpop: false,
      allChecked: false,
      allChecked2: false,//此为替身，配合使用，解决bug
      icon: {
        normal: '../../assets/holdingImg/unchecked.png',
        active: '../../assets/holdingImg/checked.png'
      },
      result: [],
      items: [],
      sellnumber: '全部'
    }
  },
  methods: {
    ...mapMutations(['setnewprice', 'setstockamunt', 'setenttype', 'setentrusttype', 'setfbccid', 'sethbfbcell',
      'setcctotalmoney'
    ]),
    cancelCheck() {
      this.showpop = false
    },
    // 合并分笔
    tapChange(val) {
      this.setentrusttype(val)
      this.sliderVal = 0
      if (val == true) {//分笔的情况
        this.setcctotalmoney(0)
        this.maxprice.maxcounts = 0.1
        var picktext = this.pickerText.split(' ')[3]
        this.setstockamunt(0)
        if (picktext != undefined) {
          picktext = picktext.replace('张', '')
          this.maxprice.maxcounts = parseInt(picktext)
        }
        if (this.maxprice.maxcounts == 0.1) {
          this.sliderdisable = true
        }
      } else {//合并的情况
        this.setstockamunt(this.maxprice.enable_amount)
        this.sellnumber = '全部'
        var totalmoney = this.maxprice.enable_amount * this.maxprice.volume_multiple * this.pricevalue + parseFloat(this.maxprice.fee_money)
        this.setcctotalmoney(totalmoney.toFixed(2))
      }
      this.$emit('hbfb-switch', {
        val: val,
        picktext: parseInt(picktext)
      })
    },
    // 最新、对手、排队价格 市价限价
    changePriceType(i, item) {
      this.btn3_i = i
      this.pricetitle = item
      if (i == 0 && this.switchObj.ent_price_type == 0) {
        this.setenttype(2)//市价
      } else {
        this.setenttype(1)//其他
      }
      if (this.switchObj.ent_price_type == 1) {
        switch (i) {
          // 最新价
          case 0:
            this.pricevalue = this.qrysingle.latestPrice
            this.setnewprice(this.pricevalue)
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
        num: this.sliderVal || this.stockamunt,
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
      this.$emit('price-step', {
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
      this.$emit('price-step', {
        num: this.sliderVal ||this.stockamunt,
        price: this.pricevalue
      })
    },
    toggle() {
      if (this.result.length == this.items.length) this.allChecked = true
      else this.allChecked = false
    },
    allcheckbox() {
      if (this.allChecked) {
        this.result = this.items.map(item => item.valueid)
      } else if (this.allChecked2) {
        this.result = []
      }
      this.allChecked2 = false
    },
    checkAll2() {
      this.allChecked2 = true
    },
    onCancelPicker() {
      this.show1 = false
    },
    // 新的分笔平仓确认
    onConirmPicker(val) {
      this.show1 = false
      this.setfbccid(val.select1.id)
      this.$emit('fb-num', parseInt(val.select1.value))
      this.pickerText = '笔 ' + parseInt(val.select1.index) + ' | ' + val.select1.value + ' 张'
      if (this.onClose) {
        this.maxprice.maxcounts = parseInt(val.select1.value[0])
      }
      this.sliderVal = 0
    },
    // 合并平仓确认
    confirmCheck() {
      this.sellnumber = '共' + this.result.length + '笔'
      this.showpop = false
      var totalhynum = 0
      this.sethbfbcell(this.result)
      if (this.allChecked) {
        this.setstockamunt(this.maxprice.enable_amount)
        totalhynum = this.maxprice.enable_amount
      } else {
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
    showPickers() {
      this.show1 = true
    },
    showPopCheckbox() {
      this.showpop = true
    }
  },
  watch: {
    qrysingle(val) {
      if (val) {
        if (this.switchObj.ent_price_type == 1) {
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
        // 设置默认分笔持仓id
        this.entrusttype && this.setfbccid(this.fbcclist[0] ? this.fbcclist[0].id : '')
        this.pickerText = '0'
        if (this.fbcclist[0]) {
          // 把分笔持仓第一笔持仓数量带到默认持仓数量中
          this.$emit('fb-num', parseInt(val[0].enable_amount))
          this.pickerText = '笔 1 | ' + this.fbcclist[0].enable_amount + '张'
          var data1 = []
          this.pickerValueArray = {}
          for (var i = 0; i < this.fbcclist.length; i++) {
            var pickobj = {}
            var secpartcontent = this.fbcclist[i].enable_amount + '张'
            if (this.fbcclist[i].enable_amount == 0) {
              secpartcontent = '不可卖'
            }
            pickobj.text = '第' + parseInt(i + 1) + '笔' + ' ' + secpartcontent
            pickobj.texts = secpartcontent
            pickobj.name = '第' + parseInt(i + 1) + '笔'
            pickobj.value = this.fbcclist[i].enable_amount.toString()
            pickobj.index = parseInt(i + 1)
            pickobj.valueid = this.fbcclist[i].enable_amount.toString() + '-' + this.fbcclist[i].id
            pickobj.id = this.fbcclist[i].id
            pickobj.checked = false
            data1.push(pickobj)
          }
          this.pickerValueArray.data1 = data1
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
    },
    'maxprice.maxcounts': {
      handler(val) {
        this.sliderdisable = val == 0
      },
    },
  },
  created() {
    // 初始化将合并分笔置空
    this.sethbfbcell([])
    switch (this.switchObj.ent_price_type) {
      case 0:
        this.btn3Arr = ['市价', '限价']
        break
      case 1:
        this.btn3Arr = ['最新', '对手', '排队']
        break
      case 2:
        this.btn3Arr = ['限价']
        break
    }
    this.pricetitle = this.btn3Arr[0]
    // 合并平仓默认设置卖出全部
    setTimeout(() => {
      if (this.onClose == true && this.entrusttype == false) {
        this.setstockamunt(this.maxprice.enable_amount)
        var totalmoney = this.maxprice.enable_amount * this.maxprice.volume_multiple * this.pricevalue + parseFloat(this.maxprice.fee_money)
        this.setcctotalmoney(totalmoney.toFixed(2))
      }
    }, 2000)
  },

  computed: {
    ...mapState(['switchObj', 'maxbuy', 'stockamunt', 'entrusttype'])
  }
}
</script>
<style lang="scss" scoped>
div.root-el {
  padding: 0.1rem 0.32rem 0.3rem;
  background-color: #fff;
  .wraper {
    margin-bottom: 10px;
  }
  .commonStyle1 {
    font-size: 14px;
    font-weight: 600;
    color: #333;
  }
  span.commonStyle2 {
    font-size: 12px !important;
    color: rgba(153, 153, 153, 1);
    line-height: 16px;

    font-weight: normal !important;
  }

  div.line2 {
    align-items: center;
    justify-content: space-between;
    margin: 0.1rem 0 0.48rem;

    .newPrice {
      font-size: 24px;
      line-height: 0.6rem;

      font-weight: bold;
      display: inline-block;
      width: 1.85rem;
      text-align: center;
      color: $primary1;
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
        border-color: $primary1;
        color: $primary1;
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
  .chooseTxt {
    color: #333;
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
      .s-icon {
        width: 10px;
        height: 10px;
      }
      div.flex1 {
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
      uni-icon {
        vertical-align: middle;
      }

      border-radius: 0.08rem;

      div {
        line-height: 0.64rem;
      }
    }
  }

  div.tabOpen {
    width: 2.7rem;
    // height: 0.64rem;
    align-self: center;
    margin-bottom: 0.2rem;
    > div {
      flex-grow: 1;
      line-height: 0.6rem;
      font-size: 14px;
      color: #999;
    }
    .active {
      color: $primary1;
      border-bottom: solid 2px $primary1;
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
    .imgbtn {
      align-items: center;
      transform: translateX(-10px);
      .hasImg {
        height: 26px;
        padding: 4px 10px;
      }
    }
    span.countxt {
      font-size: 24px;

      color: rgba(51, 51, 51, 1);
      line-height: 24px;
      width: 1.75rem;
      text-align: center;
      display: inline-block;
    }
    /deep/ .el-slider__button {
      border-color: $primary1;
    }
    /deep/ .el-slider__bar {
      background-color: $primary1;
    }
    div.sliderItem {
      flex-grow: 1;
      padding-left: 0.5rem;
      padding-right: 1px;
    }
  }

  .s-icon {
    width: 18px;
    height: 18px;
  }

  .opacityclass {
    opacity: 0;
  }
  .pop-title {
    height: 50px;
    background-color: white;
    border-bottom: 1px solid #eeeeee;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.37rem;
    color: #666;

    & + div {
      //合并弹窗title底下的选项元素包裹
      height: 200px;
      overflow-y: auto;
      .vanCell {
        > div {
          //组件内自加的一级
          display: flex;
          justify-content: space-between;
          color: #666;
        }
        .itemCheck {
          color: $primary1;
        }
      }
    }
    span {
      font-size: 16px;
      &:last-child {
        color: $primary1;
      }
    }
  }
}
</style>

