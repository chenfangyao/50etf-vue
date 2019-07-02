<template>
  <div class="hwrap black1">
    <s-icon icon-class="my_page_bg" v-if="!atNight"></s-icon>
    <header-title></header-title>
    <sub-card></sub-card>
  </div>
</template>
<script>
import headerTitle from './sub/headerTitle.vue'
import subCard from './sub/subCard.vue'
import { mapState } from 'vuex';

export default {
  components: { subCard, headerTitle },
  computed: mapState(['atNight']),

}
</script>
<style lang="scss" scoped>
div.hwrap {
  height: 4.3rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-radius: 0 0 25% 25%;
  .s-icon {
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 4.27rem;
    position: absolute;
    z-index: -30;
  }
}
</style>
