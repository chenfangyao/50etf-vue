<template>
  <div>

    <div class="uni-flex container textc1">
      <div>总计：{{total}}笔</div>
      <div class="right" v-vtap="{method:showDatepick}">
        <s-icon :icon-class="'select_rili' | atNightIcon" />

      </div>
    </div>
    <date-pick sb-format='1' :show-pick="showPick" @hid-me='hidDatePick' @select-complete='getTime'></date-pick>

  </div>
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
      this.showPick = true
    },
    hidDatePick() {
      this.showPick = false
    },
    getTime(obj) {
      this.$emit('select-complete', obj)
      this.hidDatePick()
    }
  }
}
</script>
<style lang='scss' scoped>
div.container {
  justify-content: space-between;
  padding: 0.24rem;
  font-size: 14px;
  height: 0.88rem;
  color: rgba(153, 153, 153, 1);
  align-items: center;
  div.right {
    height: 0.88rem;
    padding: 0.21rem 0 0.4rem;
    .s-icon {
      width: 0.45rem;
      height: 0.45rem;
    }
  }
}
</style>
