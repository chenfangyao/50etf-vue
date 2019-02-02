<template>
	<div class="wrap">
		<base-header :hasBack="true" title='我的客服'></base-header>
    <div class="h50"></div>
    <btn-block txt='QQ : 3074732530'></btn-block>
    <!--<div class="h577"></div>-->
	</div>
</template>

<script>
import btnBlock from '@/components/btnBlock.vue'
export default {
  data() {
    return {
    };
  },
  components:{btnBlock},
  methods: {
    showPop() {
      this.telShow = !this.telShow
    },
    call() {
      plus.device.dial( '' );
    }
  },
  created(){
  }
}
</script>

<style lang="scss" scoped>
div.wrap {
  background-color: #f5f5f5;
  height: 100vh;
  div.h50{
    height:5.00rem;
  }
  div.telPop {
    div.fixed {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.6);
    }
    div.container {
      text-align: center;
      background-color: #fff;
      position: fixed;
      top: 50%;
      padding-bottom:.42rem;
      border-radius:.10rem;
      transform: translateY(-50%);
      left:.75rem;
      right:.75rem;
      div.txt {
        font-size: 16px;
        line-height: 16px;
        color: rgba(24, 28, 40, 1);
        margin:.39rem 0.91rem;
      }
      div.telNum {
        font-size: 45px;
        line-height: 45px;
        font-family: ArialMT;
        color: rgba(24, 28, 40, 1);
        margin-bottom:1.03rem;
      }
    }
  }
  div.btn {
    height:.98rem;
    margin: 0.20rem;
    background: rgba(64, 157, 229, 1);
    border-radius:.10rem;
    font-size:.32rem;
    color: rgba(255, 255, 255, 1);
    line-height:.98rem;
    text-align: center;
  }
  div.h577 {
    height:5.77rem;
    background-color: #fff;
    margin:.50rem.20rem 0;
  }
}
</style>
