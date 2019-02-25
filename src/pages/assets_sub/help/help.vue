<template>
  <div class="wrap">
    <base-header title="转账帮助" has-back="1"></base-header>
    <div class="linkWrap">
      <div class="link black4 textc1" v-vtap="{method: show , params: 0}">手机App快速转账</div>
      <div class="link black4 textc1" v-vtap="{method: show , params: 1}">柜台汇款单</div>
    </div>
    <help-detail :img-i='i' v-if="showHelp" @close-me='hide'></help-detail>
  </div>
</template>

<script>
import helpDetail from './helpDetail'

export default {
  data() {
    return {
      showHelp: false,
      i: 0
    }
  },
  methods: {
    show(i) {
      this.i = i
      this.showHelp=true
    },
    hide(){
      this.showHelp=false
    }
  },
  components: { helpDetail }
}
</script>

<style lang="scss" scoped>
div.linkWrap {
  display: flex;
  height: calc(100vh - 44px);
  flex-direction: column;
  justify-content: center;
  transform: translateY(-22px);
  > div:first-child {
    margin-bottom: 1.08rem;
  }
  div.black4{
    background-color: #0f131f !important;
  }
  div.link {
    font-size: 18px;
    margin-left: 1.12rem;
    margin-right: 1.12rem;
    color: rgba(51, 51, 51, 1);
    line-height: 2.56rem;
    letter-spacing: 2px;
    height: 2.56rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(204, 204, 204, 1);
    text-align: center;
  }
}
</style>

