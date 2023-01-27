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

    <div class="alert alert-danger" v-for="error in errors" :key="error">
      <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
      {{ error }}
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
      timetables: [],
      errors: [],
    };
  },
  created() {
    this.callData();
  },
  methods: {
    async callData() {
      try {
        const response = await fetch(process.env.VUE_APP_ROOT_API + "jizdnidoby");
        if (response.ok) {
          this.timetables = await response.json();
          this.errors = [];
        } else {
          this.errors.push("Jízdní doby se nepodařilo načíst");
          this.errors.push(response.status);
        }
      } catch (e) {
        this.errors = [];
        this.errors.push("Jízdní doby se nepodařilo načíst");
        this.errors.push(e.toString());
      }
    }
  }
};
</script>

<style scoped>

</style>