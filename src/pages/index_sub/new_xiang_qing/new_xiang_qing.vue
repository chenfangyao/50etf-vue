<template>
  <div>
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
        <div class="artwenan" v-html="artwenan">
        </div>
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
  computed: mapState(['isWhite', 'sid']),
  methods: {},
  created(opts) {
    console.log('opts', opts)
    var id = parseInt(this.$route.query.id)
    var options = {
      url: '/Sapi/Article/cont', //请求接口
      method: 'GET', //请求方法全部大写，默认GET
      data: { id },
      context: '',
      header: {
        sid: this.sid || ""
      },
    }
    this.$httpReq(options).then((res) => {
      // 请求成功的回调
      // res为服务端返回数据的根对象
      console.log('文章详情', res)
      this.arttitle = res.data.title
      this.artlittle = res.data.source
      this.artwenan = res.data.content.replace(/<br \/>/g, "<br/> <span style='margin-left:2em'></span>")
      this.update_time = this.$formatetimestr(res.data.update_time)
    }).catch((err) => {
      // 请求失败的回调
      console.error(err, '捕捉')
    })
  }
}
</script>

<style lang="scss">
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
