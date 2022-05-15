<template>
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
        <tr v-if="secondsSinceUpdate > 60">
          <td class="table-danger" colspan="3">
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
            Data nejsou aktualizována
          </td>
        </tr>
        <tr v-for="trip in tripData.trip" :key="trip.sequence" :class="{ 'table-success' : trip.isAtStation === 1}">
          <td> {{ trip.station }}</td>
          <td><format-time :departure="trip.departure" /></td>
          <td> <template v-if="trip.isAtStation === 1"><delay-counter :departure="trip.departure"></delay-counter></template></td>
        </tr>
        <tr v-if="tripData.line == null">
          <td colspan="3">Spoj již dojel</td>
        </tr>
      </tbody>
    </table>

</template>

<script>
import DelayCounter from "../components/DelayCounter";
import FormatTime from "../components/FormatTime";
import TheTime from "../components/TheTime";
import { DateTime, Interval } from "luxon";

export default {
  components: { TheTime, FormatTime, DelayCounter },
  name: "Trip",
  data() {
    return {
      tripData: [],
      playersIdData: [],
      playerId: null,
      tripQuery: this.$route.query.spoj,
      url: process.env.VUE_APP_ROOT_API + "spoj/" + this.$route.params.playerId,
      interval: null,
      timeInterval: null,
      time: null,
      timeStation: null,
      secondsSinceUpdate: null
    };
  },
  created() {
    this.callTripDetail();
   // this.timeInterval = setInterval(() => this.getCurrentTime(), 1000);
    this.interval = setInterval(() => this.callTripDetail(), 10000);
  },
  methods: {
    async callTripDetail() {
      //clearInterval(this.interval)
      const response = await fetch(this.url);
      this.tripData = await response.json();

      this.updated();
    },
    updated() {
      this.secondsSinceUpdate = Interval.fromDateTimes(DateTime.fromISO(this.tripData.dataGenerated), DateTime.now()).length("seconds");
      if (this.tripData.dataGenerated == null) this.secondsSinceUpdate = 600;
      console.log(this.secondsSinceUpdate);
    },
    getCurrentTime() {
      this.time = Intl.DateTimeFormat(navigator.language, {
        hour: "numeric", minute: "numeric", second:"numeric"
      }).format();
    }
  },
  beforeUnmount() {
    clearInterval(this.interval)
   // clearInterval(this.timeInterval)
  }
};
</script>

<style scoped>

</style>