<template>
    <view class="wrap">
        <view class="title commonStyle1">{{pricetitle}}</view>
        <view class="uni-flex line2">
            <view class="newPrice">{{pricevalue}}</view>
            <view class="uni-flex btn3">
                <view v-for="(item,i) in btn3Arr" :key="i" :class="{active:btn3_i==i}" :data-i='i'
                      @tap='changePriceType(i,item)'>{{item}}
                </view>
            </view>
        </view>
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
                    <view v-show="!tabActive">{{maxprice.own_amount}}张</view>
                    <view v-show="tabActive" @tap='showPicker'>
                        {{pickerText}}
                        <text class="arrowDown"></text>
                    </view>
                </view>
            </view>
        </view>
        <view class="uni-flex entrustCount">
            <view>
                <text class="commonStyle1">委托数量</text>
                <text class="useCount mr5 commonStyle2">{{onClose?'可用数':'最大可买'}}</text>
                <text class="commonStyle2" v-if="!onClose">{{maxprice.maxcounts}}</text>
                <text class="commonStyle2" v-if="onClose">{{maxprice.enable_amount}}</text>
            </view>
            <view v-show="!onClose">
                <text class="commonStyle2 mr5">当前持仓</text>
                <text class="commonStyle2">{{maxprice.own_amount}}</text>
            </view>
        </view>
        <mpvue-picker themeColor="#007AFF" ref="typePick" mode="selector" :deepLength="1" :pickerValueDefault="[0]"
                      @onConfirm="onConfirm" @onCancel="onCancel" :picker-value-array="pickerValueArray"></mpvue-picker>
        <view class="sliderPart uni-flex">
            <view>
                <image @tap='plusStep(-1)' src='/static/openCloseImg/minus.png'></image>
                <text class="countxt">{{sliderVal}}</text>
                <image @tap='plusStep(1)' src='/static/openCloseImg/plus.png'></image>
            </view>
            <view class="sliderItem">
                <slider  @change="slidering" :max='maxprice.maxcounts' min='1' :value='sliderVal'
                        backgroundColor='#e6e6e6' block-size='18' activeColor='#409de5'/>
            </view>
        </view>
    </view>
</template>
<script>
    import mpvuePicker from '@/components/mpvuePicker.vue';

    export default {
        props: {
            onClose: {
                require: true
            },
            maxprice: {
                require: true
            },
            qrysingle:{
                require:true
            },
            hbcclist:{
                require:true
            },
            fbcclist:{
                require:true
            },
        },
        components: {mpvuePicker},
        data() {
            return {
                tabActive: false,
                btn3Arr: ['最新', '对手', '排队',],
                btn3_i: 0,
                sliderVal: 1,
                pickerText: '第一笔 13张',//选择的值,默认取lists的第一个值，从后端获取后初始化
                pickerValueArray: [//后端获得lists替换此处
                    {
                        label: '第1笔 13张',
                        value: 1
                    },
                    {
                        label: '第2笔 30张',
                        value: 2
                    },
                    {
                        label: '第3笔 3张',
                        value: 3
                    },
                    {
                        label: '第4笔 6张',
                        value: 4
                    }
                ],
                pricevalue: '',
                pricetitle: '最新价',
                fbcclength:'',
                hbcclength:'',
            }
        },
        methods: {
            tapChange(val) {
                this.tabActive = val
            },
            changePriceType(i,item) {
                this.btn3_i = i
                this.pricetitle=item
                switch(i){
                    case 0:
                        // 开仓
                        if(!this.onClose){
                            this.pricevalue=this.qrysingle.buyPrice1
                        }
                        // 平仓
                        else{
                            this.pricevalue=this.qrysingle.salePrice1
                        }
                        break;
                    case 1:
                        // 开仓
                        if(!this.onClose){
                            this.pricevalue=this.qrysingle.salePrice1
                        }
                        // 平仓
                        else{
                            this.pricevalue=this.qrysingle.salePrice1
                        }
                        break;
                    case 2:
                        // 开仓
                        if(!this.onClose){
                            this.pricevalue=this.qrysingle.buyPrice1
                        }
                        // 平仓
                        else{
                            this.pricevalue=this.qrysingle.salePrice1
                        }
                        break;
                }
                this.$emit('price-step' ,{num:this.sliderVal,price:this.pricevalue})
            },
            slidering(e) {
                this.sliderVal = e.detail.value
                // this.$emit('price-step' ,{num:this.sliderVal,price:this.pricevalue})
            },
            plusStep(i) {
                if(i==-1){
                    if(this.sliderVal==1){
                        return
                    }
                }else{
                    if(this.sliderVal>this.maxprice.maxcounts-1){
                        return
                    }
                }
                this.sliderVal=parseInt(this.sliderVal)
                this.sliderVal += i
                // this.$emit('plus-step' ,{num:this.sliderVal,price:this.pricevalue})
            },
            onCancel(e) {
                // console.log(e)
            },
            onConfirm(val) {
                this.pickerText = val.label
                if(this.onClose){
                    console.log(val.value[0])
                    this.maxprice.maxcounts=parseInt(val.value[0])
                }
                this.sliderVal=1
            },
            // 单列
            showPicker() {
                this.$refs.typePick.show()
            },
        },
        watch:{
            qrysingle(val){
                if(val){
                    this.pricevalue=this.qrysingle.buyPrice1
                }
            },
            fbcclist(val){
                if(val){
                    this.fbcclength=this.fbcclist.length
                }
            },
            hbcclist(val){
                if(val){
                    this.hbcclength=this.hbcclist.length
                    this.pickerValueArray=[]
                    var cc=[
                        {enable_amount:10},
                        {enable_amount:11},
                        {enable_amount:12},
                        {enable_amount:13},
                        {enable_amount:14},
                    ]
                    this.pickerText='第1笔 '+cc[0].enable_amount+'张'
                    for(var i=0;i<cc.length;i++){
                        var pickobj=new Object()

                        pickobj.label='第'+parseInt(i+1)+'笔'+' '+cc[i].enable_amount+'张'
                        pickobj.value=cc[i].enable_amount
                        this.pickerValueArray.push(pickobj)
                    }
                    // for(var i=0;i<this.hbcclist.length;i++){
                    //     var pickobj=new Object()
                    //     pickobj.label='第'+i+'笔'+' '+this.hbcclist[i].enable_amount+'张'
                    //     pickobj.value=this.hbcclist[i].enable_amount
                    //     this.pickerValueArray.push(pickobj)
                    // }
                    console.log('this.pickerValueArray',this.pickerValueArray)
                }
            }
        },
        created(){
        }
    }
