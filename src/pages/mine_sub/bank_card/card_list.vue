<template>
	<div class="wrap">
    <!-- 不能用这UI了 -->
		<base-header has-back='1' right-txt='添加' title='选择银行卡' @right-tap='goAdd'></base-header>
    <div class="h12"></div>
    <scroll-view class="scroll-view_H" scroll-x="true" scroll-left="5" v-for="(value,key) in cardList" :key="key">
        <div  class="scroll-view-item_H ">
          <img class="bankLogo" src="/assets/mineImg/05.png">
          <div class="txt uni-flex">
            <span>农业银行</span>
            <span>尾号1123储蓄卡</span>
          </div>
        </div>
        <div  class="scroll-view-item_H bg-blue" v-hover-class='"self-hover"' v-vtap="{method: delbank , params: key}"><span>删除</span></div>
		</scroll-view>
	</div>
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
      this.$navigateTo({ url: '../add_card/add_card' })
    },
		delbank(index){
			this.cardList.splice(index,1)
		}
  },
}
</script>


<style lang="scss" scoped>
div.wrap {
  min-height: 100vh;
  background-color: #f5f5f5;
  div.h12 {
    height:.12rem;
  }
  .scroll-view_H {
    white-space: nowrap;
    width: 100%;
    height:1.60rem;
  }

  .scroll-view-item_H {
    display: inline-flex;
    width: 100%;
    height:1.60rem;
    font-size: 15px;
    border-bottom: 1px solid #f5f5f5;
    align-items: center;
    background-color: #fff;
    img {
      width:.80rem;
      height:.80rem;
      margin-left:.36rem;
    }
    div.txt {
      flex-direction: column;
      margin-left:.29rem;
      span:first-child {
        font-size: 15px;
        color: rgba(24, 28, 40, 1);
      }
      span:last-child {
        font-size: 12px;
        color: rgba(168, 168, 168, 1);
      }
    }
  }
  .scroll-view-item_H.bg-blue {
    line-height:1.60rem;
    background-color: $primary1;
    width:2.40rem;
    color: #fff;
    vertical-align: top;
    span {
      text-align: center;
      display: inline-block;
      width: 100%;
    }
  }
}
</style>
