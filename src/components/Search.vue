<template>
  <div class="search">
    <vHeader></vHeader>
    <div class="search-info">
      “{{ name }}”的搜索结果，共 {{ count }} 条信息
    </div>
    <loading v-if="loading"></loading>
    <div class="films-box" v-if="!loading">
      <div class="films-item" v-for="film in films" @click="showMovieMsg(film.id)">
        <div class="poster">
          <img :src="film.images.small" :alt="film.alt"/>
        </div>
        <div class="score">
          <h4><span :class="{ high: film.rating.average >= 7.5 }">{{ film.rating.average }}</span> 分</h4>
          <p>{{ film.collect_count }} 人看过</p>
        </div>
        <div class="message">
          <h3>{{ film.title }} ({{ film.year }})</h3>
          <p class="genre">
            <span v-for="genre in film.genres">{{ genre }}</span>
          </p>
          <p class="director">导演：<span v-for="item in film.directors">{{ item.name }}</span></p>
          <p class="actor">
            主演：
            <span v-for="actor in film.casts">{{ actor.name }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import header from './header/Header'
  import loading from './loading/Loading'
  export default {
    name: 'search',
    data () {
      return {
        name: '',
        count: 0,
        films: []
      }
    },
    components: {
      vHeader: header,
      loading: loading
    },
    created: function () {
      this.getSearch()
    },
    methods: {
      getSearch: function () {
        this.name = this.$route.query.name
        this.count = 0
        this.loading = true
        this.$http.jsonp('https://api.douban.com/v2/movie/search?q=' + this.name)
          .then((res) => {
            console.log(res)
            this.films = res.body.subjects
            this.count = res.body.total
            this.loading = false
          })
      },
      showMovieMsg: function (id) {
        const path = '/movie/' + id
        this.$router.push({ path: path })
      }
    },
    watch: {
      '$route': 'getSearch'
    }
  }
</script>

<style scoped>
.search-info {
  line-height: 40px;
  text-align: center;
  background-color: #f2faff;
}
.films-item {
  padding: 10px 20px; 
  height: 100px;
  cursor: pointer;
  // border-bottom: 1px solid #eee;
}
.poster {
  float: left;
  width: 65px;
  height: 100px;
  border-radius: 4px;
  overflow: hidden;
}
.message {
  margin: 0 85px 0 75px;
  height: 100%;
}
.message h3 {
  line-height: 30px;
  font-size: 16px;
}
.message .genre span{
  font-size: 12px;
  border: 1px solid #f98c00;
  color: #f98c00;
  border-radius: 3px;
  margin-right : 5px;
  padding: 0 5px;
}
.message .director {
  font-size: 12px;
  color: #888;
  margin: 4px 0;
}
.message .actor {
  font-size: 12px;
  color: #bbb;
}
.message .actor span {
  margin-right: 8px;
}
.score {
  float: right;
  width: 85px;
  height: 100%;
  text-align: right;
}
.score h4 {
  line-height: 30px;
}
.score p {
  font-size: 12px;
  color: #888;
}
.score .high {
  color: #f98c00;
  font-weight: 700;
}
</style>
