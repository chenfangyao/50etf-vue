<template>
	<div class="wrap">
		<base-header has-back='1'></base-header>
    <div class="title textc1">实名认证</div>
    <div class="container">

      <input-item placeholderTxt='输入您的姓名'  @now-blur='handleBlur' v-model="uName"></input-item>
        <input-item placeholderTxt='输入您的身份证号'  @now-blur='handleBlur' v-model="IDcard"></input-item>
        <input-item placeholderTxt='输入您的手机号'  @now-blur='handleBlur' isTel='1' v-model="telnum"></input-item>
			<err-tip :err-class='showErr' :tip-content='tipContent'></err-tip>

      <submit-btn btnTxt='完成' @v-tap='handleNext' :verify-ok='verifyYes'></submit-btn>

    </div>
	</div>
</template>

<script>
import submitBtn from '@/components/commonResgLog/submitBtn.vue'
import inputItem from '@/components/commonResgLog/inputItem.vue'
import errTip from '@/components/commonResgLog/errtip.vue'

export default {
  data() {
    return {
      verifyYes: true,
      IDcard:'',
      uName:'',
	    showErr:false,
	    tipContent: '您输入的身份证信息有误',
      telnum:'',
    };
  },
  components: { submitBtn, inputItem, errTip },
  methods: {
    handleNext() {
			if(this.$validata(this.IDcard,3)!=1){
					this.showErr=true
					this.tipContent=this.$validata(this.IDcard,3)
					return
      }else if(this.$validata(this.uName)!=1){
					this.showErr=true
					this.tipContent=this.$validata(this.uName)
					return
      }else if(this.$validata(this.telnum,2)!=1){
					this.showErr=true
					this.tipContent=this.$validata(this.telnum,2)
					return
      }
      
			this.showErr=false
      this.$navigateTo({ url:'/pages/mine_sub/credentials_upload/tep2/tep2' ,query:{username:this.uName,IDcard:this.IDcard,telnum:this.telnum}})
    },
    handleBlur() {
      this.verifyYes = true
    },
  }
}
</script>

<style lang="scss" scoped>
div.title {
  font-size: 28px;
  font-weight: 500;
  margin: 0 0 .88rem .32rem;
  color: #333;
}
div.container {
  margin: 0 .55rem;
}
</style>
