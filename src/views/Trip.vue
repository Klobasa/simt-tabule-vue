<template>
  <div id="spojForm" >
    <select v-model="playerId" @change="callTripDetail()">
      <option disabled selected value="">Hráč</option>
      <option v-for="player in playersIdData.players" :key="player.id">{{ player.playerId }}</option>
    </select>
    <p> {{ playerId }}</p>
    <div class="container">
      <div class="row">
        <div class="col-10" style="text-align: left"><h3>{{ tripData.line }} » {{ tripData.endStation }}</h3></div>
        <div class="col-2" style="text-align: right"><h3><the-time /></h3></div>
      </div>
    </div>
    <table class="table table-striped">
      <thead>
        <th scope="col">Stanice</th>
        <th scope="col">Čas odjezdu</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="trip in tripData.trip" :key="trip.sequence" :class="{ 'table-success' : trip.isAtStation === 1}">
          <td> {{ trip.station }}</td>
          <td><format-time :departure="trip.departure" /></td>
          <td> <template v-if="trip.isAtStation === 1"><delay-counter :departure="trip.departure"></delay-counter></template></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import DelayCounter from "../components/DelayCounter";
import FormatTime from "../components/FormatTime";
import TheTime from "../components/TheTime";

export default {
  components: { TheTime, FormatTime, DelayCounter },
  el: "#spojFrom",
  name: "Trip",
  data() {
    return {
      tripData: [],
      playersIdData: [],
      playerId: null,
      tripQuery: this.$route.query.spoj,
      url: "",
      interval: null,
      timeInterval: null,
      time: null,
      tripInterval: null,
      timeStation: null
    };
  },
  created() {
    this.callPlayersId();
    this.timeInterval = setInterval(() => this.callCurrentTime(), 1000);
  },
  methods: {
    async callPlayersId() {
      const response = await fetch(this.beUrl + "playersId")
      this.playersIdData = await response.json();
    },
    async callTripDetail() {
      clearInterval(this.interval)
      this.url = this.beUrl + "spoj/" + this.playerId;
      const response = await fetch(this.url);
      this.tripData = await response.json();
      console.log(this.tripData);
      this.interval = setInterval(() => this.callTripDetail(), 10000);
    },
    callCurrentTime() {
      this.time = Intl.DateTimeFormat(navigator.language, {
        hour: "numeric", minute: "numeric", second:"numeric"
      }).format();
    }
  },
  beforeUnmount() {
    clearInterval(this.interval)
    clearInterval(this.timeInterval)
    clearInterval(this.tripInterval)
  }
};
</script>

<style scoped>

</style>