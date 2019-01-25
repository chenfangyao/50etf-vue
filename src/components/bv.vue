<template>
<div class="wrap">

  <div class="d1">hello world</div>
  <van-button @click="ff" type="primary">主要按钮</van-button>
</div>
</template>
<script>
import { Button } from 'vant';
export default {
  methods:{
    ff(){
      // console.log(process.env.API_HOST_Sapi);
      console.log(this.$route);
      this.$router.push({name:'bv'})
    }
  },
  components:{[Button.name]:Button}
}
</script>

<style lang="scss" scoped>
div.wrap{
  width: 100vw;
  
}
div.d1 {
  background-color: #ea00ff;
  font-size: 0.4rem;
}
</style>
