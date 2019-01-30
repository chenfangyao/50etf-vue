<template>
  <div class="wrap">
    <base-header title="添加银行卡" has-back="1"></base-header>
    <div class="list-row">
      <span>开户银行</span>
      <div class="chooseCount">
        <div  @click.self="showpicker1" >
          {{pickerText}}
          <span v-if="editdefault" class="arrowDown"></span>
          <vue-pickers class="vuePickera"
                       :show="show1"
                       :columns="column1"
                       :defaultData="defaultData"
                       :selectData="pickerValueArray"
                       @cancel="onCancelPicker"
                       @confirm="onConfirm"></vue-pickers>
        </div>
      </div>
    </div>
    <div class="list-row">
      <span>开户省市</span>
      <div class="chooseCount">
        <div  @click.self="showpicker2" >
          {{pickerCityText}}
          <span v-if="editdefault" class="arrowDown"></span>
          <vue-pickers class="vuePickera"
                       :show="show2"
                       :columns="column2"
                       :defaultData="defaultData"
                       :link="link"
                       :selectData="pickerCityValueArray"
                       v-on:cancel="onCancelPicker"
                       v-on:confirm="onConfirm"
                       @touchend="touchEnd"></vue-pickers>
        </div>
      </div>
    </div>
    <div class="list-row">
      <span>开户支行</span>
      <div class="chooseCount">
        <div  @click.self="showpicker3" >
          {{pickSubBankText}}
          <span v-if="editdefault" class="arrowDown"></span>
          <vue-pickers class="vuePickera"
                       :show="show3"
                       :columns="column1"
                       :defaultData="defaultData"
                       :selectData="pickerSubBankArray"
                       @cancel="onCancelPicker"
                       @confirm="onConfirm"></vue-pickers>
        </div>

      </div>
    </div>
    <div class="list-row">
      <span>卡号</span>
      <input type="text" placeholder-class="_placeholder" v-model="bankcardid" placeholder="填写卡号">
    </div>
    <div class="list-row">
      <span>姓名</span>
      <input type="text" v-model="username" placeholder="填写姓名">
    </div>
    <div class="list-row">
      <span>身份证号</span>
      <input type="text" v-model="identifica" placeholder="填写收款银行身份证">
    </div>
    <div class="fixBottom">
      <btn-block :txt="btntxt" @v-tap="addbank"></btn-block>
    </div>
  </div>
</template>

