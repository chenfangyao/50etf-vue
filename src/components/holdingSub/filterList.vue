<template>
  <div>

    <div class="uni-flex container">
      <div>总计：{{total}}笔</div>
      <div class="right" @touchend="showDatepick">
        <img src="/assets/mineImg/datePicker.png" />
      </div>
    </div>
    <date-pick v-if="showPick" @hid-me='hidDatePick' @select-complete='getTime'></date-pick>

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
    }
  }
}
</script>
<style lang='scss' scoped>
div.container {
  justify-content: space-between;
  padding: 0.24rem;
  font-size: 14px;
  height:.88rem;
  color: rgba(153, 153, 153, 1);
  align-items: center;
  div.right {
    height:.88rem;
    padding:.21rem 0 0.40rem;
    img {
      width:.45rem;
      height:.45rem;
    }
  }
}
</style>
