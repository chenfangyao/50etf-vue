<template >
	<view >
		 <web-view  src="http://50etfvue.cardoctor.com.cn/h5"></web-view>
		 <!-- <web-view  src="/hybrid/html/local.html"></web-view> -->
	</view>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  onLoad() {
    // plus.screen.lockOrientation("landscape-primary");
  },
  onBackPress() {
    plus.screen.lockOrientation("portrait-primary");
  }

}
</script>

<style>
</style>
