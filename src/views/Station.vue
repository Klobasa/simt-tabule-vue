<template>
  <h2>{{ stationUrl }}</h2>
  <p>{{ url }}</p>
  <ul class="nav justify-content-end"><li class="nav-item">{{ time }}</li></ul>
  <table class="table table-striped table-hover">
    <thead>
    <th scope="col">Linka</th>
    <th scope="col">Cílová stanice</th>
    <th colspan="2" scope="col">Čas odjezdu</th>
    <th scope="col">Zpoždění</th>
    </thead>
    <tbody>
      <tr v-for="station in stationData" :key="station.id">
        <th>{{ station.line }}</th>
        <th>{{ station.endStation }}</th>
        <td><div :class="station.isAtStation === 1 && station.timeToDeparture < 1 ? 'blink_me' : ''">{{ station.departure }}</div></td>
        <td>{{ station.delay === -1 ? station.timeToDeparture > 0 ? "± "+station.timeToDeparture : "± 0" : station.timeToDeparture > 0 ? station.timeToDeparture : "&lt; 1" }} min</td>
       <!-- <td>{{ station.timeToDeparture > 0 ? station.timeToDeparture : station.delay === -1 ? "± "+station.timeToDeparture : "&lt; 1" }} min</td> -->
        <td>{{ station.delay > 0 ? "+ "+station.delay : station.delay > -1 ? station.delay : "?" }} min</td>
      </tr>
      <tr v-if="!stationData.length">
        <td colspan="5">Nebyl nalezen žádný spoj.</td>
      </tr>
    </tbody>
  </table>

  <ul>
    <li v-for="station in stationData" :key="station.id" >{{station.line}} {{station.endStation}} {{ station.departure }} +{{station.delay}} min </li>
  </ul>
</template>

<script>
export default {
  name: "Station",
  data() {
    return {
      stationData: [],
      interval: null,
      timeInterval: null,
      time: null,
      stationUrl: this.$route.params.stationId,
      url: "http://localhost:8080/zastavky/" + this.$route.params.stationId,
    };
  },
  created() {
    this.callStationData();
    this.interval = setInterval(() => this.callStationData(), 10000);
    this.timeInterval = setInterval(() => this.callCurrentTime(), 1000);
  },
  methods: {
    async callStationData() {
      const response = await fetch(this.url);
      this.stationData = await response.json();
    },
    callCurrentTime() {
      this.time = Intl.DateTimeFormat(navigator.language, {
        hour: "numeric", minute: "numeric", second:"numeric"
      }).format();
    }
  },

  beforeUnmount() {
    clearInterval(this.interval),
    clearInterval(this.timeInterval)
  }
};
</script>

<style scoped>
.blink_me {
  animation: blinker 2s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>