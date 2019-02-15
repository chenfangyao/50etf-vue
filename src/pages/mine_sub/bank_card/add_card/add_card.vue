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
  import { Picker ,Popup } from 'vant';
  import { mapState, mapMutations } from 'vuex';
  import vuePickers from '@/components/vue-pickers'

  export default {
    data() {
      return {
        pickerValueArray: {},
        pickerCityValueArray: {},
        pickerSubBankArray: {},
        pickerText: '',
        pickerCityText: '北京-北京',
        pickSubBankText: '',
        bankid: '',
        identifica: '',
        username: '',
        bankcardid: '',
        tel: '',
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
        popindex:0,
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
      // 二级表单联动
      touchEnd(val,type){
        if(type==='provs'){
          // this.getcitylist(0, val.value)
        }
      },
      showpicker1(){
        this.popindex=0
        if (this.editdefault) {
          this.show1 = true
        }
      },
      showpicker2(){
        this.popindex=1
        if (this.editdefault) {
          this.show2 = true
        }
      },
      showpicker3(){
        this.popindex=2
        if (this.editdefault) {
          this.show3 = true
        }
      },
      onCancelPicker() {
        this.show1=false
        this.show2=false
        this.show3=false
      },
      onConfirm(val) {
        switch (this.popindex){
          case 0:
            this.pickerText=val.select1.text
            this.bankid=val.select1.value
            this.getsubbanklist(this.bankid, this.prov_cd, this.city_cd)
                break
          case 1:
            this.pickerCityText=val.select1.text+'-'+val.select2.text
            this.prov_cd=val.select1.value
            this.city_cd=val.select2.value
            this.getsubbanklist(this.bankid, this.prov_cd, this.city_cd)
            break
          case 2:
            var text=val.select1.text.replace(this.pickerText,'')
            text=text.replace('股份有限公司','')
            this.pickSubBankText=text
            this.sub_id = val.select1.value
            break
        }
        this.show1=false
        this.show2=false
        this.show3=false
      },
      getbanklist() {
        var options = {
          url: '/Sapi/Ubank/bank_list', //请求接口
          method: 'GET', //请求方法全部大写，默认GET
        }
        this.$httpReq(options).then((res) => {
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
          if (res.status) {
            this.prov_cd = res.data.list[0].prov_cd
            this.pickerCityValueArray = {}
            let data1=[]
            let data2={}
            for (let i = 0; i < res.data.list.length; i++) {
              let provObj = {}
              let keyvalue=res.data.list[i].prov_cd
              provObj.text = res.data.list[i].prov_nm
              provObj.value = res.data.list[i].prov_cd
              data1.push(provObj)
              data2[keyvalue]=keyvalue
            }
            this.pickerCityValueArray.data1=data1
            this.pickerCityValueArray.data2=data2
            // 默认设置第一个市为北京
            this.pickerCityValueArray.data2['110']=[{text:'北京',value:'1100'}]
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
            this.getsubbanklist(this.bankid, this.prov_cd, this.city_cd)
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
          if (res.status) {
            var subBankText=res.data.list[0].sub_name
            subBankText=subBankText.replace(this.pickerText,'')
            subBankText=subBankText.replace('股份有限公司','')
            this.pickSubBankText = subBankText
            let data1 = []
            this.sub_id = res.data.list[0].sub_id
            this.pickerSubBankArray={}
            for (let i = 0; i < res.data.list.length; i++) {
              let bankObj = {}
              var text=res.data.list[i].sub_name
              text=text.replace(this.pickerText,'')
              text=text.replace('股份有限公司','')
              bankObj.text = text
              bankObj.value = res.data.list[i].sub_id
              data1.push(bankObj)
            }
            this.pickerSubBankArray.data1=data1
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
          // this.$navigateTo({ url: '/pages/forget_pwd/tep2/tep2?type=1&sub_id=' + this.sub_id + '&identifica=' + this.identifica + '&username=' + this.username + '&bankcardid=' + this.bankcardid + '' })
          this.$router.push({
            path:'/pages/forget_pwd/tep2/tep2',
            query:({
              type:1,
              sub_id:this.sub_id,
              identifica:this.identifica,
              username:this.username,
              bankcardid:this.bankcardid
            })
          })
        }
        this.btntxt = '保存'
        this.editdefault = true
      },
      pickChange(e) {
      }
    },
    // onLoad(opt) {
    //   this.getbanklist()
    //   this.getprovlist()
    //   // this.mybankinfo()
    //   // this.username=this.userinfo.real_name
    //   if (opt.bankinfo == 0) {
    //     this.editdefault = true
    //     this.btntxt = '保存'
    //   }
    // },
    created(){
      this.getbanklist()
      this.getprovlist()
      // this.getsubbanklist('102', '110', '1000')
      // if (opt.bankinfo == 0) {
      //   this.editdefault = true
      //   this.btntxt = '保存'
      // }
    }
  }
</script>


<style lang="scss" scoped>
div#app.at-night div.list-row{
  background-color: #181c28;
  border-color:#0f131f;
  >span:first-child{
    color: #fff;
  }
  input{
  background-color: #181c28;
  color: #fff

  }
}
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
    line-height:1.0rem;
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
