<template>
	<view class="wrap">
		<base-header title='添加银行卡' has-back='1'></base-header>
    <view class='list-row'>
      <text>开户银行</text>
      <input type="text" placeholder-class='_placeholder' placeholder='选择开户银行' disabled @tap='showPicker'>
    </view>
    <view class='list-row'>
      <text>卡号</text>
      <input type="number" placeholder-class='_placeholder' placeholder='填写卡号'>
    </view>
    <view class='list-row' >
      <text>姓名</text>
      <input type="text"  placeholder='填写姓名'>
    </view>
    <view class="fixBottom">

     <btn-block txt='添加' ></btn-block>
    </view>
     <mpvue-picker themeColor="#007AFF" ref="typePick" mode="selector" :deepLength="1" :pickerValueDefault="[0]"
                      @onConfirm="onConfirm" @onCancel="onCancel" :picker-value-array="pickerValueArray"></mpvue-picker>
	</view>
</template>

<script>
import btnBlock from '@/components/btnBlock.vue'
import mpvuePicker from '@/components/mpvuePicker.vue';

export default {
  data() {
    return {
      pickerValueArray: [{ label: 1 },{ label: 2 },]
    };
  },
  components: { btnBlock, mpvuePicker },
  methods: {
    showPicker() {
      this.$refs.typePick.show()
    },
    onCancel(e) {
      // console.log(e)
    },
    onConfirm(val) {
    },
  }
}
</script>


<style lang="scss" scoped>
view.wrap {
  background-color: #f5f5f5;
  min-height: 100vh;

  view.list-row {
    width: 750upx;
    height: 98upx;
    background: rgba(255, 255, 255, 1);
    border-top: 1px solid #eee;
    line-height: 98upx;
    padding-left: 37upx;
    display: flex;
    align-items: center;
    > text:first-child {
      width: 65px;
      font-size: 15px;
      color: rgba(24, 28, 40, 1);
      margin-right: 44upx;
    }
    input {
      flex-grow: 1;
      margin-right: 2em;
    }
  }
  view.fixBottom {
    position: fixed;
    bottom: 20upx;
    left: 0;
    right: 0;
  }
}
</style>
