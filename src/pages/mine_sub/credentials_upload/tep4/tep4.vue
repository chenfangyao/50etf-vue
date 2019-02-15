<template>
  <div class="wrap">
    <base-header title="开户状态" has-back='1'></base-header>
    <div class="border1 black2">
		<div class='textview'><span>{{text1}}</span></div>
		<div class='textview'><span>{{text2}}</span></div>
		<div class='textview'><span>{{text3}}</span></div>
	</div>
    <div class="title">
		 <div class="fixView">
		      <btn-block :txt='btntext' @v-tap='doWhat'></btn-block>
		    </div>
	</div>
  </div>
</template>

<script>
import btnBlock from '@/components/btnBlock.vue'
export default {
  data() {
    return {
      text1: '您的实名认证申请已通过审核',
      text2: '无需重复提交，如有疑问请联系客服热线：',
      text3: '400-100-8959',
      btntext: '返回主页',
      type: ''
    };
  },
  components: { btnBlock },
  methods: {
    doWhat() {
      var url=''
      switch (this.type) {
        case 1:
          url = '/mine'
          break
        case 2:
          url = '/mine'
          break
        case 3:
          url = '/pages/mine_sub/credentials_upload/tep1/tep1'
          break
      }
      this.$navigateTo({ url:url })
    },
  },
  created() {
    this.type = this.$route.query.type
    if (this.type == 1) {
      this.text1 = '您的实名认证申请已通过审核'
      this.text2 = '无需重复提交，如有疑问请联系客服热线：'
    }
    else if (this.type == 2) {
      this.text1 = '您的实名认证申请已提交请耐心等待'
      this.text2 = '无需重复提交，如有疑问请联系客服热线：'
    }
    else if (this.type == 3) {
      this.text1 = '您的实名认证申请审核失败'
      this.text2 = '申请失败，如有疑问请联系客服热线：'
      this.btntext = '重新申请'
    }
  }
}
</script>

<style lang="scss" scoped>
div.border1 {
  border-bottom: 1px solid #ededed;
  height:2.80rem;
  padding-top: 0.1px;
  background-color: rgb(245, 245, 245);
  div.textview {
    text-align: center;
    margin-top:.30rem;
  }
  div:nth-child(1) {
    color: red;
    font-size: 18px;
  }
}
div.title {
  font-size: 16px;
  padding: 0 .43rem;
  color: rgba(24, 28, 40, 1);
  margin:.50rem 0 .34rem;
  line-height: 16px;
}
</style>

