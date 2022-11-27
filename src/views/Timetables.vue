<template>
  <div class="primary">
    <div class="title">
      <div class="align-items-center row flex-fill">
        <div class="col text-center text-sm-start pb-3 pb-sm-0">
          <h2>Jízdní doby</h2>
        </div>
      </div>
    </div>
  </div>

  <div class="board">
    <div class="boardHeader d-none d-sm-flex">
      <div class="col-12">
        Poslední aktualizace dat: <format-date-time :datetime="timetables.dataGenerated" />
      </div>
    </div>
    <div class="boardData col-12 col-md-6" v-for="timetable in timetables.timelines" :key="timetable.lineNumber">
      <b>{{ timetable.lineNumber }} {{ timetable.startStation }} - {{ timetable.endStation }}</b>
      <table class="table table-sm table-borderless table-striped">
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="station in timetable.stations" :key="station.name" class="d-flex">
           <!-- <td v-for="timeS in station.times_noc_A.slice().reverse()" :key="timeS" class="table-secondary border-start col-0-75 text-end"> {{ timeS }}</td>-->
            <td v-for="timeS in station.times_spicka_A.slice().reverse()" :key="timeS" class="border-start col-0-75 text-end"> {{ timeS }}</td>
            <td class="border-start table-secondary col-4">{{ station.name }}</td>
            <td v-for="timeS in station.times_spicka_B" :key="timeS" class="border-start col-0-75 text-end"> {{ timeS }}</td>
          <!--  <td v-for="timeS in station.times_noc_B" :key="timeS" class="table-secondary border-start col-0-75 text-end"> {{ timeS }}</td>-->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import FormatDateTime from "../components/FormatDateTime";
export default {
  name: "Timetables.vue",
  components: { FormatDateTime },
  data() {
    return {
      timetables: []
    };
  },
  created() {
    this.callData();
  },
  methods: {
    async callData() {
      const response = await fetch(process.env.VUE_APP_ROOT_API + "jizdnidoby");
      this.timetables = await response.json();
    }
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
  width:6.2499999975%}

</style>