<script>
  import btnBlock from '@/components/btnBlock.vue'
  // import mpvuePicker from '@/components/mpvuePicker.vue';
  import { Picker ,Popup } from 'vant';
  import { mapState, mapMutations } from 'vuex';
  import vuePickers from 'vue-pickers'

  export default {
    data() {
      return {
        pickerValueArray: {},
        pickerCityValueArray: {},
        pickerSubBankArray: {},
        pickerText: '',
        pickerCityText: '',
        pickSubBankText: '',
        bankid: '',
        identifica: '',
        username: '',
        bankcardid: '',
        tel: '',
        bankOrCity: 0,
        prov_cd: '',
        city_cd: '',
        sub_id: '',
        btntxt: '修改',
        editdefault: false,
        show1:false,
        show2:false,
        show3:false,
        column1: 1,
        column2: 2,
        defaultData:[],
        link: true, // 联动必须需要link 参数
        pickData1: {
          // 第一列的数据结构
          data1: [
            {
              text: 1999,
              value: 1999
            },
            {
              text: 2001,
              value: 2001
            },
            {
              text: 2002,
              value: 2002
            },
            {
              text: 2003,
              value: 2003
            },
            {
              text: 2004,
              value: 2004
            },
            {
              text: 2005,
              value: 2005
            },
          ]
        },
        pickData2: {
          // 第一列数据结构
          data1: [
            {
              text: '数码',
              value: 1999,
              id:1,
            },
            {
              text: '水果',
              value: 2001,
              id:1,
            },
            {
              text: '衣服',
              value: 2002,
              id:1,
            }
          ],
          // 第二列数据结构
          data2: {
            '1999': [
              {
                text: '相机',
                value: 101,
                id:1,
              },
              {
                text: '手机',
                value: 102,
                id:1,
              },
              {
                text: '音箱',
                value: 103,
                id:1,
              }
            ],
            '2001': [
              {
                text: '苹果',
                value: 104,
                id:1,
              },
              {
                text: '香蕉',
                value: 105,
                id:1,
              },
              {
                text: '西红柿',
                value: 106,
                id:1,
              }
            ],
            '2002': [
              {
                text: '衬衫',
                value: 107,
                id:1,
              },
              {
                text: '短裤',
                value: 108,
                id:1,
              },
              {
                text: '上衣',
                value: 109,
                id:1,
              }
            ]
          }
        },
      };
    },
    computed: mapState(['mobile', 'userinfo']),
    components: {
      btnBlock,
      vuePickers,
      [Picker.name]: Picker,
      [Popup .name]: Popup ,
    },
    methods: {
      showPicker() {
        if (this.editdefault) {
          this.$refs.typePick.show()
          this.bankOrCity = 0
        }
      },
      // 二级表单联动
      touchEnd(val,type){
        if(type==='provs'){
          this.getcitylist(0, val.value)
        }
      },
      showpicker1(){
        console.log(666)
        if (this.editdefault) {
          this.show1 = true
        }
      },
      showpicker2(){
        if (this.editdefault) {
          this.show2 = true
        }
      },
      showCityPicker() {
        if (this.editdefault) {
          this.$refs.cityPick.show()
          this.bankOrCity = 1
        }
      },
      showBankPicker() {
        if (this.editdefault) {
          this.$refs.subBankPick.show()
          this.bankOrCity = 2
        }
      },
      onCancelPicker() {
        this.show1=false
        this.show2=false
      },
      onConfirm(val) {
        console.log(777,val)
        // 开户银行
        // if (this.bankOrCity === 0) {
        //   this.pickerText = val.label
        //   this.bankid = val.value[0]
        //   this.getsubbanklist(this.bankid, this.prov_cd, this.city_cd)
        // }
        // // 开户省市
        // else if (this.bankOrCity === 1) {
        //   let oneIndex = val.index[0]
        //   let twoIndex = val.index[1]
        //   this.prov_cd = this.pickerCityValueArray[oneIndex].value
        //   this.city_cd = this.pickerCityValueArray[oneIndex].children[twoIndex].value
        //   this.pickerCityText = val.label
        //   this.getsubbanklist(this.bankid, this.prov_cd, this.city_cd)
        // }
        // // 开户支行
        // else if (this.bankOrCity === 2) {
        //   this.pickSubBankText = val.label
        //   this.sub_id = val.value
        // }
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
          if (res.status) {
            this.bankid = res.data.list[0].bank_id
            this.pickerText = res.data.list[0].name
            this.pickerValueArray = {}
            let data1=[]
            for (var i = 0; i < res.data.list.length; i++) {
              var newpickarry = {}
              newpickarry.text = res.data.list[i].name
              newpickarry.value = res.data.list[i].bank_id
              data1.push(newpickarry)
            }
            this.pickerValueArray.data1=data1
          } else {
            this.bankid = ''
            this.pickerText = '获取银行卡列表失败'
          }
        }).catch((err) => {
          // 请求失败的回调
          console.error(err, '捕捉')
        })
      },
      getprovlist(index) {
        var options = {
          url: '/Sapi/Ubank/province_list', //请求接口
          method: 'GET', //请求方法全部大写，默认GET
        }
        this.$httpReq(options).then((res) => {
          // 请求成功的回调
          // res为服务端返回数据的根对象
          console.log('省列表', res)
          if (res.status) {
            this.prov_cd = res.data.list[0].prov_cd
            // this.pickerCityValueArray = []
            // for (let i = 0; i < res.data.list.length; i++) {
            //   let provObj = {}
            //   provObj.label = res.data.list[i].prov_nm
            //   provObj.value = res.data.list[i].prov_cd
            //   provObj.children = []
            //   this.pickerCityValueArray.push(provObj)
            // }

            this.pickerCityValueArray = {}
            let data1=[]
            let data2={}
            for (let i = 0; i < res.data.list.length; i++) {
              let provObj = {}
              let keyvalue=res.data.list[i].prov_cd
              provObj.text = res.data.list[i].prov_nm
              provObj.value = res.data.list[i].prov_cd
              data1.push(provObj)
              // data2.keyvalue=[]
              data2[keyvalue]=res.data.list[i].prov_cd
            }
            this.pickerCityValueArray.data1=data1
            this.pickerCityValueArray.data2=data2
            // 加载第一个市
            this.getcitylist(0, this.pickerCityValueArray.data1[0].value)
          } else {

          }
        }).catch((err) => {
          // 请求失败的回调
          console.error(err, '捕捉')
        })
      },
      getcitylist(index, prov_cd) {
        var options = {
          url: '/Sapi/Ubank/city_list', //请求接口
          method: 'GET', //请求方法全部大写，默认GET
          data: {
            prov_cd: prov_cd
          }
        }
        this.$httpReq(options).then((res) => {
          // 请求成功的回调
          // res为服务端返回数据的根对象
          console.log('城市列表', res)
          if (res.status) {
            this.city_cd = res.data.list[0].city_cd
            var childlist = []
            for (let i = 0; i < res.data.list.length; i++) {
              let childObj = {}
              childObj.text = res.data.list[i].city_nm
              childObj.value = res.data.list[i].city_cd
              childlist.push(childObj)
            }
            this.pickerCityValueArray.data2[prov_cd] = childlist

          } else {

          }
        }).catch((err) => {
          // 请求失败的回调
          console.error(err, '捕捉')
        })
      },
      // 支行列表
      getsubbanklist(bank_id, prov_cd, city_cd) {
        var options = {
          url: '/Sapi/Ubank/sub_list', //请求接口
          method: 'GET', //请求方法全部大写，默认GET
          data: {
            bank_id: bank_id,
            prov_cd: prov_cd,
            city_cd: city_cd,
          }
        }
        this.$httpReq(options).then((res) => {
          // 请求成功的回调
          // res为服务端返回数据的根对象
          console.log('支行列表', res)
          if (res.status) {
            this.pickSubBankText = res.data.list[0].sub_name
            this.pickerSubBankArray = []
            this.sub_id = res.data.list[0].sub_id
            for (let i = 0; i < res.data.list.length; i++) {
              let bankObj = {}
              bankObj.label = res.data.list[i].sub_name
              bankObj.value = res.data.list[i].sub_id
              this.pickerSubBankArray.push(bankObj)
            }
            if (this.btntxt == '修改') {
              this.mybankinfo()
            }
          } else {

          }
        }).catch((err) => {
          // 请求失败的回调
          console.error(err, '捕捉')
        })
      },
      // 我的银行
      mybankinfo() {
        var options = {
          url: '/Sapi/Ubank/info', //请求接口
          method: 'GET', //请求方法全部大写，默认GET
        }
        this.$httpReq(options).then((res) => {
          // 请求成功的回调
          // res为服务端返回数据的根对象
          console.log('我的银行', res)
          if (res.status) {
            if (res.data.sub_id != undefined) {
              this.pickerText = res.data.bank_name
              this.pickerCityText = res.data.prov + '-' + res.data.city
              this.pickSubBankText = res.data.sub_name
              this.sub_id = res.data.sub_id
              this.username = res.data.cardname
              this.bankcardid = res.data.cardno
              this.identifica = res.data.idno
            }
          } else {

          }
        }).catch((err) => {
          // 请求失败的回调
          console.error(err, '捕捉')
        })
      },
      addbank() {
        if (this.btntxt == '保存') {
          this.$navigateTo({ url: '/pages/forget_pwd/tep2/tep2?type=1&sub_id=' + this.sub_id + '&identifica=' + this.identifica + '&username=' + this.username + '&bankcardid=' + this.bankcardid + '' })
        }
        this.btntxt = '保存'
        this.editdefault = true
      },
      pickChange(e) {
      }
    },
    onLoad(opt) {
      this.getbanklist()
      this.getprovlist()
      // this.mybankinfo()
      // this.username=this.userinfo.real_name
      if (opt.bankinfo == 0) {
        this.editdefault = true
        this.btntxt = '保存'
      }
    },
    created(){
      this.getbanklist()
      this.getprovlist()
      // if (opt.bankinfo == 0) {
      //   this.editdefault = true
      //   this.btntxt = '保存'
      // }
    }
  }
