<template>
  <view class="wrap">
    <base-header title='委托' :hasBack='false'></base-header>
    <view class="txt">交易成功</view>
    <view class="btn2 uni-flex">
      <view hover-class='self-hover' @tap='go'>继续交易</view>
      <view hover-class='self-hover' @tap="gowt">查看委托</view>
    </view>
  </view>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      type: 0,
      code: 0,
    };
  },
  methods: {
    ...mapMutations(['setweituoindex']),
    go() {
      //       uni.navigateBack({
      //         delta:1
      //       })
      uni.redirectTo({
        url: '/pages/quotes_sub/open_close/open_close?pinkaiC=' + this.type + '&code=' + this.code + '',
      });

    },
    gowt() {
      this.setweituoindex(2)
      uni.switchTab({
        url: '/pages/tabBar/holding_warehouse/holding_warehouse'
      })
    }
  },
  onLoad(opt) {
    // 暂时注释
    // 		if(opt.type=="true"){
    // 			this.type=1
    // 		}else{
    // 			this.type=0
    // 		}	
    this.code = opt.code
  }
}
</script>

<style lang="scss" scoped>
view.wrap {
  height: 100vh;
  background-color: #ededed;
  text-align: center;
  padding: 0 58upx;
  view.txt {
    margin: 322upx 0 159upx;
    font-size: 15px;
    color: rgba(24, 28, 40, 1);
  }
  view.btn2 {
    justify-content: space-between;
    > view {
      flex-grow: 1;
      height: 98upx;
      background: rgba(64, 157, 229, 0);
      border: 1px solid rgba(64, 157, 229, 1);
      border-radius: 4upx;
      font-size: 16px;
      color: rgba(64, 157, 229, 1);
      line-height: 98upx;
    }
    > view:last-child {
      margin-left: 34upx;
      background: rgba(64, 157, 229, 1);
      color: #fff;
    }
  }
}
</style>
