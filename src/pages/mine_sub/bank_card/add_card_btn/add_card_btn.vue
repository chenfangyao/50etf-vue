<template>
  <div class='wrap black2'>
    <base-header title='我的银行卡' has-back='1'></base-header>
    <ul class="black2">
      <li class="uni-flex">
        <div class="iconDiv">
          <s-icon icon-class="bank_gs"></s-icon>
        </div>
        <div class="rightPart">
          <div class="flr">解绑</div>
          <div class="line1">工商银行</div>
          <div class="line2">储蓄卡</div>
          <div class="line3">
            <span v-for="(item ,i) in [,,,]" :key="i">****</span>
            <span>9527</span>
          </div>
        </div>
      </li>
    </ul>
    <div class='btnclass black2' v-vtap="{method:addbank}">
      <s-icon :icon-class="atNight?'add_black':'add_white'" class-name="plusBtn" />
      <div>添加银行卡</div>
    </div>
  </div>
</template>

<script>
import btnBlock from '@/components/btnBlock.vue'
import { mapState } from 'vuex'
export default {
  data() {
    return {

    };
  },
  computed: mapState(['atNight']),
  components: { btnBlock },
  methods: {
    addbank() {
      this.$navigateTo({
        url: '/pages/mine_sub/bank_card/add_card/add_card',
        query: { bankinfo: 0 }
      });
    }
  },
}
</script>

<style lang="scss" scoped>
div.btnclass {
  padding-top: 50px;
  text-align: center;
  .plusBtn {
    font-size: 50px;
    margin-bottom: 5px;
  }
}
li {
  width: 7.06rem;
  height: 2.4rem;
  margin: 5px auto;
  align-items: center;
  padding: 0 0.27rem;
  background: linear-gradient(
    106deg,
    rgba(247, 76, 88, 1) 0%,
    rgba(251, 143, 105, 1) 84%
  );
  box-shadow: 2px 3px 12px 0px rgba(189, 32, 38, 0.4);
  border-radius: 10px;
  .iconDiv {
    width: 1rem;
    height: 1rem;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    margin-right: 0.39rem;
    justify-content: center;
    transform: translateY(-10px);
    .s-icon {
      font-size: 48px;
    }
  }
  .rightPart {
    flex-grow: 1;
    color: #fff;
    .flr {
      float: right;
      width: 1.2rem;
      height: 0.48rem;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 12px;
      text-align: center;
      font-size: 12px;
      line-height: 0.48rem;
    }
    .line1 {
      font-size: 16px;
      font-weight: bold;
      line-height: 1;
    }
    .line3{
      font-size: 16px;
      margin-top: 0.2rem;
      span{
        margin-right: 0.4rem;
      }
    }
  }
}
</style>
