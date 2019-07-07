<template>
  <div class="mask" v-if="showAction" v-vtap.self="{method:closeMe}">
    <div class="wayList black1 ">
      <div class="title">
        <div class="iconWrap " v-vtap="{method:closeMe}">
          <uni-icon type="closeempty" size="30"></uni-icon>
        </div>
        <span class="textc1">支付方式</span>
      </div>
      <div class="items">
        <div class="item uni-flex black1 " v-for="(item,i) in wayLists" :key='i' v-vtap="{method: chooseWay , params: item}" v-hover-class='"self-hover"'>
          <img :src="item.logo">
          <div class="txt">
            <div class="wayName textc1">{{item.pay_name||item.bank_name}}</div>
            <div class="wayTip" v-if="!item.pay_name">尾号{{item.cardno.slice(-4)}}</div>
          </div>
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
    chooseWay(item) {
      this.$emit('choose-way', item)
    },
    calcPaylist(type) {
      for (let k = 0; k < this.paylist[type].length; k++) {
        this.paylist[type][k].pay_way = type
      }
      this.wayLists = this.wayLists.concat(this.paylist[type])
    }
  },
  data() {
    return {
      wayLists: [],
    }
  },
  props: ['showAction'],
  watch: {
    paylist(val) {
      if (Object.prototype.toString.call(val).indexOf('Array') != -1) {
        this.wayLists = val
        this.$emit('calc-complete', this.wayLists)
        return
      }
      let online = []
      for (let i = 0; i < val['online'].length; i++) {
        val.online[i].pay_way = 'online'
        if (["alipay_wap", 'aliauto'].indexOf(val['online'][i].pay_code) >= 0) {
          online.push(val['online'][i])
        }
      }
      this.wayLists = this.wayLists.concat(online);
      ['alipay', 'offline', 'remitance'].forEach(item => this.calcPaylist(item))
      this.$emit('calc-complete', this.wayLists)
    }
  },
  components: { uniIcon },
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
    height: 300px;
    div.items {
      overflow-y: scroll;
      height: calc(300px - 0.98rem);
    }
    div.title {
      position: relative;
      height: 0.98rem;
      text-align: center;
      .iconWrap {
        position: absolute;
        right: 0.16rem;
        top: 0.22rem;
      }
      span {
        font-size: 16px;
        color: rgba(24, 28, 40, 1);
        line-height: 0.98rem;
      }
    }
    div.item {
      height: 1.4rem;
      background-color: #fff;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      padding-left: 0.36rem;
      align-items: center;
      div.wayName {
        font-size: 15px;
        color: rgba(24, 28, 40, 1);
      }
      div.wayTip {
        font-size: 12px;
        color: #999;
      }
      img {
        width: 0.76rem;
        height: 0.76rem;
        margin-right: 0.26rem;
      }
    }
  }
}
</style>
