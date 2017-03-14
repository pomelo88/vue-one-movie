<template>
  <div class="comment">
    <loading v-if="loading"></loading>
    <div v-if="!loading">
      <div class="header-title">
        <div class="go-back" @click="goBack"></div>
        <h2>{{ comment.subject.title }} 的影评</h2>
      </div>
      <div class="bx">
        <div class="comments-box" v-for="item in comment.reviews">
          <img :src="item.author.avatar"/>
          <span>{{ item.author.name }}</span>
          <div class="content">
            <p class="word">{{ item.content }}</p>
            <div class="info">
              <span>{{ item.created_at }}</span>
              <p>{{ item.useful_count }} 赞同<span class="right">{{ item.useless_count }} 反对</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import loading from './loading/Loading'
  export default {
    name: 'comment',
    data () {
      return {
        loading: true,
        comment: {
          subject: {
            title: ''
          }
        }
      }
    },
    components: {
      loading: loading
    },
    mounted: function () {
      this.$http.jsonp('https://api.douban.com/v2/movie/subject/' + this.$route.params.id + '/reviews?apikey=0b2bdeda43b5688921839c8ecb20399b&start=0&count=20&client=something&udid=dddddddddddddddddddddd')
        .then(function (res) {
          this.comment = res.body
          this.loading = false
          console.log(res.body)
        })
    },
    methods: {
      goBack: function () {
        window.history.go(-1)
      }
    }
  }
</script>

<style scoped>
.header-title {
  height: 40px;
  line-height: 40px;
  background-color: #fbd229;
  color: #fff;
  text-align: center;
  font-size: 16px;
  position: relative;
}
.go-back {
  position: absolute;
  top: 12px;
  left: 20px;
  width: 13px;
  height: 13px;
  border: 2px solid #fff;
  border-width: 0 0 2px 2px;
  transform: rotate(45deg);
  cursor: pointer;
}
.comments-box {
  margin-bottom: 30px;
}
.comments-box img {
  border-radius: 50%;
  display: inline-block;
  margin-right: 10px;
  vertical-align: middle;
}
.comments-box .content {
  border-radius: 5px;
  background-color: #eee;
  padding: 10px 30px;
  margin-top: 10px;
  margin-left: 60px;
}
.comments-box .content .word{
  margin-bottom: 10px;
}
.comments-box .content .info span{
  font-size: 12px;
  color: #bbb;
}
.comments-box .content .info p{
  float: right;
  font-size: 12px;
  color: #1d6fa0;
}
.comments-box .content .info p .right{
  margin-left: 10px;
}
.bx {
  padding: 15px 20px;
}
</style>
