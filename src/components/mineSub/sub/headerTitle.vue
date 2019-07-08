<template>
<div class="fixWrap black1">
  <div :style="{height:statusbarHeight+'px'}"></div>
  <div class="title">
    <div class="msg">
      <span v-vtap="{method:go,params:3}" class="commonStyle1">消息</span>
    </div>
    <span class="commonStyle1" v-vtap="{method:go}">设置</span>
  </div>
</div>
</template>
<script>
import { mapState } from 'vuex';
export default {
	data(){
		return{
			txt:'0'
		}
	},
	computed: mapState(['sid','newlengths','statusbarHeight']),
	created(){
		if(this.sid){
			this.txt=this.newlengths.toString()
		}else{
			this.txt='0'
		}
	},
  methods: {
    go(i) {
      if(!this.sid){
        this.$tipLogin()
						return
			}
      if (i == 3) {
        // this.$navigateTo({ url: '/pages/msg_common/list/list?type=' + i })
        this.$router.push({
          path:'/pages/msg_common/list/list',
          query:{
            type:i
          }
        })
      } else {
        this.$navigateTo({ url: '/pages/mine_sub/setting/setting' })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.fixWrap {
  background: transparent;
}
.title {
  height: 54px;
  padding: 0 0.26rem;
  .msg {
    position: relative;
    margin-right:.44rem;
    .commonStyle1{
      padding-right: 20px;
      padding-left: 0;
    }
  }
  display: flex;
  justify-content: space-between;
  .commonStyle1 {
    color: #fff;
    font-size: 14px;
    line-height: 44px;
    padding-left: 20px;
  }
}
</style>
