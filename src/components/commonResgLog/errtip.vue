<template>
      <div class="tip" :class="{errclass:errClass}">{{tipContent}}</div>
</template>
<script>
export default {
  props:['errClass','tipContent']
}
</script>

<style scoped>
div.tip {
  font-size: 13px;
  color: rgba(240, 95, 92, 1);
  margin: -36upx 0.32rem;
  height:.36rem;
  opacity: 0;
}
div.tip.errclass {
  opacity: 1;
  transition: opacity 900ms;
}
</style>
