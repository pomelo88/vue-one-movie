<template>
  <div class="movie">
    <loading v-if="loading"></loading>
    <div v-if="!loading">
      <div class="header-title">
        <div class="go-back" @click="goBack"></div>
        <h2>{{ movieMsg.title }}</h2>
      </div>
      <div class="movie-content">
        <div class="image">
          <img :src="movieMsg.images.medium"/>
        </div>
        <h3>{{ movieMsg.title }}</h3>
        <h4 v-for="item in movieMsg.languages">{{ item.indexOf('汉语') ? movieMsg.original_title : movieMsg.aka[0] }}</h4>
        <p class="score">{{ movieMsg.rating.average }} <span>({{ movieMsg.ratings_count }}人评分)</span></p>
        <p class="time" v-for="item in movieMsg.durations">{{ item }} {{ movieMsg.pubdate }}上映</p>
        <p class="genre">
          <span v-for="genre in movieMsg.genres">{{ genre }}</span>
        </p>
        <div class="summary">
          {{ movieMsg.summary }}
        </div>
      </div>
      <div class="creator">
        <h4>主创</h4>
        <div class="img-scroll">
          <div class="human" v-for="item in movieMsg.directors">
            <img :src="item.avatars.small"/>
            <p class="name">{{ item.name }}</p>
          </div>
          <div class="human" v-for="item in movieMsg.casts">
            <img :src="item.avatars.small"/>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </div>
      <div class="comments">
        <h4>用户评论</h4>
        <div class="comments-box" v-for="item in movieMsg.popular_comments">
          <img :src="item.author.avatar"/>
          <span>{{ item.author.name }}</span>
          <div class="content">
            <p class="word">{{ item.content }}</p>
            <div class="info">
              <span>{{ item.created_at }}</span>
              <p>{{ item.useful_count }} 赞</p>
            </div>
          </div>
        </div>
      </div>
      <router-link :to="{ name: 'Comment', params: { id: movieMsg.id } }" class="more-comments">查看全部 {{ movieMsg.comments_count }} 条影评</router-link>
    </div>
  </div>
</template>

<script>
import loading from './loading/Loading'
export default {
  name: 'movie',
  data () {
    return {
      loading: true,
      movieMsg: {
        rating: {
          average: 0
        },
        images: {
          medium: ''
        }
      }
    }
  },
  components: {
    loading: loading
  },
  mounted: function () {
    this.$nextTick(function () {
      const url = 'https://api.douban.com/v2/movie/subject/' + this.$route.params.id + '?apikey=0b2bdeda43b5688921839c8ecb20399b&city=%E5%8C%97%E4%BA%AC&client=something&udid=dddddddddddddddddddddd'
      this.$http.jsonp(url)
        .then(function (res) {
          console.log(res.body)
          this.movieMsg = res.body
          this.loading = false
        })
    })
  },
  methods: {
    goBack: function () {
      window.history.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
.movie-content {
  background-color: #f2faff;
  padding: 20px;
}
.movie-content h3 {
  font-size: 16px;
}
.movie-content h4 {
  font-size: 12px;
}
.score {
  padding: 10px 0;
}
.score span {
  margin-left: 5px;
  font-size: 12px;
}
.time {
  font-size: 12px;
}
.genre {
  padding: 4px 0;
}
.genre span{
  font-size: 12px;
  border: 1px solid #f98c00;
  color: #f98c00;
  border-radius: 3px;
  margin-right : 5px;
  padding: 0 2px;
}
.movie-content .image {
  float: right;
  border-radius: 12px;
  border: 3px solid #fbd229;
  overflow: hidden;
  box-shadow: 0 0 10px #999;
}
.summary {
  margin-top: 20px;
}
.creator {
  padding: 30px 20px;
}
.creator h4 {
  font-size: 16px;
  margin-bottom: 15px;
}
.human {
  width: 105px;
  margin: 5px 10px;
  display: inline-block;
  text-align: center;
}
.human img {
  margin: 0 auto;
  border-radius: 8px;
}
.comments {
  padding: 10px 20px;
}
.comments h4 {
  font-size: 16px;
  margin-bottom: 15px;
}
.comments-box {
  margin-top: 30px;
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
.more-comments {
  display: block;
  text-align: center;
  line-height: 40px;
  border-top: 1px solid #eee;
  margin-bottom: 20px;
}
</style>
