<template>
  <div>
    <div class="primary">
      <div class="title">
        <div class="align-items-center row flex-fill">
          <div class="col text-center text-sm-start pb-3 pb-sm-0">
            <h2>Aktuální spoje</h2>
          </div>
          <div class="col-12 col-sm-7 col-md-5 col-lg-4 text-sm-end">
             Poslední aktualizace: <format-date-time :datetime="trips.timeGenerated" :datetime-format="'HH:mm:ss'"></format-date-time>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="board">
    <div class="boardHeader d-none d-md-flex">
      <div class="col-2"><strong>Linka</strong></div>
      <div class="col-3"><strong>Výchozí zastávka</strong></div>
      <div class="col-3"><strong>Aktuální zastávka</strong></div>
      <div class="col-3"><strong>Cílová zastávka</strong></div>
      <div class="col-1"><strong>Odchylka</strong></div>

    </div>

    <div class="alert alert-primary" v-if="loading===true">
      <img src="../assets/loading.gif" width="24"/>
      Načítání...
    </div>
    <div class="alert alert-info" v-if="loading === false && trips.length === 0">
      <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
      Nejede žádný spoj
    </div>

    <div class="alert alert-danger" v-for="error in errors" :key="error">
      <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
      {{ error }}
    </div>


    <div class="boardData" :class="[trip.line.traction === 2 ? 'tram' : trip.line.traction === 1 ? 'trolleybus' : trip.line.traction === 0 ? 'bus' : 'tractionUndefined']" v-for="trip in trips.tripHeader" :key="trip.id">
      <div class="boardDataPrimary">

        <!-- Smaller than md -->
        <div class="col-12 d-md-none d-flex">
          <div class="line flex-shrink-0">
            <div class="px-2 py-1 mr-1" :class="[trip.line.traction === 2 ? 'tram' : trip.line.traction === 1 ? 'trolleybus' : trip.line.traction === 0 ? 'bus' : 'tractionUndefined']">
              <router-link :to="{path: '/spoj/' + trip.id}"><span class="biggerFont boardButton">{{ trip.line.line }}&nbsp;</span></router-link>
              <img src="../assets/line/tram.svg" alt="" v-if="trip.line.traction === 2">
              <img src="../assets/line/trolleybus.svg" alt="" v-if="trip.line.traction === 1">
              <img src="../assets/line/bus.svg" alt="" v-if="trip.line.traction === 0">
            </div>
          </div>

          <div class="d-flex flex-wrap align-items-center">
            <div v-if="trip.startStation !== null">
              {{ trip.startStation.station }} <small>({{ trip.startStation.departure }})</small>&nbsp;
            </div>
            <div v-if="trip.endStation !== null">
              » <b>{{ trip.endStation.station }}</b> <small>({{ trip.endStation.departure }})</small>
            </div>
          </div>
        </div>
        <div class="col-12 d-md-none d-flex py-1 align-content-center">
          {{ trip.actualStation.station }}&nbsp;<small>({{ trip.actualStation.departure }})</small>
          &nbsp;<delay-counter :departure="trip.departureFromActualStation" v-if="trip.departureFromActualStation != null"></delay-counter>
        </div>

        <div class="col-2 d-none d-md-block">
          <div class="line d-inline-block">
            <div class="px-2 py-1 mr-1" :class="[trip.line.traction === 2 ? 'tram' : trip.line.traction === 1 ? 'trolleybus' : trip.line.traction === 0 ? 'bus' : 'tractionUndefined']">
              <router-link :to="{path: '/spoj/' + trip.id}"><span class="biggerFont boardButton">{{ trip.line.line }}&nbsp;</span></router-link>
              <img src="../assets/line/tram.svg" alt="" v-if="trip.line.traction === 2">
              <img src="../assets/line/trolleybus.svg" alt="" v-if="trip.line.traction === 1">
              <img src="../assets/line/bus.svg" alt="" v-if="trip.line.traction === 0">
            </div>
          </div>
        <!--  <div class="line"><span class="boardButton" :class="trip.line.traction">{{ trip.line.line }} » {{ trip.endStation }}</span></div> -->
        </div>


        <div class="col-3 d-none d-md-block">
          <b>{{ trip.startStation.station }}</b> <small>({{ trip.startStation.departure }})</small>
        </div>
        <div class="col-3 d-none d-md-block">
          <div class="d-inline-block" v-if="trip.actualStation !== null">
            {{ trip.actualStation.station }} <small>({{ trip.actualStation.departure }})</small>
          </div>
        </div>
        <div class="col-3 d-none d-md-block">
          <div class="d-inline-block" v-if="trip.endStation !== null">
            » <b>{{ trip.endStation.station }}</b> <small>({{ trip.endStation.departure }})</small>
          </div>
        </div>

        <div class="col-1 d-none d-md-block">
          <div class="d-inline-block">
            <delay-counter :departure="trip.departureFromActualStation" v-if="trip.departureFromActualStation != null"></delay-counter>
          </div>
        </div>

      </div>
      <!--</router-link>-->
    </div>
  </div>
</template>

<script>
import DelayCounter from "../components/DelayCounter";
import FormatDateTime from "../components/FormatDateTime";
export default {
  components: { DelayCounter, FormatDateTime },
  name: "Trips",
  data() {
    return {
      trips: [],
      timeInterval: null,
      loading: true,
      errors: [],
    };
  },
  created() {
    this.callData();
    this.timeInterval = setInterval(() => this.callData(), 10000);
  },
  methods: {
    async callData() {
      try {
        const response = await fetch(process.env.VUE_APP_ROOT_API + "spoj?man=false");
        if(response.ok) {
          this.trips = await response.json();
          this.errors = [];
        } else {
          this.errors.push("Spoje se nepodařilo načíst");
          this.errors.push(response.status);
        }
      } catch (e) {
        this.errors = [];
        this.errors.push("Spoje se nepodařilo načíst");
        this.errors.push(e.toString());
      }
      this.loading = false;
    }
  },
  beforeUnmount() {
    clearInterval(this.timeInterval);
  }
};
</script>

<style scoped>
.link-spanner{
  position:absolute;
  width:100%;
  height:100%;
  top:0;
  left: 0;
  z-index: 1;
}
.board > .tram {
  box-shadow: 5px 0 0 0 inset #f0be32;
}

.board > .trolleybus {
  box-shadow: 5px 0 0 0 inset #1e9641;
}

.board > .bus {
  box-shadow: 5px 0 0 0 inset #cd2837;
}

a {
  all: unset;
}
</style>