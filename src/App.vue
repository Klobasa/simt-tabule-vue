<template>
  <div v-bind:style="{ 'backgroundImage': 'url(' + require('./assets/background/2.jpg') + ')' }">
    <div class="container mt-5 mb-5 d-inline-block">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/zastavky">Zastávky</router-link> |
        <router-link to="/spoj">Spoj</router-link>
      </div>
      <router-view />
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.container {
  background-color: white;
}

.primary {
  background-color: #e9ecef;
}

.primary, .title {
  border-radius: 0.25rem;
}

.primary, .title {
  padding: 0.5rem !important;
}

.title {
  min-height: 3.5rem;
}
</style>
