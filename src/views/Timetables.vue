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
        Poslední aktualizace dat: <format-date-time :datetime="timetables.dataGenerated" :datetimeFormat="'dd.MM.yyyy HH:mm:ss'" />
      </div>
    </div>
    <div class="boardData col-12 col-md-6" v-for="timetable in timetables.timelines" :key="timetable.lineNumber">
      <time-table :timetable="timetable"></time-table>
    </div>
  </div>
</template>

<script>
import FormatDateTime from "../components/FormatDateTime";
import TimeTable from "../components/TimeTable";
export default {
  name: "Timetables.vue",
  components: { TimeTable, FormatDateTime },
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

</style>