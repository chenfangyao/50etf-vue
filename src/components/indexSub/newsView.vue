<template>
	<div>
		<div v-for="(item,i) in newlists" :key="i" class="newsView black2 textc1" v-vtap="{method: getartdetil , params: item.id}">
			<h3 class='titlelength textc1'>{{item.title}}</h3>
			<div class="uni-flex textc2">
				<span>{{item.source}}</span>
				<span>
					<span class="newsTime textc2">{{update_time[i]}}</span>
				</span>
			</div>
		</div>
	</div>
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
      this.$navigateTo({
        query:{id:artid},
        url: '/pages/index_sub/new_xiang_qing/new_xiang_qing'
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
div.newsView {
  background-color: #fff;
  padding:.20rem.24rem;
  border-radius:.20rem;
  margin:.20rem 0;
  h3 {
    font-size: 14px;
    font-weight: 400;
    max-height: 50px;
    overflow: hidden;
    margin: 0;
    color: rgba(24, 28, 40, 1);
  }

  span {
    font-size: 10px;
    font-family: MicrosoftYaHei;
    color: rgba(168, 168, 168, 1);
  }

  span.newsTime {
    margin-left:.10rem;
  }

  > div.uni-flex {
    justify-content: space-between;
    margin-top:.10rem;

  }
}
.titlelength{
		text-overflow:ellipsis;overflow:hidden;width:95%;
}
</style>
