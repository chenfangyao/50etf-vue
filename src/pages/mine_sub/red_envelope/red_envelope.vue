<template>
  <div class="wrap22">
    <base-header title="我的红包" has-back="1"></base-header>
    <img class="bg" :src="img1">
    <!-- <img class="bg" src="../../../assets/mineImg/hong_bao_bg.jpg"> -->
    <div class="logo">
      <img src="../../../assets/mineImg/logo.png">
    </div>
    <div class="aboveZindex">
      <div class="txt">你投资，我出钱</div>
      <div class="txt">注册就送200红包</div>
      <div class="subTxt">
        <span>已经有</span>
        <span>40050000</span>
        <span>人选择50ETF期权</span>
      </div>
    </div>
    <div class="redBadge">
      <img src="../../../assets/mineImg/hong_bao.png">
      <div class="aboveZindex">
        <div class="price">
          <span>200</span>
          <span>元</span>
        </div>
        <div class="inputParent">
          <input type="tel" maxlength="11" placeholder-class="placeholderTxt" placeholder="请输入手机号">
        </div>
        <div class="btn" v-hover-class="'active'">领取奖励</div>
      </div>
    </div>
  </div>
</template>

<script>
import img1 from '@/assets/mineImg/hong_bao_bg.png'
export default {
  data() {
    return {
      img1
    };
  }
}
</script>

<style lang="scss" scoped>
div.wrap22 {
  width: 100%;
  div.aboveZindex {
    position: relative;
    z-index: 2;
  }
  img.bg {
    height: calc(100vh - 44px);
    position: absolute;
    left: 0;
    width: 100%;
  }
  .logo {
    text-align: center;
    margin: 1.1rem 0 0.25rem;
    img {
      width: 1.4rem;
      height: 1.4rem;
    }
  }
  div.txt {
    font-size: 25px;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    line-height: 0.64rem;
    text-align: center;
  }
  div.subTxt {
    font-size: 14px;
    color: rgba(255, 255, 255, 1);
    line-height: 14px;
    margin: 0.3rem 0 0.7rem;
    text-align: center;
    span:nth-child(2) {
      color: #fcd334;
    }
  }
  div.redBadge {
    margin: 0 0.66rem;
    position: relative;
    height: 5.59rem;
    padding-top: 1px;
    img {
      position: absolute;
      width: 100%;
    }
    .placeholderTxt {
      font-size: 15px;
      color: rgba(102, 102, 102, 1);
      line-height: 0.98rem;
    }
    div.inputParent {
      margin: 0.45rem 0.49rem 0.3rem;
    }
    input {
      text-align: center;
      height: 0.98rem;
      background-color: #fff;
      border-radius: 0.1rem;
      width: 100%;
    }
    div.price {
      font-size: 18px;
      color: rgba(255, 226, 67, 1);
      line-height: 0.28rem;
      text-align: center;
      margin-top: 1.41rem;
      span:first-child {
        font-size: 50px;
        font-weight: bold;
        color: rgba(255, 226, 67, 1);
        line-height: 0.28rem;
      }
    }
    div.btn {
      background: rgba(253, 210, 66, 1);
      border-radius: 0.1rem;
      margin: 0 0.49rem;
      font-size: 16px;
      color: rgba(51, 51, 51, 1);
      line-height: 0.98rem;
      height: 0.98rem;
      text-align: center;
    }
    div.btn.active {
      background-color: darken(#fdd242, 10%);
    }
  }
}
</style>

