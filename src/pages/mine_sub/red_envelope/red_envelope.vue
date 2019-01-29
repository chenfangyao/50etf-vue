<template>
	<div class="wrap">
		<base-header title="我的红包" has-back='1'></base-header>
    <img class="bg" src="../../../assets/mineImg/hong_bao_bg.jpg">
    <div class='logo'>
      <img  src="../../../assets/mineImg/logo.png">
    </div>
    <div class="txt">你投资，我出钱</div>
    <div class="txt">注册就送200红包</div>
    <div class="subTxt">
      <span>已经有 </span>
      <span>40050000</span>
      <span> 人选择50ETF期权</span>
    </div>
    <div class="redBadge">
      <img src="../../../assets/mineImg/hong_bao.png">
      <div class="price">
        <span>200</span>
        <span>元</span>
      </div>
      <div class="inputParent">

        <input type="tel" maxlength='11' placeholder-class='placeholderTxt' placeholder='请输入手机号'>
      </div>
      <div class="btn" hover-class='active'>领取奖励</div>
    </div>
	</div>
</template>

<script>
export default {
  data() {
    return {

    };
  }
}
</script>

<style lang="scss" scoped>
div.wrap {
  img.bg {
    height: calc(100vh - 44px);
    position: absolute;
    left: 0;
    z-index: -10;
    width: 100%;
  }
  .logo {
    text-align: center;
    margin:1.10rem 0.30rem;
    img {
      width:1.40rem;
      height:1.40rem;
    }
  }
  div.txt {
    font-size: 25px;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    line-height:.64rem;
    text-align: center;
  }
  div.subTxt {
    font-size: 14px;
    color: rgba(255, 255, 255, 1);
    line-height: 14px;
    margin:.30rem 0 .70rem;
    text-align: center;
    span:nth-child(2) {
      color: #fcd334;
    }
  }
  div.redBadge {
    margin: 0 .66rem;
    position: relative;
    height:5.59rem;
    padding-top: 1px;
    img {
      position: absolute;
      z-index: -2;
      width: 100%;
    }
    .placeholderTxt {
      font-size: 15px;
      color: rgba(102, 102, 102, 1);
      line-height:.98rem;
    }
    div.inputParent{

      margin:.45rem .49rem .30rem;
    }
    input {
      text-align: center;
      height:.98rem;
      background-color: #fff;
      border-radius:.10rem;
      width: 100%;
    }
    div.price {
      font-size: 18px;
      color: rgba(255, 226, 67, 1);
      line-height:.28rem;
      text-align: center;
      margin-top:1.41rem;
      span:first-child {
        font-size: 50px;
        font-weight: bold;
        color: rgba(255, 226, 67, 1);
        line-height:.28rem;
      }
    }
    div.btn {
      background: rgba(253, 210, 66, 1);
      border-radius:.10rem;
      margin: 0 .49rem;
      font-size: 16px;
      color: rgba(51, 51, 51, 1);
      line-height:.98rem;
      height:.98rem;
      text-align: center;
    }
    div.btn.active {
      background-color: darken(#fdd242, 10%);
    }
  }
}
</style>

