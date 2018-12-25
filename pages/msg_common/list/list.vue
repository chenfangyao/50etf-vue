<template>
  <view>
    <base-header :title="title" has-back='1'></base-header>
    <view class="listItem" v-for="(item,i) in lists" :key="i" hover-class='self-hover' @tap='go(item.id)'>
      <view class="title uni-flex">
        <text>{{item.title}}</text>
        <text class="time">{{$formatetimestr(item.update_time || item.create_time)}}</text>
      </view>
      <view class="miniContent">{{item.source}}</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      lists: []
    };
  },
  onLoad(options) {
    let type = Number(options.type)
		let id
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
      uni.navigateTo({url:'../detail/detail?id='+ids+'&title='+this.title+''})
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
              // 请求成功的回调
              // res为服务端返回数据的根对象
              console.log('文章列表', res)
              if(res.status){
                  this.lists = res.data.list
              }
          }).catch((err) => {
              // 请求失败的回调
              console.log(err)
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
						// 请求成功的回调
						// res为服务端返回数据的根对象
						console.log('我的消息', res)
						if(res.status){
							this.lists = res.data.list
						}
				}).catch((err) => {
						// 请求失败的回调
						console.log(err)
				})
			}
  },
}
</script>

<style lang="scss" scoped>
view.listItem {
  padding: 35upx 0;
  padding-left: 27upx;
  border-top: 12upx solid #f5f5f5;
  view.title {
    justify-content: space-between;
    margin-right: 27upx;
    margin-bottom: 10upx;
    > text:first-child {
      font-size: 16px;
      color: rgba(24, 28, 40, 1);
    }
    text {
      line-height: 47upx;
      font-size: 12px;
      font-family: ArialMT;
      color: rgba(130, 133, 151, 1);
    }
  }
  view.miniContent {
    font-size: 14px;
    color: rgba(112, 118, 128, 1);
    line-height: 58upx;
    margin-right: 52upx;
  }
}
</style>
