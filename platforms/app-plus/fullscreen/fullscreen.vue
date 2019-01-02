<template>
	<view>
    <view>hello world</view>
		 <web-view src="/hybrid/html/local.html"></web-view>
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
