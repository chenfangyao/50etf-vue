<template>
  <div class="wrap">
    <div class="wrap-2">
      <base-header has-back="1"></base-header>
      <div class="line1 textc1">证件信息已提交</div>
      <div class="line2 textc1">{{text1}}</div>
      <div class="line3">审核时间：</div>
      <div class="line3">工作日10:00-18:00：将在30分钟左右完成审核18:00后将在次日审核</div>
    </div>
    <div class="fixBottom">
      <btn-block txt="确定" @v-tap="goNext"></btn-block>
    </div>
  </div>
</template>

<script>
import btnBlock from '@/components/btnBlock.vue'
import { mapMutations } from 'vuex';

export default {
  components: { btnBlock },
  data(){
    return{
      text1: '',
    }
  },
  methods: {
    ...mapMutations(['setuserinfo']),
    goNext() {
      var options = {
        url: '/Sapi/User/info',
        method: 'GET',
      }
      this.$httpReq(options).then((res) => {
        if (res.status) {
          this.setuserinfo(res.data)
          this.$redirectTo({ url: '/mine' })
        }
      }).catch((err) => {
        console.error(err, '捕捉')
      })
    },

  },
  created() {
    this.type = this.$route.query.type
    if (this.type == 1) {
      this.text1 = '申请已通过'
    }
    else if (this.type == 2) {
      this.text1 = '申请已提交请耐心等待'
    }
    else if (this.type == 3) {
      this.text1 = '申请失败'
    }
  }
}
</script>

<style lang='scss' scoped>
div.wrap {
  min-height: 100vh;
}
div.wrap-2 {
  padding-left: 0.4rem;
  .line1 {
    font-size: 18px;
    color: rgba(51, 51, 51, 1);
    margin: 1.06rem 0 0.4rem;
    line-height: 18px;
  }
  .line2 {
    font-size: 30px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 30px;
    margin-bottom: 0.82rem;
  }
  .line3 {
    font-size: 14px;
    color: rgba(136, 136, 136, 1);
    margin-right: 1.29rem;
  }
}
div.fixBottom {
  position: absolute;
  bottom: 0.2rem;
  left: 0;
  right: 0;
}
</style>
