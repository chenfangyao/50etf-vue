<template>
	<div class="wrap">
		<base-header title="设置" has-back='1'></base-header>
    <div class=' uni-flex' hover-class='self-hover' @click='go(1)'>
      <span>修改密码</span>
      <img src="../../../assets/arrow/r.png">
    </div>
    <!-- <div class='mb26 uni-flex' hover-class='self-hover' @click='go(2)'> -->
    <div class='mb26 uni-flex' hover-class='self-hover' >
      <span>关于</span>
      <div class="uni-flex verView">
        <span class="verTxt">版本号：10.1.38</span>
        <img src="../../../assets/arrow/r.png">
      </div>
    </div>
    <btn-block txt='退出登录' @v-tap='logOut'></btn-block>

	</div>
</template>

<script>
import btnBlock from '@/components/btnBlock.vue'
import { mapMutations } from 'vuex';

export default {
  data() {
    return {

    };
  },
  components: { btnBlock },
  methods: {
    ...mapMutations(['setuserinfo','setsid']),
    logOut() {
      this.$dialog.confirm({
        title: '退出登录',
        message: '是否确认退出登录？'
      }).then(() => {
        // on confirm
        this.sureloginout()
      }).catch(() => {
        // on cancel
      });
    },
    sureloginout() {
      var options = {
        url: '/Sapi/Login/loginout', //请求接口
        data: {
        }, //发送给服务端的数据
        method: 'POST', //请求方法全部大写，默认GET
      }
      this.$httpReq(options).then((res) => {
        // 请求成功的回调
        // res为服务端返回数据的根对象
        console.log(res)
        if (res.status == 1) {
          this.setuserinfo({})
          this.setsid('')
          this.$router.push({name:'index'})
        } else {
        }
      }).catch((err) => {
        // 请求失败的回调
        console.error(err,'捕捉')
      })
    },
    go(i) {
      let url = ''
      switch (i) {
        case 1: url = '/pages/mine_sub/change_password/change_password'
          break
        case 2: url = '/pages/mine_sub/about_us/about_us'
          break
      }
      this.$navigateTo({ url })
    }
  }
}
</script>

<style lang="scss" scoped>
div.wrap {
  height: 100vh;
  width: 100%;
  background-color: #f5f5f5;
  > div {
    height:.98rem;
    padding: 0 .26rem 0 .30rem;
    background-color: #fff;
    align-items: center;
    font-size: 15px;
    color: rgba(24, 28, 40, 1);
    justify-content: space-between;
    border-top: solid 1px #ededed;
    div.verView {
      align-items: center;
      span.verTxt {
        font-size: 14px;
        color: rgba(112, 118, 128, 1);
        margin-right:.20rem;
      }
    }
  }
  div.mb26 {
    margin-bottom:.26rem;
  }
  img {
    width:.26rem;

    height:.30rem;
  }
}
</style>
