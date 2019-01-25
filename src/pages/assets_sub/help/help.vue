<template>
	<div>
	  <base-header title='银行卡转账帮助' has-back='1'></base-header>
    <div class="fixBottom">
      <btn-block txt='人工服务' @v-tap='callService'></btn-block>

    </div>
	</div>
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
div.fixBottom {
  position: fixed;
  bottom:.20rem;
  left: 0;
  right: 0;
}
</style>

