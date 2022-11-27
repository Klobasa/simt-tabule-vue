<template>
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </symbol>
  </svg>
  <div v-bind:style="{ 'backgroundImage': 'url(' + require('./assets/background/2.jpg') + ')' }">
    <div class="container mt-5 mb-5 d-inline-block">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/zastavky">Panely odjezdů</router-link> |
        <router-link to="/spoj">Spoje</router-link> |
        <router-link to="/jizdniDoby">Jízdní Doby</router-link>
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

.line .tram {
  background-color: #f0be32;
}

.line .trolleybus {
  background-color: #1e9641;
}

.line .bus {
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

.biggerFont {
  font-size: 1.1em;
}
</style>
