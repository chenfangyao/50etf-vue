<template>
  <view>
    <view class="title uni-flex">
      <text>买盘档</text>
      <text>卖盘档</text>
    </view>
    <view class="uni-flex">
      <view>
        <view v-for="(item,i) in buyDatas" :key="i">
          <text>{{item.a}}</text>
          <text>{{item.b}}</text>
          <text>{{item.c}}</text>
        </view>
      </view>
    </view>
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
      sellDatas: []
    }
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
  >text{
    flex-grow: 1;
    text-align: center;
  }
}
</style>
