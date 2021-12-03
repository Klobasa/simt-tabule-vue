<template>
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </symbol>
  </svg>
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
    <div class="alert alert-danger" v-if="stations.length === 0">
      <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
      Seznam zastávek se nepodařilo načíst
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
      filteredStations: []
    };
  },
  created() {
    this.callData();
  },
  methods: {
    async callData() {
      const response = await fetch("http://89.221.222.235:8080/zastavky")
      this.stations = await response.json();
      this.filteredStations = this.stations;
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