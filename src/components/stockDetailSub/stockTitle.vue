<template>
  <div>
    <div class="wrap">
      <div class="occupy"></div>
      <div class="wrap2">
        <div class="left" @click="back">
          <img src="../../assets/arrow/l.png" />
        </div>
        <div>
          <h4>{{commonstock[index].stockName}} </h4>
          <h5>{{commonstock[index].stockCode}}</h5>
        </div>
      </div>
    </div>
    <div class="h44"></div>
  </div>
</template>
 <script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
    };
  },
  methods: {
    back() {
    this.$router.goBack()
    }
  },
  computed: mapState(['commonstock']),
  props: ['index'],
}
</script>
<style lang="scss" scoped>
div.h44 {
  height: 44px;
}
div.wrap {
  border-bottom: 1px solid #ededed;
  position: fixed;
  left: 0;
  right: 0;
  background-color: #fff;
  top: 0;
  z-index: 50;
  .wrap2 {
    height: 44px;
    padding-top:.12rem;
    position: relative;
  }
  .occupy {
    height: var(--status-bar-height);
  }
  > div {
    flex-grow: 1;
    text-align: center;
  }
  div.left {
    padding: 13px.20rem 0.30rem;
    height: 44px;
    position: absolute;
    left: 0;
    top: 0;
    img {
      width: 13px;
      height: 15px;
    }
  }
  h4 {
    font-size: 15px;
    font-weight: 400;
    color: rgba(24, 28, 40, 1);
    margin: 0;
    line-height: 15px;
    margin-bottom:.09rem;
  }
  h5 {
    font-size: 10px;
    font-weight: 400;
    color: rgba(24, 28, 40, 1);
    margin: 0;
    line-height: 10px;
    margin-bottom:.13rem;
  }
}
</style>