</script>


<style lang="scss" scoped>
  div.wrap {
  // background-color: #f5f5f5;
    min-height: 100vh;

  div.list-row {
    width:6.80rem;
    height:1.10rem;
    margin-left:.35rem;
    margin-top:.20rem;
    background: rgba(255, 255, 255, 1);
    border-bottom: 1px solid #eee;
    line-height:1.10rem;
    padding-left:.37rem;
    display: flex;
    align-items: center;
  > span:first-child {
    width: 65px;
    font-size: 15px;
    color: rgba(24, 28, 40, 1);
    margin-right:.44rem;
  }
  input {
    flex-grow: 1;
    margin-right: 2em;
    margin-bottom: 2px;
  }
  }
  div.fixBottom {
    position: fixed;
    bottom:.20rem;
    left: 0;
    right: 0;
  }
  }
  div.chooseCount {
    width:4.50rem;
    height:.50rem;
    line-height:.50rem;
  // text-align: center;
    font-size: 14px;
    font-family: Adobe Heiti Std R;
    font-weight: normal;
    color: rgba(102, 102, 102, 1);
    line-height: 43px;
  // background: rgba(239, 239, 239, 1);
    border-radius:.08rem;
    overflow: hidden;
    white-space: nowrap;
  span.arrowDown {
    display: inline-block;
    width:.17rem;
    border:.09rem solid #666;
    border-bottom-color: transparent;
    border-left-color: transparent;
    border-right-color: transparent;
  }



  }

</style>
