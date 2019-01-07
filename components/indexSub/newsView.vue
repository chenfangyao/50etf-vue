<template>
	<view>
		<view v-for="(item,i) in newlists" :key="i" class="newsView" @tap="getartdetil(item.id)">
			<h3>{{item.title}}</h3>
			<view class="uni-flex">
				<text>{{item.source}}</text>
				<text>
					<text class="newsTime">{{update_time[i]}}</text>
					<!-- <text class="newsTime">{{item.update_time}}</text> -->
				</text>
			</view>
		</view>
	</view>
</template>
<script>
export default {
  data() {
    return {
      newsItem: [],
      update_time:[]
    }
  },
  props: ['newlists'],
  methods: {
    // 获取文章详情
    getartdetil(artid) {
      uni.navigateTo({
        url: '/pages/index_sub/new_xiang_qing/new_xiang_qing?id=' + artid + ''
      });
    }
  },
  watch: {
    newlists(val) {
      if (!val) return;
      val.forEach((item, i) => {
        this.update_time.push(this.$formatetimestr(item.update_time))
      });
    }
  },
  created() {
    // this.getartlelist()
  },

}
</script>
<style lang="scss">
view.newsView {
  background-color: #fff;
  padding: 20upx 24upx;
  border-radius: 20upx;
  margin: 20upx 0;
  h3 {
    font-size: 14px;
    font-weight: 400;
    max-height: 50px;
    overflow: hidden;
    background-color: #fff;
    color: rgba(24, 28, 40, 1);
  }

  text {
    font-size: 10px;
    font-family: MicrosoftYaHei;
    color: rgba(168, 168, 168, 1);
  }

  text.newsTime {
    margin-left: 10upx;
  }

  > view.uni-flex {
    justify-content: space-between;
    margin-top: 10upx;
    background-color: #fff;
  }
}
</style>
