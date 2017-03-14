<template>
  <div>
    <div class="header">
      <div class="logo">
        <a href="#/released"><img src="../../assets/logo.jpg" alt="One 电影"/></a>
      </div>
      <div class="search">
        <input type="text" placeholder="请输入电影名" v-model="name" @keyup.enter="search()"/>
      </div>
      <div class="title">
        <h1>One 电影</h1>
        <p>皮皮虾，我们去看电影</p>
      </div>
    </div>
    <div class="nav">
      <router-link to="/released" class="item" :class="{ active: nav === 1 }">正在热映</router-link>
      <router-link to="/forthcoming" class="item" :class="{ active: nav === 2 }">即将上映</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'header',
    props: ['nav'],
    data () {
      return {
        name: ''
      }
    },
    methods: {
      search: function () {
        this.$router.push({ path: '/search', query: { name: this.name.trim() } })
      }
    }
  }
</script>

<style scoped>
.header {
  height: 40px;
  padding: 10px 20px;
  text-align: center;
  background-color: #fbd229;
}
.logo {
  float: left;
}
.logo img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.title {
  display: inline-block;
  color: #fff;
}
.title p {
  font-size: 12px;
}
.nav {
  height: 40px;
  border-bottom: 1px solid #eee;
}
.nav .item {
  float: left;
  width: 50%;
  text-align: center;
  line-height: 40px;
  color: #000;
}
.nav .item.router-link-active {
  color: #f98c00;
  border-bottom: 2px solid #f98c00;
  margin-top: -1px;
}
.search {
  float: right;
  width: 90px;
  height: 30px;
  background-color: #fff;
  border-radius: 5px;
  margin-top: 6px;
  padding: 0 5px;
}
.search input {
  width: 100%;
  border: none;
  background: none;
  line-height: 30px;
  cursor: pointer;
}
</style>
