<template>
  <div class="uni-flex black1">
    <div class="v1" v-vtap="{method: go , params: 0}" v-hover-class="'tap-hover'">开仓</div>
    <div class="v2" v-vtap="{method: go , params: 1}" v-hover-class="'tap-hover'">平仓</div>
  </div>
</template>
<style lang="scss" scoped>
div.uni-flex {
  position: fixed;
  bottom: 0;
  padding: 0.13rem 0;
  justify-content: space-around;
  background-color: #fff;
  left: 0;
  right: 0;
  height: 0.98rem;
  font-size: 16px;
  text-align: center;
  .v1 {
    line-height: 0.72rem;
    background-color: $primary1;
    width: 2.3rem;
  }
  .v1.tap-hover{
    background: darken($primary1, 5%);
  }
  .v2 {
    line-height: 0.72rem;
    width: 2.3rem;
    border-radius: 2px;
    border: solid 1px $primary1;
    color: $primary1;
  }
  color: rgba(255, 255, 255, 1);
}
</style>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {}
  },
  props: ['resObj'],
  computed: mapState(['sid']),
  methods: {
    ...mapMutations(['sethycode']),
    go(val) {
      if (!this.sid) {
        this.$dialog.confirm({
          message: '现在去登录',
          title: '您还未登录',
          lockScroll: true,
          beforeClose(action, done) {
            done()
            action==='confirm'&& this.$navigateTo({url: '/pages/login/login', });
          }
        });
        return
      }
      this.sethycode(this.resObj.stockCode)
      this.$navigateTo({ url: '/open_close', query: { pinkaiC: val, code: this.resObj.stockCode } })

    }
  }
}
</script>
