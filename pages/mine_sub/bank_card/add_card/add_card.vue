<template>
	<view class="wrap">
		<base-header title='添加银行卡' has-back='1'></base-header>
    <view class='list-row'>
      <text>开户银行</text>
			<view class="chooseCount">
					<view @tap='showPicker'>
							{{pickerText}}
							<text v-if="editdefault" class="arrowDown"></text>
					</view>
			</view>
    </view>
		<view class='list-row'>
			<text>开户省市</text>
			<view class="chooseCount">
					<view @tap='showCityPicker'>
							{{pickerCityText}}
							<text v-if="editdefault" class="arrowDown"></text>
					</view>
			</view>
		</view>
		<view class='list-row'>
			<text>开户支行</text>
			<view class="chooseCount">
					<view @tap='showBankPicker'>
							{{pickSubBankText}}
							<text v-if="editdefault" class="arrowDown"></text>
					</view>
			</view>
		</view>
    <view class='list-row'>
      <text>卡号</text>
      <input type="text" placeholder-class='_placeholder'  v-model="bankcardid" placeholder='填写卡号'>
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

     <btn-block :txt='btntxt' @v-tap="addbank" ></btn-block>
    </view>
     <mpvue-picker themeColor="#007AFF" ref="typePick" mode="selector" :deepLength="1" :pickerValueDefault="[0]"
                      @onConfirm="onConfirm" @onCancel="onCancel" :picker-value-array="pickerValueArray"></mpvue-picker>
		<mpvue-picker themeColor="#007AFF" ref="cityPick" mode="multiLinkageSelector" :loadType='1' :deepLength="2" :pickerValueDefault="[0]"
											@onConfirm="onConfirm" @pick-change='pickChange' @onCancel="onCancel" :picker-value-array="pickerCityValueArray"></mpvue-picker>
		<mpvue-picker themeColor="#007AFF" ref="subBankPick" mode="selector" :loadType='0' :deepLength="1" :pickerValueDefault="[0]"
											@onConfirm="onConfirm"  @onCancel="onCancel" :picker-value-array="pickerSubBankArray"></mpvue-picker>
	</view>
</template>

