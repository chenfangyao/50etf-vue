<template>
<div class="fixWrap black2">
  <div class="occupy"></div>
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
	computed: mapState(['sid','newlengths']),
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
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  background: linear-gradient(
    90deg,
    rgba(41, 123, 205, 1),
    rgba(64, 157, 229, 1)
  );
  right: 0;
  .occupy {
    height: var(--status-bar-height);
  }
}
.title {
  height: 54px;
  padding: 0 .26rem;

  .msg {
    position: relative;
    margin-right:.44rem;
  }

  display: flex;
  justify-content: space-between;
  span.commonStyle1 {
    color: #fff;
    font-size: 14px;
    line-height: 44px;
  }
}
</style>
