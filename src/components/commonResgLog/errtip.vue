<template>
  <div class="tip" :class="{errclass:errClass}">{{tipContent}}</div>
</template>
<script>
export default {
  props: ['errClass', 'tipContent']
}
</script>

<style scoped>
div.tip {
  font-size: 12px;
  color: #333;
  margin: -0.36rem auto 0.32rem;
  height: 0.72rem;
  opacity: 0;
  background-color: #d6d6d6;
  line-height: 0.72rem;
  text-align: center;
  border-radius: 2px;
  width: 3.3rem;
  transition: opacity 900ms;
}
div.tip.errclass {
  opacity: 1;
}
</style>
