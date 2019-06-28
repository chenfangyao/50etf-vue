<template>
  <div :class="['btn',{verifyOk}]" v-hover-class="'tap-hover'" v-vtap="{method:doWhat}">{{btnTxt}}</div>
</template>
<script>
export default {
  props:['btnTxt','verifyOk'],
  methods:{
    doWhat(){
      if(this.verifyOk){
        this.$emit('v-tap')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
div.btn {
  height:.96rem;
  background: rgba(24, 144, 255, .3);
  border-radius:.08rem;
  font-size: 18px;
  color: rgba(248, 247, 247, 1);
  line-height:.96rem;
  text-align: center;
  letter-spacing:.12rem;
  margin-bottom:.52rem;
}
div.btn.verifyOk{
  background: $primary1;

}
div.btn.tap-hover.verifyOk {
  background-color: darken($primary1, 5%);
}
</style>
