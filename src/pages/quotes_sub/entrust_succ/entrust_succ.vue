<template>
  <div class="wrap">
    <base-header title='委托' :hasBack='false'></base-header>
    <div class="txt textc1">交易成功</div>
    <div class="btn2 uni-flex">
      <div v-hover-class='"self-hover"' v-vtap="{method:go}">继续交易</div>
      <div v-hover-class='"self-hover"' v-vtap="{method:gowt}">查看委托</div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      type: 0,
      code: 0,
    };
  },
  methods: {
    ...mapMutations(['setweituoindex']),
    go() {
      this.$redirectTo({
        url:'/open_close',
        query:{
          pinkaiC:this.type,
          code:this.code
        }
      })
    },
    gowt() {
      this.setweituoindex(2)
      this.$redirectTo({
        url:'/holding_warehouse'
      })
    }
  },
  // onLoad(opt) {
    // 暂时注释
  // 		if(opt.type=="true"){
  // 			this.type=1
  // 		}else{
  // 			this.type=0
  // 		}
  //   this.code = opt.code
  // }
  created(){
    var opt=this.$route.query
    		if(opt.type=="true"){
    			this.type=1
    		}else{
    			this.type=0
    		}
    this.code=opt.code
  }
}
</script>

<style lang="scss" scoped>
div.wrap {
  height: 100vh;
  background-color: #ededed;
  text-align: center;
  padding: 0.58rem;
  div.txt {
    margin:3.22rem 01.59rem;
    font-size: 15px;
    color: rgba(24, 28, 40, 1);
  }
  div.btn2 {
    justify-content: space-between;
    > div {
      flex-grow: 1;
      height:.98rem;
      background: rgba(64, 157, 229, 0);
      border: 1px solid rgba(64, 157, 229, 1);
      border-radius:.04rem;
      font-size: 16px;
      color: rgba(64, 157, 229, 1);
      line-height:.98rem;
    }
    > div:last-child {
      margin-left:.34rem;
      background: rgba(64, 157, 229, 1);
      color: #fff;
    }
  }
}
</style>
