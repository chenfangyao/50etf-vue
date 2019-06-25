<template>
  <div class="uni-flex">
    <div class="v1" v-vtap="{method: go , params: 0}" v-hover-class="'tap-hover'">开仓</div>
    <div class="v2" v-vtap="{method: go , params: 1}" v-hover-class="'tap-hover'">平仓</div>
  </div>
</template>
<style lang="scss" scoped>
$v1bg: $primary1;
$v2bg: #e6aa12;
div.uni-flex {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0.98rem;
  font-size: 16px;
  text-align: center;
  .v1 {
    line-height: 0.98rem;
    background-color: $v1bg;
    width: 50%;
  }
  .v1.tap-hover {
    background: darken($v1bg, 5%);
  }
  .v2.tap-hover {
    background: darken($v2bg, 5%);
  }
  .v2 {
    line-height: 0.98rem;
    width: 50%;
    background-color: $v2bg;
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
