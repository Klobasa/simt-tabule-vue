<template>
  <p><b>{{ timetable.lineNumber }} {{ timetable.startStation }} - {{ timetable.endStation }}</b></p>
  <div class="d-flex flex-row align-items-start flex-wrap">
    <div class="btn-group btn-group-sm d-inline-block" role="group" aria-label=" ">
      <input v-if="isCelyDen" type="radio" class="btn-check" name="btnradio" :id="timetable.lineNumber+'celyDen'" autocomplete="off" v-model="picked" value="celyDen" :checked="isCelyDen">
      <label v-if="isCelyDen" class="btn btn-outline-secondary" :for="timetable.lineNumber+'celyDen'">Celý den</label>

      <input v-if="isDen && !isCelyDen" type="radio" class="btn-check" name="btnradio" :id="timetable.lineNumber+'den'" autocomplete="off" v-model="picked" value="den" :checked="!isCelyDen">
      <label v-if="isDen && !isCelyDen" class="btn btn-outline-secondary" :for="timetable.lineNumber+'den'">Den</label>

      <input v-if="!isDen" type="radio" class="btn-check" name="btnradio" :id="timetable.lineNumber+'sedlo'" autocomplete="off" v-model="picked" value="sedlo">
      <label v-if="!isDen" class="btn btn-outline-secondary" :for="timetable.lineNumber+'sedlo'">Sedlo</label>

      <input v-if="!isDen" type="radio" class="btn-check" name="btnradio" :id="timetable.lineNumber+'spicka'" autocomplete="off" v-model="picked" value="spicka">
      <label v-if="!isDen" class="btn btn-outline-secondary" :for="timetable.lineNumber+'spicka'">Špička</label>

      <input v-if="!isCelyDen" type="radio" class="btn-check" name="btnradio" :id="timetable.lineNumber+'noc'" autocomplete="off" v-model="picked" value="noc">
      <label v-if="!isCelyDen" class="btn btn-outline-secondary" :for="timetable.lineNumber+'noc'">Noc</label>
    </div>
    <div class="d-inline-block">
      <p class="casyIndexPrepravy" v-show="picked === 'noc'">20:00 - 5:59</p>
      <p class="casyIndexPrepravy" v-show="picked === 'sedlo'">10:00 - 12:59, 17:00-19:59</p>
      <p class="casyIndexPrepravy" v-show="picked === 'spicka'">6:00 - 9:59,  13:00-16:59</p>
      <p class="casyIndexPrepravy" v-show="picked === 'den'">6:00 - 19:59</p>
      <p class="casyIndexPrepravy" v-show="picked === 'celyDen'">0:00-23:59</p>
    <!-- <p> {{ isDen }}, {{ isCelyDen }}, {{ picked }}</p>-->
    </div>
  </div>
  <table class="table table-sm table-borderless table-striped">
    <thead>
    <tr>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="station in timetable.stations" :key="station.name" class="d-flex">
      <td v-show="picked === 'noc'" v-for="timeS in station.times_noc_A.slice().reverse()" :key="timeS" class="border-start col-0-75 text-end"> {{ timeS }}</td>
      <td v-show="picked === 'sedlo'" v-for="timeS in station.times_sedlo_A.slice().reverse()" :key="timeS" class="border-start col-0-75 text-end"> {{ timeS }}</td>
      <td v-show="showSpicka.includes(picked)" v-for="timeS in station.times_spicka_A.slice().reverse()" :key="timeS" class="border-start col-0-75 text-end"> {{ timeS }}</td>
      <td class="border-start table-secondary col-4">{{ station.name }}</td>
      <td v-show="showSpicka.includes(picked)" v-for="timeS in station.times_spicka_B" :key="timeS" class="border-start col-0-75 text-end"> {{ timeS }}</td>
      <td v-show="picked === 'sedlo'" v-for="timeS in station.times_sedlo_B" :key="timeS" class="border-start col-0-75 text-end"> {{ timeS }}</td>
      <td v-show="picked === 'noc'" v-for="timeS in station.times_noc_B" :key="timeS" class="border-start col-0-75 text-end"> {{ timeS }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "TimeTable.vue",
  props: ["timetable"],
  data() {
    return {
      isDen: JSON.stringify(this.timetable.stations[0].times_spicka_B) === JSON.stringify(this.timetable.stations[0].times_sedlo_B)
              && JSON.stringify(this.timetable.stations[this.timetable.stations.length-1].times_spicka_A) === JSON.stringify(this.timetable.stations[this.timetable.stations.length-1].times_sedlo_A),
      isCelyDen: (JSON.stringify(this.timetable.stations[0].times_noc_B) === JSON.stringify(this.timetable.stations[0].times_sedlo_B)
              && JSON.stringify(this.timetable.stations[this.timetable.stations.length-1].times_noc_A) === JSON.stringify(this.timetable.stations[this.timetable.stations.length-1].times_sedlo_A))
              && JSON.stringify(this.timetable.stations[0].times_spicka_B) === JSON.stringify(this.timetable.stations[0].times_sedlo_B)
              && JSON.stringify(this.timetable.stations[this.timetable.stations.length-1].times_spicka_A) === JSON.stringify(this.timetable.stations[this.timetable.stations.length-1].times_sedlo_A),
      showSpicka: ["spicka", "den", "celyDen"],
      picked: "den"
    };
  },
  computed: {
    /**
    isDenPicked() {
      return this.isCelyDen ? "celyDen" : "den";
    },
    isDen() {
      return JSON.stringify(this.timetable.stations[0].times_spicka_B) === JSON.stringify(this.timetable.stations[0].times_sedlo_B)
      && JSON.stringify(this.timetable.stations[this.timetable.stations.length-1].times_spicka_A) === JSON.stringify(this.timetable.stations[this.timetable.stations.length-1].times_sedlo_A);
    },
    isCelyDen() {
      return JSON.stringify(this.timetable.stations[0].times_noc_B) === JSON.stringify(this.timetable.stations[0].times_sedlo_B)
        && JSON.stringify(this.timetable.stations[this.timetable.stations.length-1].times_noc_A) === JSON.stringify(this.timetable.stations[this.timetable.stations.length-1].times_sedlo_A)
        && this.isDen;
    }
     */
  }
};
</script>

<style scoped>
table.table tbody tr td{
  border-left: 2px #6c757d;
  padding-top: 0;
  padding-bottom: 0;

}
table.table tbody tr:hover{
  font-weight: bold;
}

.col-0-75{
  flex:0 0 auto;
  width:6.2499999975%;
}

.casyIndexPrepravy {
  margin: 0;
  padding: 3px 3px 3px 10px;
}

</style>