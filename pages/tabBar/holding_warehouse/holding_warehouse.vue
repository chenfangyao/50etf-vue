<template>
  <view class="wrap">
    <header-tab @tab-tap='tabTap'></header-tab>
    <filter-list></filter-list>
  </view>
</template>

<script>
import headerTab from '@/components/holdingSub/headerTab.vue'
import filterList from '@/components/holdingSub/filterList.vue'

export default {
  data() {
    return {

    };
  },
  components: { headerTab ,filterList},
  methods:{
    tabTap(i){
      console.log(i);
    }
  },
  onShow(){
    var options = {
				url: '/Sapi/Squery/list_fbcc', //请求接口
				data: {
					page_index: 0,
					page_size: 3,
        },
        method : 'GET'
			}
			this.$httpReq(options).then((res) => {
				console.log('11', res)
				this.newsItem = res.data.list
			}).catch((err) => {
				console.err(err)
			})
  }
}
</script>

<style lang="scss" scoped>
view.wrap {
  min-height: 100vh;
  background-color: #f5f5f5;
}
</style>
