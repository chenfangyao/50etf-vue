<template>
	<view>
	  <base-header title='银行卡转账帮助' has-back='1'></base-header>
    <view class="fixBottom">
      <btn-block txt='人工服务' @v-tap='callService'></btn-block>

    </view>
	</view>
</template>

<script>
import btnBlock from '@/components/btnBlock.vue'

export default {
  data() {
    return {

    };
  },
  components: { btnBlock },
  methods: {
    callService(){
      uni.makePhoneCall({
        phoneNumber: '9-559-555' 
      });
    }
  }
}
</script>

<style lang="scss" scoped>
view.fixBottom {
  position: fixed;
  bottom: 20upx;
  left: 0;
  right: 0;
}
</style>

