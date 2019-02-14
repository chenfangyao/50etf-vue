<template>
  <div class="wrap">
    <base-header :title="title" has-back='1'></base-header>
    <div class="listItem" v-for="(item,i) in lists" :key="i" hover-class='self-hover' @click='go(item.id)'>
      <div class="title uni-flex">
        <span>{{item.title}}</span>
        <span class="time">{{$formatetimestr(item.update_time || item.create_time)}}</span>
      </div>
      <div class="miniContent">{{item.source}}</div>
			<!-- <div class="texttime"><span class="time">{{$formatetimestr(item.update_time || item.create_time)}}</span></div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      lists: []
    };
  },
  created() {
    let type = Number(this.$route.query.type)
    switch (type) {
      case 1:
        this.title = '公告'
        this.getartlelist(28)
        break
      case 2:
        this.title = '新手引导'
        this.getartlelist(2)
        break
      case 3:
        this.title = '消息'
        this.getmymessage()
        break
    }
  },
  methods: {
    go(ids){
       this.$router.push({
         path:'/pages/msg_common/detail/detail',
         query:{
           id:ids,
           title:this.title
         }
       })
    },
      getartlelist(id) {
          var options = {
              url: '/Sapi/Article/notice', //请求接口
              method: 'POST', //请求方法全部大写，默认GET
              data: {
                  page_index: 0,
                  page_size: 7,
									cate_id:id
              },
          }
          this.$httpReq(options).then((res) => {
              if(res.status){
                  this.lists = res.data.list
              }
          }).catch((err) => {
              // 请求失败的回调
              console.error(err,'捕捉')
          })
      },
			getmymessage(){
				var options = {
						url: '/Sapi/Ucenter/message_list', //请求接口
						method: 'GET', //请求方法全部大写，默认GET
						data: {
								page_index: 0,
								page_size: 7,
						},
				}
				this.$httpReq(options).then((res) => {
						if(res.status){
							this.lists = res.data.list
						}
				}).catch((err) => {
						console.error(err,'捕捉')
				})
			}
  },
}
</script>

<style lang="scss" scoped>
div.wrap{width: 100%;}
div.listItem {
  padding:.35rem 0;
  padding-left:.27rem;
  border-top:.12rem solid #f5f5f5;
  div.title {
    justify-content: space-between;
    margin-right:.27rem;
    margin-bottom:.10rem;
    > span:first-child {
      font-size: 16px;
      color: rgba(24, 28, 40, 1);
			text-overflow:ellipsis;overflow:hidden;width:50%;
    }
    span {
      line-height:.47rem;
      font-size: 12px;
      font-family: ArialMT;
      color: rgba(130, 133, 151, 1);
    }
  }
  div.miniContent {
    font-size: 14px;
    color: rgba(112, 118, 128, 1);
    line-height:.58rem;
    margin-right:.52rem;
  }
}
div.listItem:last-child{
  border-bottom:0.12rem solid #f5f5f5;

}
</style>
