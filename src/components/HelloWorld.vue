<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Odjezdové tabule, seznam aktuálních spojů a jízdní doby linek
    </p>
    <h3>Work In Progress</h3>
    <p>
      Ve vývoji <br> Něco nemusí nefungovat, něco tu ještě není, něco možná přibude
    </p>
    <p>V případě dotazů, nápadů, nefunkčnosti můžete psát na discord Klobasa#1326 <small>(neposílat žádosti o přátelství)</small>.</p>

    <h3>Odkazy</h3>
    <ul>
      <li>
        <a href="https://simt-mhd.net/" target="_blank" rel="noopener">Oficiální stránka hry</a>
      </li>
      <li>
        <a href="https://1url.cz/@vozove_jizdni_rady" target="_blank" rel="noopener">Vozové JŘ by Tomáš Zeman</a>
      </li>
      <li>
        <router-link to="/changelog">Changelog</router-link>
      </li>
    </ul>
    <ul>
      <li>
        <router-link to="/dispecer">Dispečer</router-link>
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
