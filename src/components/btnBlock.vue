<template>
  <div class=" bigBtn" v-hover-class="'active'" @click="handleTap">{{txt}}</div>

</template>
<script>
export default {
  props: ['txt'],
  methods: {
    handleTap() {
      this.$emit('v-tap')
    }
  }
}
</script>

<style lang="scss" scoped>
div.bigBtn {
  height: .98rem;
  margin: 0 .22rem; 
  background: rgba(64, 157, 229, 1);
  border-radius:.10rem;
  font-size:.32rem; 
  color: rgba(255, 255, 255, 1);
  line-height: .98rem;
  text-align: center;
}
div.bigBtn.active {
  background: darken(rgba(64, 157, 229, 1), 5%);
}
</style>
