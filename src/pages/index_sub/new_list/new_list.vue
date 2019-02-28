<template>
  <div class="wrap">
    <base-header title="资讯" :hasBack="true"></base-header>
    <scroll-view class="listscrow" ref='scroll5' @scrollToEnd="loadMore">
      <div>
        <news-view :newlists="newsItem"></news-view>
        <uni-load-more :loading-type="resquestState"></uni-load-more>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import newsView from '@/components/indexSub/newsView.vue';
import uniLoadMore from '@/components/uni-load-more.vue';
import scrollView from '@/components/other/scroll-view'

export default {
  data() {
    return {
      newsItem: [],
      resquestState: 0,
      pageindex: 0,
    };
  },
  components: {
    newsView, uniLoadMore,scrollView
  },
  methods: {
    loadMore() {
      if (this.resquestState < 2) {
        this.pageindex += 1
        this.getartlist(this.pageindex, 10, 'add')
      }
    },
    getartlist(index, number, add) {
      var options = {
        url: '/Sapi/Article/notice', //请求接口
        method: 'POST', 
        data: {
          page_index: index,
          page_size: number,
          cate_id: 29
        },
        context: '',
      }
      this.$httpReq(options).then((res) => {
        // this.newsItem=res.data.list
        if (res.status) {
          if (add) {
            this.newsItem = this.newsItem.concat(res.data.list)
          this.$refs.scroll5.refresh()

          } else {
            this.newsItem = res.data.list
          }
        }
        this.resquestState = res.data.list.length == 10 ? 0 : 2
      }).catch((err) => {
        console.error(err, '捕捉')
      })
    }

  },
  created() {
    this.getartlist(this.pageindex, 10)
  }
}
</script>

<style scoped>
div.wrap {
  /* background-color: rgb(245,245,245); */
  background-color: #f5f5f5;
  padding: 0 .1rem;
  width: 100%;
  height: 100vh;
}
.listscrow {
  height: calc(100vh - 44px);
  overflow: hidden;
  padding: .1px 0;
}
.listscrow >div{
  padding: .1px 0;

}
</style>
