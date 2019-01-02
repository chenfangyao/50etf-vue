<template>
  <view>

    <view class="uni-flex container">
      <view>总计：{{total}}笔</view>
      <view class="right" @tap="showDatepick">
        <image src='/static/mineImg/datePicker.png' />
      </view>
    </view>
    <date-pick v-if="showPick" @hid-me='hidDatePick' @select-complete='getTime'></date-pick>

  </view>
</template>
<script>
import datePick from '@/components/datePick.vue'

export default {
  components: { datePick },
  props: ['total'],
  data() {
    return {
      showPick: false
    }
  },
  methods: {
    showDatepick() {
      this.$emit('begin-choose')
      this.showPick = true
    },
    hidDatePick() {
      this.$emit('end-choose')
      this.showPick = false
    },
    getTime(obj) {
      this.$emit('select-complete', obj)
      this.hidDatePick()
      console.log(obj);
    }
  }
}
</script>
<style lang='scss' scoped>
view.container {
  justify-content: space-between;
  padding: 0 24upx;
  font-size: 14px;
  height: 88upx;
  color: rgba(153, 153, 153, 1);
  align-items: center;
  view.right {
    height: 88upx;
    padding: 21upx 0 0 40upx;
    image {
      width: 45upx;
      height: 45upx;
    }
  }
}
</style>
