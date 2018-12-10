<template>
  <view >
    <view class="title uni-flex">
      <text>买盘档</text>
      <text>卖盘档</text>
    </view>
    <view class="uni-flex panContainer">
      <view class="buyPan">
        <view v-for="(item,i) in buyDatas" class="panItem uni-flex" :key="i">
          <text>{{item.a}}</text>
          <text>{{item.b}}</text>
          <text>{{item.c}}</text>
        </view>
      </view>
      <view class="sellPan">
        <view v-for="(item,i) in sellDatas" class="panItem uni-flex" :key="i">
          <text>{{item.a}}</text>
          <text>{{item.b}}</text>
          <text>{{item.c}}</text>
        </view>
      </view>
    </view>
    <view class="h100"></view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      buyDatas: [//此处属性名暂定abc，具体以接口为准
        {
          a: '买一',
          b: 0.2342,
          c: 1
        },
        {
          a: '买一',
          b: 0.2342,
          c: 1
        },
        {
          a: '买一',
          b: 0.2342,
          c: 1
        },
        {
          a: '买一',
          b: 0.2342,
          c: 1
        },
        {
          a: '买一',
          b: 0.2342,
          c: 1
        },
      ],
      sellDatas: [
      ]
    }
  },
  created() {
    this.sellDatas = [...this.buyDatas]
  }

}
</script>
<style lang="scss" scoped>
view.title {
  justify-content: space-between;
  height: 84upx;
  font-size: 14px;
  color: rgba(24, 28, 40, 1);
  line-height: 84upx;
  border-bottom: 1px solid #f5f5f5;
  > text {
    flex-grow: 1;
    text-align: center;
  }
}
view.panContainer {
  justify-content: space-between;
  padding: 36upx;
  > view {
    flex-grow: 1;
    .panItem {
      flex-grow: 1;
      justify-content: space-around;
      color: #181c28;
      text:nth-child(2) {
        font-size: 13px;
        color: rgba(240, 95, 92, 1);
      }
    }
  }
}
view.h100 {
  height: 120upx;
  background-color: #f5f5f5;
}
</style>
