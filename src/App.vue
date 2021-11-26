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
  background-color: #e9ecef;
}

.line > .tram {
  background-color: #f0be32;
}

.line > .trolleybus {
  background-color: #1e9641;
}

.line > .bus {
  background-color: #cd2837;
}

.line {
  color: white;
}

.primary, .boardButton:hover {
  background-color: #6c757d !important;
}

.primary, .title, .boardData, .boardButton, .line>.bus, .line>.trolleybus, .line>.tram {
  border-radius: 0.25rem;
}

.primary, .title, .board .boardData {
  padding: 0.5rem !important;
}
.boardData .line {
  margin: 0.2rem;
}

.title {
  min-height: 3.5rem;
}

.board {
  text-align: left;
}

.board .boardHeader {
  padding: 0.5rem !important;
}

.board .boardData {
  background-color: #f8f9fa;
}

.board .boardData {
  margin-bottom: 0.5rem !important;
}

.boardButton {
  color: black;
  padding: 0.375rem 0.75rem;
  display: inline-block;
  font-size: 1.1em;
}

.boardButton:hover {
  color: #f8f9fa;
}

.board .boardData>.boardDataPrimary {
  -webkit-box-align: center !important;
  align-items: center !important;
  display: flex;
  flex-wrap: wrap;
}
</style>
