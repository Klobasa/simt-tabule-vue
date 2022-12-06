<template>
  <div>
    <div class="primary">
      <div class="title">
        <div class="align-items-center row flex-fill">
          <div class="col text-center text-sm-start pb-3 pb-sm-0">
            <h2>Zastávky</h2>
          </div>
          <div class="col-12 col-sm-7 col-md-5 col-lg-4 text-sm-end">
            <input type="text" spellcheck="false" placeholder="Vyhledat zastávku" autocomplete="off" class="form-control px-2" v-model="this.queryStation" @keyup="filterStations">
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="board">
    <div class="boardHeader d-none d-sm-flex">
      <div class="col-12 col-sm-6 col-md-4">Zastávka</div>
      <div class="col-12 col-sm-6 col-md-8">Linky</div>
    </div>

    <div class="alert alert-primary" v-if="loading===true">
      <img src="../assets/loading.gif" width="24"/>
      Načítání...
    </div>
    <div class="alert alert-danger" v-if="loading === false && stations.length === 0">
      <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
      Seznam zastávek se nepodařilo načíst
    </div>

    <div class="boardData" v-for="station in filteredStations.stations || filteredStations" :key="station.id">
      <div class="boardDataPrimary">
        <div class="col-12 col-sm-6 col-md-4"><router-link :to="{path: '/zastavky/' + station.urlName}"><span class="boardButton">{{ station.name }}</span></router-link></div>
        <div class="col-12 col-sm-6 col-md-8 d-flex flex-row align-items-start flex-wrap">
          <div v-for="line in station.lines" :key="line" class="line d-inline-block">
            <div :class="line.traction" class="px-2 py-1 mr-1">
              <span>{{ line.line }}</span>
              <img src="../assets/line/tram.svg" alt="" v-if="line.traction === 'tram'">
              <img src="../assets/line/trolleybus.svg" alt="" v-if="line.traction === 'trolleybus'">
              <img src="../assets/line/bus.svg" alt="" v-if="line.traction === 'bus'">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="alert alert-warning" v-if="filteredStations.length === 0 && queryStation.length>0">
      <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
      Hledaná zastávka neexistuje
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "Stations.vue",
  data() {
    return {
      stations: [],
      queryStation: "",
      filteredStations: [],
      loading: true,
    };
  },
  created() {
    this.callData();
  },
  methods: {
    async callData() {
      this.loading = true;
      const response = await fetch(process.env.VUE_APP_ROOT_API + "zastavky")
      this.stations = await response.json();
      this.filteredStations = this.stations;
      this.loading = false;
    },
    async filterStations() {
      this.filteredStations = computed(() => {
        return this.stations.stations.filter(s => s.name.toLowerCase().includes(this.queryStation.toLowerCase())
        );
      })
    }
  }
};
</script>

<style scoped>

</style>