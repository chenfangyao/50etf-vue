<template>
	<view class="wrap">
		<base-header title='添加银行卡' has-back='1'></base-header>
    <view class='list-row'>
      <text>开户银行</text>
      <!-- <input type="text" placeholder-class='_placeholder' placeholder='选择开户银行' disabled @tap='showPicker'> -->
			<view class="chooseCount">
					<view @tap='showPicker'>
							{{pickerText}}
							<text class="arrowDown"></text>
					</view>
			</view>
    </view>
    <view class='list-row'>
      <text>卡号</text>
      <input type="number" placeholder-class='_placeholder' v-model="bankcardid" placeholder='填写卡号'>
    </view>
    <view class='list-row' >
      <text>姓名</text>
      <input type="text" v-model="username"  placeholder='填写姓名'>
    </view>
		<view class='list-row' >
			<text>身份证号</text>
			<input type="text" v-model="identifica"  placeholder='填写身份证号码'>
		</view>
    <view class="fixBottom">

     <btn-block txt='添加' @v-tap="addbank" ></btn-block>
    </view>
     <mpvue-picker themeColor="#007AFF" ref="typePick" mode="selector" :deepLength="1" :pickerValueDefault="[0]"
                      @onConfirm="onConfirm" @onCancel="onCancel" :picker-value-array="pickerValueArray"></mpvue-picker>
	</view>
</template>

<script>
import btnBlock from '@/components/btnBlock.vue'
import mpvuePicker from '@/components/mpvuePicker.vue';
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      pickerValueArray: [{ label: 1 },{ label: 2 },],
			pickerText:'中国工商银行',
			bankid:'',
			identifica:'',
			username:'',
			bankcardid:'',
			tel:''
    };
  },
	computed: mapState(['mobile']),
  components: { btnBlock ,mpvuePicker},
	methods:{
showPicker() {
      this.$refs.typePick.show()
    },
    onCancel(e) {
      // console.log(e)
    },
    onConfirm(val) {
			this.pickerText=val.label
			this.bankid=val.value[0]
    },
		getbanklist() {
				var options = {
						url: '/Sapi/Ubank/bank_list', //请求接口
						method: 'GET', //请求方法全部大写，默认GET
				}
				this.$httpReq(options).then((res) => {
						// 请求成功的回调
						// res为服务端返回数据的根对象
						console.log('银行卡列表', res)
						if(res.status){
							this.bankid=res.data.list[0].value
							this.pickerText=res.data.list[0].name
							this.pickerValueArray=[]
							for(var i=0;i<res.data.list.length;i++){
								var newpickarry={}
								newpickarry.label=res.data.list[i].name
								newpickarry.value=res.data.list[i].bank_id
								this.pickerValueArray.push(newpickarry)
							}
					// this.pickerValueArray=res.data.list
						}else{
							this.bankid=''
							this.pickerText='获取银行卡列表失败'
						}
				}).catch((err) => {
						// 请求失败的回调
						console.log(err)
				})
		},
		addbank(){
			uni.navigateTo({ url:'/pages/forget_pwd/tep2/tep2?type=1&bankid='+this.bankid+'&identifica='+this.identifica+'&username='+this.username+'&bankcardid='+this.bankcardid+'&tel='+this.mobile+'' })
			
		},
	},
	onLoad(){
		this.getbanklist()
	}
}
</script>


<style lang="scss" scoped>
view.wrap {
  background-color: #f5f5f5;
  min-height: 100vh;

  view.list-row {
    width: 750upx;
    height: 98upx;
    background: rgba(255, 255, 255, 1);
    border-top: 1px solid #eee;
    line-height: 98upx;
    padding-left: 37upx;
    display: flex;
    align-items: center;
    > text:first-child {
      width: 65px;
      font-size: 15px;
      color: rgba(24, 28, 40, 1);
      margin-right: 44upx;
    }
    input {
      flex-grow: 1;
      margin-right: 2em;
    }
  }
  view.fixBottom {
    position: fixed;
    bottom: 20upx;
    left: 0;
    right: 0;
  }
}
    view.chooseCount {
        width: 450upx;
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
</style>
