<template>
  <view class="fixWrap">
    <view class="container"></view>
    <view class="closeIcom" @tap='closeMe'>X</view>
  </view>
</template>
<script>
export default {
  data(){
    return{}
  },
  methods:{
    closeMe(){
      this.$emit('close-me')
    }
  }
}
</script>
<style lang="scss" scoped>
view.fixWrap{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(0,0,0,0.5);
  z-index:200 ;
  view.container{
    margin-top: calc((100vh - 100%)/2);
    min-height: 300px;
    border: solid 1px #fff;
  }
  view.closeIcom{
    border: solid 1px #fff;
    border-radius: 50%;
    text-align: center;
    width: 72upx;
    height: 72upx;
    margin: 50upx auto 0;
    color: #fff;
    line-height: 72upx;
    font-size: 18px;
  }
}
</style>
