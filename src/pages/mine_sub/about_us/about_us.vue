<template>
	<div class="wrap">
		<base-header :hasBack="true" title='关于至简'></base-header>
    <div class="img">
      <img :src="switchObj.logo">
    </div>
    <div class="txt textc2">
      福建至简智能科技有限公司致力于通过场内期权的不断创新和运用，努力创建业内更加高品质的在线询价，在线操作，在线开户等服务。福建至简智能科技有限公司在任重道远的前进征途上，真诚欢迎广大用户及合作伙伴与我们一起携手同进，共创辉煌
    </div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
    };
  },
  computed:mapState(['switchObj'])
}
</script>

<style lang="scss" scoped>
div.wrap {
  background-color: #a8a8a8;
  height: 100vh;
  div.img {
    text-align: center;
    margin-top: 2rem;
    img {
      width: 100px;
      height: 100px;
    }
  }
  div.txt {
    font-size: 15px;
    color: rgba(24, 28, 40, 1);
    line-height: 21px;
    margin:.54rem .75rem;
  }
}
</style>
