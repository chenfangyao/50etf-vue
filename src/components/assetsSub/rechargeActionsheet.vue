<template>
  <div class="mask" >
    <div class="wayList">
      <div class="title">
        <div class="iconWrap " @click='closeMe'>
          <uni-icon type="closeempty"   size="30"></uni-icon>
        </div>
        <span>支付方式</span>
      </div>
      <div class="item uni-flex" v-for="(item,i) in wayLists" :key='i' @click='chooseWay(item)' hover-class='self-hover'>
        <img :src="item.logo">
        <div class="txt">
          <div class="wayName">{{item.pay_name}}</div>
          <!-- <div class="wayTip">提示限额（0-50,000）</div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import uniIcon from "@/components/uni-icon.vue"
import { mapState, mapMutations } from 'vuex';
export default {
  computed: {    ...mapState(['paylist']),

  },
  methods: {
    closeMe() {
      this.$emit('close-me')
    },
    chooseWay(i) {
      this.$emit('choose-way', i)
    }
  },
  data() {
    return {
      wayLists: [],

    }
  },
  props: ['showAction'],
  mounted() {
    this.wayLists = this.wayLists.concat(this.paylist['alipay']).concat(this.paylist['remitance'])
  },
  components: { uniIcon }
}
</script>

<style lang="scss" scoped>
div.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;
  div.wayList {
    position: absolute;
    bottom: 0;
    // transform: translateY(100%);
    // transition: transform 300ms;
    background-color: #fff;
    left: 0;
    right: 0;
    div.title {
      position: relative;
      height:.98rem;
      text-align: center;
      .iconWrap {
        position: absolute;
        left:.16rem;
        top:.22rem;
      }
      span {
        font-size: 16px;
        color: rgba(24, 28, 40, 1);
        line-height:.98rem;
      }
    }
    div.item {
      height:1.40rem;
      background-color: #fff;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      padding-left:.36rem;
      align-items: center;
      div.wayName {
        font-size: 15px;
        color: rgba(24, 28, 40, 1);
      }
      div.wayTip {
        font-size: 12px;
        color: rgba(24, 28, 40, 1);
      }
      img {
        width:.76rem;
        height:.76rem;
        margin-right:.26rem;
      }
    }
  }
}
</style>
