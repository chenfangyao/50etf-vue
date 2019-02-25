<template>
  <div class="wrap">
    <base-header title="设置" has-back="1"></base-header>
    <div class="item1 uni-flex black2 textc1" v-hover-class="'self-hover'" v-vtap="{method: go , params: 1}">
      <span>修改密码</span>
      <img src="../../../assets/arrow/r.png">
    </div>
    <div class="item1 uni-flex black2 textc1" v-hover-class="'self-hover'">
      <span>夜间模式</span>
      <van-switch size="20px" active-color='#409de5'  :value="atNight" @input="changeTheme"/>
    </div>
    <div class="mb26 item1 uni-flex black2 textc1" v-hover-class="'self-hover'">
      <span>关于</span>
      <div class="uni-flex verView">
        <span class="verTxt textc2">版本号：1.0</span>
        <!-- <img src="../../../assets/arrow/r.png"> -->
      </div>
    </div>
    <btn-block txt="退出登录" @v-tap="logOut"></btn-block>
  </div>
</template>

<script>
import btnBlock from '@/components/btnBlock.vue'
import { mapMutations,mapState } from 'vuex';
import { Switch } from 'vant';
export default {
  data() {
    return {
    };
  },
  components: { btnBlock ,[Switch.name]:Switch},
  computed:mapState(['atNight']),
  methods: {
    ...mapMutations(['setuserinfo', 'setsid','setatNight']),
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
        if (res.status == 1) {
          localStorage.removeItem('etfSid')
          localStorage.removeItem('userinfo')
          this.setuserinfo({})
          this.setsid('')
          this.$router.push({ name: 'index' })
        } else {
        }
      }).catch((err) => {
        // 请求失败的回调
        console.error(err, '捕捉')
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
    },
    changeTheme(val){
       this.$dialog.confirm({
        title: '切换皮肤',
        message: '确认切换皮肤吗？'
      }).then(() => {
        // on confirm
        this.setatNight(val)
        location.reload()
      }).catch(() => {
        // on cancel
      });
    }
  },
  
}
</script>

<style lang="scss" scoped>
div.wrap {
  height: 100vh;
  width: 100%;
  background-color: #f5f5f5;
  div.item1 {
    background-color: #fff;
    color: rgba(24, 28, 40, 1);
    border-top: solid 1px #ededed;
  }
  > div {
    height: 0.98rem;
    padding: 0 0.26rem 0 0.3rem;
    align-items: center;
    font-size: 15px;
    justify-content: space-between;
    div.verView {
      align-items: center;
      span.verTxt {
        font-size: 14px;
        color: rgba(112, 118, 128, 1);
        margin-right: 0.2rem;
      }
    }
  }
  div.mb26 {
    margin-bottom: 0.26rem;
  }
  img {
    width: 0.26rem;

    height: 0.3rem;
  }
}
</style>