</script>
<style lang="scss" scoped>
    view.wrap {
        padding: 30upx 32upx;
        background-color: #fff;
    .commonStyle1 {
        line-height: 16px;
        height: 16px;
        font-weight: bold;
        font-size: 16px;
        color: rgba(102, 102, 102, 1);
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
    view.newPrice {
        font-size: 24px;
        line-height: 60upx;
        font-family: Arial-BoldMT;
        font-weight: bold;
        color: rgba(64, 157, 229, 1);
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
        line-height: 30px;
    }
    > view.active {
        border-color: rgba(64, 157, 229, 1);
        color: #409de5;
    }
    > view:nth-child(2) {
        margin: 0 26upx;
    }
    }
    }
    view.entrustType {
    text {
        font-size: 14px;
        color: #707680;
    }
    text.type {
        margin-right: 5px;
        font-size: 16px;
        color: rgba(102, 102, 102, 1);
    }
    }
    view.chooseType {
        justify-content: space-between;
        align-items: center;
    view.chooseCount {
        width: 173upx;
        height: 50upx;
        line-height: 50upx;
        text-align: center;
        font-size: 12px;
        font-family: Adobe Heiti Std R;
        font-weight: normal;
        color: rgba(102, 102, 102, 1);
        line-height: 43px;
        background: rgba(239, 239, 239, 1);
        border-radius: 8upx;
    text.arrowDown {
        display: inline-block;
        width: 17upx;
        border: 9upx solid #666;
        border-bottom-color: transparent;
        border-left-color: transparent;
        border-right-color: transparent;
    }
    }
    }
    view.tabOpen {
        width: 180upx;
        height: 60upx;
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
        background-color: #409de5;
        color: #fff;
    }
    > view {
        flex-grow: 1;
        text-align: center;
        line-height: 60upx;
        font-size: 12px;
        color: #707680;
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
        width: 136upx;
        text-align: center;
        display: inline-block;
    }
    image {
        width: 18px;
        height: 18px;
    }
    uni-slider {
        margin: 0;
        margin-left: 150upx;
        margin-right: 10upx;
    }
    view.sliderItem {
        flex-grow: 1;
    }
    }
    }
</style>
