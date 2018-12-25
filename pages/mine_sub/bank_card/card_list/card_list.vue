<template>
	<view class="wrap">
		<base-header has-back='1' right-txt='添加' title='选择银行卡' @right-tap='goAdd'></base-header>
    <view class="h12"></view>
    <scroll-view class="scroll-view_H" scroll-x="true" scroll-left="5" v-for="(value,key) in cardList" :key="key">

        <view  class="scroll-view-item_H ">
          <image class="bankLogo" src='/static/mineImg/05.png'></image>
          <view class="txt uni-flex">
            <text>农业银行</text>
            <text>尾号1123储蓄卡</text>
          </view>
        </view>
        <view  class="scroll-view-item_H bg-blue" hover-class='self-hover' @tap='delbank(key)'><text>删除</text></view>
		</scroll-view>
	</view>
</template>

<script>
export default {
  data() {
    return {
      cardList: [,,,]
    };
  },
  methods: {
    goAdd() {
      uni.navigateTo({ url: '../add_card/add_card' })
    },
		delbank(index){
			console.log(333,index)
			this.cardList.splice(index,1)
		}
  }
}
</script>


<style lang="scss" scoped>
view.wrap {
  min-height: 100vh;
  background-color: #f5f5f5;
  view.h12 {
    height: 12upx;
  }
  .scroll-view_H {
    white-space: nowrap;
    width: 100%;
    height: 160upx;
  }

  .scroll-view-item_H {
    display: inline-flex;
    width: 100%;
    height: 160upx;
    font-size: 15px;
    border-bottom: 1px solid #f5f5f5;
    align-items: center;
    background-color: #fff;
    image {
      width: 80upx;
      height: 80upx;
      margin-left: 36upx;
    }
    view.txt {
      flex-direction: column;
      margin-left: 29upx;
      text:first-child {
        font-size: 15px;
        color: rgba(24, 28, 40, 1);
      }
      text:last-child {
        font-size: 12px;
        color: rgba(168, 168, 168, 1);
      }
    }
  }
  .scroll-view-item_H.bg-blue {
    line-height: 160upx;
    background-color: #409de5;
    width: 240upx;
    color: #fff;
    vertical-align: top;
    text {
      text-align: center;
      display: inline-block;
      width: 100%;
    }
  }
}
</style>
