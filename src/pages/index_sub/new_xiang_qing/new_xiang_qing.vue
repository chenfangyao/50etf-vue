<template>
  <div class="wrap">
    <base-header title="资讯详情" :hasBack="true"></base-header>
    <div class="grayline"></div>
    <div class="artconent">
      <div>
        <div class="arttitle">
          <span>{{arttitle}}</span>
        </div>
        <div class="artlittle uni-flex newsViewTitle">
          <span>{{artlittle}}</span>
          <span>{{update_time}}</span>
        </div>
        <div class="artwenan" v-html="artwenan"></div>
      </div>
    </div>
  </div>
</template>

<script>
import util from '@/common/util.js'
import {
  mapState,
  mapMutations
} from 'vuex';
export default {
  data() {
    return {
      arttitle: '',
      artlittle: '',
      artwenan: '',
      update_time: '',
    };
  },
  computed: mapState(['atNight', 'sid']),
  methods: {},
  beforeRouteEnter(to, from, next){
    scrollTo(0,0)
    next()
  },
  beforeRouteLeave(to, from, next) {
    from.query.pop&&this.$store.commit('setarticlePop',true)
    next()
  },
  created() {
    var id = parseInt(this.$route.query.id)
    var options = {
      url: '/Sapi/Article/cont', 
      method: 'GET', 
      data: { id },
      context: '',
      header: {
        sid: this.sid || ""
      },
    }
    this.$httpReq(options).then((res) => {
      this.arttitle = res.data.title
      this.artlittle = res.data.source
      this.artwenan = res.data.content.replace(/<br \/>/g, "<br/> <span style='margin-left:2em'></span>")
      this.update_time = this.$formatetimestr(res.data.update_time)
    }).catch((err) => {
      
      console.error(err, '捕捉')
    })
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  padding-bottom: 0.1px;
  min-height: 100vh;

}
.artconent {
  text-align: center;
  margin: 10px 15px;
}

.grayline {
  background-color: #a8a8a8;
  height: 0.01rem;
}

div.newsViewTitle {
  justify-content: space-between;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: #a8a8a8;
  margin: 0.2rem.38rem.24rem;

  span:last-child {
    // color: #a8a8a8;
  }
}

div.arttitle {
  justify-content: space-between;
  font-size: 18px;
  font-family: MicrosoftYaHei;
}

div.artwenan {
  font-size: 16px;
  text-align: left;
  text-indent: 2em;
  font-family: MicrosoftYaHei;
  color: #a8a8a8;
  margin: 0.4rem 0;
}
</style>
