<template>
	<view class='wrap'>
		<base-header title='添加银行卡' has-back='1'></base-header>
		<view class='btnclass'><btn-block txt='添加银行卡' @v-tap="addbank" ></btn-block></view>
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
		methods:{
			addbank(){
				uni.navigateTo({
					url: '/pages/mine_sub/bank_card/add_card/add_card?bankinfo=0',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},
	}
</script>

<style lang="scss" scoped>
view.btnclass{
	margin-top: 200px;
}
</style>
