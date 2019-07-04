<template>
  <div>
    <div class="_headerContainer ">
      <div class="black2" :style="{height:statusbarHeight+'px'}"></div>
      <div class="root-el">
        <span v-vtap="{method:tabTap}" :data-tabi='i' :key="i" v-for='(item,i) in titleList'>
          <span :class="{now:tabI==i}" :data-tabi='i'>{{item.name}}</span>
        </span>
      </div>
    </div>
    <div :style="{height:statusbarHeight+44+'px'}"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['titleList', 'tabI'],
  computed: mapState(['statusbarHeight']),
  data() {
    return {
    }
  },
  methods: {
    tabTap(e) {
      this.$emit('tab-tap', e.target.dataset.tabi)
    }
  },
  watch: {

  }
}
</script>

<style lang="scss" >
._headerContainer {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 50;
  background-image: linear-gradient(
    4deg,
    rgba(255, 72, 72, 1) 0%,
    rgba(255, 91, 79, 1) 100%
  );
  .root-el {
    text-align: center;
    height: 44px;
    font-size: 16px;
    line-height: 44px;
    position: relative;
    color: #fff;
    > span {
      font-size: 15px;
      line-height: 44px;
      padding: 0 0.25rem;
      span.now {
        padding-bottom: 0.19rem;
        border-bottom: 0.04rem solid #fff;
      }
    }
  }
}
</style>
