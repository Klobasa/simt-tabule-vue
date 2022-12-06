<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Pracovní název
    </p>
    <h3>Nevím, co sem napsat</h3>
    <p>
      Odjezdové tabule, seznam aktuálních spojů a jízdní doby linek
    </p>
    <h3>WIP</h3>
    <p>
      Ve vývoji <br> Něco nefunguje, něco tu není, něco možná přibude
    </p>

    <h3>Odkazy</h3>
    <ul>
      <li>
        <a href="https://simt-mhd.net/" target="_blank" rel="noopener">Oficiální stránka hry</a>
      </li>
      <li>
        <router-link to="/changelog">Changelog</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
