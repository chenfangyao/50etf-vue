<template>
  <div>
    <div class="_headerContainer">
      <div class="occupy"></div>
      <div class="root-el">
        <span v-vtap="{method:tabTap}"  :data-tabi='i' :key="i"  v-for='(item,i) in titleList'>
          <span :class="{now:tabI==i}" :data-tabi='i'>{{item.name}}</span>
        </span>
      </div>
    </div>
    <div class="h44"></div>
  </div>
</template>

<script>
export default {
  props: ['titleList','tabI'],
  data() {
    return {
    }
  },
  methods: {
    tabTap(e) {
      this.$emit('tab-tap',e.target.dataset.tabi)
    }
  },
  watch:{

  }
}
</script>

<style lang="scss" >
div.h44 {
  height: 44px;
}
._headerContainer {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 50;
  background-color: #fff;
  div.root-el {
    text-align: center;
    height: 44px;
    font-size: 16px;
    line-height: 44px;
    position: relative;
    >span {
      font-size: 15px;
      color: rgba(153, 153, 153, 1);
      line-height: 44px;
      padding:0 0.25rem;
      span.now {
      padding-bottom:.19rem;
        border-bottom:.04rem solid #409DE5;
        color: #409de5;
      }
    }
  }
  .occupy {
    height: var(--status-bar-height);
  }
}
</style>
