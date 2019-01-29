<template>
<div class="fixWrap">
  <div class="occupy"></div>
  <div class="title">
    <div class="msg">
      <span @click='go(3) ' class="commonStyle1">消息</span>
      <!-- <uni-badge :text="txt" type="danger"></uni-badge> -->
      <uni-badge :text="sid?newlengths:'0'" type="danger"></uni-badge>
    </div>
    <span class="commonStyle1" @click='go'>设置</span>
  </div>
</div>
</template>
<script>
import uniBadge from "@/components/uni-badge.vue"
import { mapState } from 'vuex';
export default {
	data(){
		return{
			txt:'0'
		}
	},
  components: { uniBadge },
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
  height: 44px;
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
  .uni-badge {
    position: absolute;
    right: -0.32rem;
    top:.20rem;
    padding:.04rem .08rem;
    font-size: 11px;
  }
}
</style>