<script>
import btnBlock from '@/components/btnBlock.vue'
import mpvuePicker from '@/components/mpvuePicker.vue';
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      pickerValueArray: [],
			pickerCityValueArray:[],
			pickerSubBankArray:[],
			pickerText:'',
			pickerCityText:'',
			pickSubBankText:'',
			bankid:'',
			identifica:'',
			username:'',
			bankcardid:'',
			tel:'',
			bankOrCity:0,
			prov_cd:'',
			city_cd:'',
			sub_id:'',
			btntxt:'修改',
			editdefault:false
    };
  },
	computed: mapState(['mobile']),
    components: { btnBlock ,mpvuePicker},
	methods:{
    showPicker() {
		if(this.editdefault){
			this.$refs.typePick.show()
						this.bankOrCity=0
		}  
    },
		showCityPicker(){
			if(this.editdefault){
				this.$refs.cityPick.show()
				this.bankOrCity=1
			}	
		},
		showBankPicker(){
			if(this.editdefault){
				this.$refs.subBankPick.show()
				this.bankOrCity=2
			}	
		}, 
    onCancel(e) {
      // console.log(e)
    },
    onConfirm(val) {
			console.log()
     // 开户银行
			if(this.bankOrCity===0){
				this.pickerText=val.label
				this.bankid=val.value[0]
				this.getsubbanklist(this.bankid,this.prov_cd,this.city_cd)
			}
			// 开户省市
			else if(this.bankOrCity===1){
				let oneIndex=val.index[0]
				let twoIndex=val.index[1]
				this.prov_cd=this.pickerCityValueArray[oneIndex].value
				this.city_cd=this.pickerCityValueArray[oneIndex].children[twoIndex].value
				this.pickerCityText=val.label
				this.getsubbanklist(this.bankid,this.prov_cd,this.city_cd)
			}
			// 开户支行
			else if(this.bankOrCity===2){
				this.pickSubBankText=val.label
				this.sub_id=val.value
				}
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
							this.bankid=res.data.list[0].bank_id
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
		getprovlist(index){
            var options = {
                url: '/Sapi/Ubank/province_list', //请求接口
                method: 'GET', //请求方法全部大写，默认GET
            }
            this.$httpReq(options).then((res) => {
                // 请求成功的回调
                // res为服务端返回数据的根对象
                console.log('省列表', res)
                if(res.status){
									   this.prov_cd=res.data.list[0].prov_cd
                                       this.pickerCityValueArray=[]
										 for(let i=0;i<res.data.list.length;i++){
											 let provObj={}
											 provObj.label=res.data.list[i].prov_nm
											 provObj.value=res.data.list[i].prov_cd
											 provObj.children=[]
											 this.pickerCityValueArray.push(provObj)
										 }	
										    // 加载第一个市
												this.getcitylist(0,this.pickerCityValueArray[0].value)
                }else{
                    
                }
            }).catch((err) => {
                // 请求失败的回调
                console.log(err)
            })
		},
		getcitylist(index,prov_cd){
				var options = {
						url: '/Sapi/Ubank/city_list', //请求接口
						method: 'GET', //请求方法全部大写，默认GET
						data:{
							prov_cd:prov_cd
						}
				}
				this.$httpReq(options).then((res) => {
						// 请求成功的回调
						// res为服务端返回数据的根对象
						console.log('城市列表', res)
						if(res.status){
							  this.city_cd=res.data.list[0].city_cd
			          var childlist=[]
			          for(let i=0;i<res.data.list.length;i++){
			          	let childObj={}
			          	childObj.label=res.data.list[i].city_nm
			          	childObj.value=res.data.list[i].city_cd
									childlist.push(childObj)
			          }
								this.pickerCityValueArray[index].children=childlist	
								this.pickerCityText=this.pickerCityValueArray[0].label+'-'+this.pickerCityValueArray[0].children[0].label
								this.getsubbanklist(this.bankid,this.prov_cd,this.city_cd)
						}else{
								
						}
				}).catch((err) => {
						// 请求失败的回调
						console.log(err)
				})
		},
		// 支行列表
		getsubbanklist(bank_id,prov_cd,city_cd){
				var options = {
						url: '/Sapi/Ubank/sub_list', //请求接口
						method: 'GET', //请求方法全部大写，默认GET
						data:{
							bank_id: bank_id,
               prov_cd: prov_cd,
               city_cd: city_cd,
						}
				}
				this.$httpReq(options).then((res) => {
						// 请求成功的回调
						// res为服务端返回数据的根对象
						console.log('支行列表', res)
						if(res.status){
			         this.pickSubBankText=res.data.list[0].sub_name
							 this.pickerSubBankArray=[]
                              this.sub_id=res.data.list[0].sub_id
							 for(let i=0;i<res.data.list.length;i++){
								 let bankObj={}
								 bankObj.label=res.data.list[i].sub_name
								 bankObj.value=res.data.list[i].sub_id
								 this.pickerSubBankArray.push(bankObj)
							 }
							 console.log(333,this.pickerSubBankArray)
						}else{
								
						}
				}).catch((err) => {
						// 请求失败的回调
						console.log(err)
				})
		},
		// 我的银行
		mybankinfo(){
				var options = {
						url:'/Sapi/Ubank/info', //请求接口
						method: 'GET', //请求方法全部大写，默认GET
				}
				this.$httpReq(options).then((res) => {
						// 请求成功的回调
						// res为服务端返回数据的根对象
						console.log('我的银行', res)
						if(res.status){
							if(res.data.sub_id!=undefined){
								this.pickerText=res.data.bank_name
								this.pickerCityText=res.data.prov+'-'+res.data.city
								this.pickSubBankText=res.data.sub_name
								this.sub_id=res.data.sub_id
								this.username=res.data.cardname
								this.bankcardid=res.data.cardno
								this.identifica=res.data.idno
							}					
						}else{
								
						}
				}).catch((err) => {
						// 请求失败的回调
						console.log(err)
				})
		},
		addbank(){
			if(this.btntxt=='保存'){
				uni.navigateTo({ url:'/pages/forget_pwd/tep2/tep2?type=1&sub_id='+this.sub_id+'&identifica='+this.identifica+'&username='+this.username+'&bankcardid='+this.bankcardid+'' })
			}
			this.btntxt='保存'
			this.editdefault=true	
		},
		pickChange(e){
		}
	},
	onLoad(opt){
		this.getbanklist()
		this.getprovlist()
		this.mybankinfo()
		if(opt.bankinfo==0){
			this.editdefault=true
			this.btntxt='保存'
		}
	}
}
</script>


<style lang="scss" scoped>
view.wrap {
  // background-color: #f5f5f5;
  min-height: 100vh;
  margin-top: 20px;

  view.list-row {
    width: 680upx;
    height: 110upx;
	margin-left: 35upx;
	margin-top: 20upx;
    background: rgba(255, 255, 255, 1);
    border-bottom: 1px solid #eee;
    line-height: 110upx;
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
        // text-align: center;
        font-size: 12px;
        font-family: Adobe Heiti Std R;
        font-weight: normal;
        color: rgba(102, 102, 102, 1);
        line-height: 43px;
        // background: rgba(239, 239, 239, 1);
        border-radius: 8upx;
				overflow: hidden;
				white-space: nowrap;
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
