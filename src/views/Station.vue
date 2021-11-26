<template>
    <div class="row">
      <div class="col-8" style="text-align: left"><h1>{{ stationData.stationName }}</h1></div>
      <div class="col-4" style="text-align: right">
        <h2>
          <the-time />
        </h2>
      </div>
    </div>
    <div class="row">
      <div class="col" style="text-align: left"><h2>Panel odjezdů</h2></div>
      <div class="col" style="text-align: right">
       <small>Zobrazit zde končící spoje <Toggle v-model="showArrivals" @change="changeShowArrivals"/></small>
      </div>
    </div>

    <table class="table table-hover">
      <thead>
      <th scope="col">Linka</th>
      <th scope="col">Cílová stanice</th>
      <th colspan="2" scope="col">Čas odjezdu</th>
      <th scope="col">Zpoždění</th>
      </thead>
      <tbody>
      <tr v-for="station in stationData.departures" :key="station.id" :class="{'arrival' : station.endStation === stationData.stationName}" v-show="station.endStation !== stationData.stationName || showArrivals">
        <th>
          <div class="line">
            <div :class="station.traction">
              {{ station.route.startsWith("X") ? station.line + "X" : station.line }}
              <img src="../assets/line/tram.svg" alt="" v-if="station.traction === 'tram'">
              <img src="../assets/line/trolleybus.svg" alt="" v-if="station.traction === 'trolleybus'">
              <img src="../assets/line/bus.svg" alt="" v-if="station.traction === 'bus'">
            </div>
            <!--    <div class="triangle"></div> -->
          </div>

        </th>
        <th>{{ station.endStation }}</th>
        <td>
          <div style="text-align: right"
               :class="station.isAtStation === 1 && station.timeToDeparture < 1 ? 'blink_me' : ''">{{ station.departure }}
          </div>
        </td>
        <td>
          <div style="text-align: left">
            {{ station.delay === -1 ? station.timeToDeparture > 0 ? "± " + station.timeToDeparture : "± 0" : station.timeToDeparture > 0 ? station.timeToDeparture : "&lt; 1" }} min
          </div>
        </td>
        <td>{{ station.delay > 0 ? "+ " + station.delay : station.delay > -1 ? station.delay : "?" }} min</td>
      </tr>
      <tr v-if="stationData.departures && stationData.departures.length === 0">
        <td colspan="5">Nebyl nalezen žádný spoj.</td>
      </tr>
      <tr v-if="information !== null">
        <td colspan="5" id="scroll-container">
          <div id="scroll-text">{{ information }}</div>
        </td>
      </tr>
      </tbody>
    </table>
</template>

<script>
import TheTime from "../components/TheTime";
import Toggle from "@vueform/toggle";

export default {
  name: "Station",
  components: { TheTime, Toggle },
  data() {
    return {
      stationData: [],
      interval: null,
      error: null,
      url: "http://localhost:8080/zastavky/" + this.$route.params.stationId,
      information: null,
      showArrivals: true
    };
  },
  created() {
    this.showArrivals = this.$cookie.isCookieAvailable("showArrivals") ? this.$cookie.getCookie("showArrivals") : false;
    console.log(this.showArrivals)
    this.callStationData();
    this.interval = setInterval(() => this.callStationData(), 10000);
  },
  methods: {
    async callStationData() {
      const response = await fetch(this.url);
      this.stationData = await response.json();
    },
    changeShowArrivals() {
      this.$cookie.setCookie("showArrivals", this.showArrivals);
    }
  },

  beforeUnmount() {
    clearInterval(this.interval);
  }
};
</script>

<style scoped>


.arrival {
  font-style: italic;
  font-size: small;
}

.blink_me {
  animation: blinker 2s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}

.line.trolleybus .triangle {
  border-left: 0.75rem solid #1e9641;
}

.line .triangle {
  width: 0;
  height: 0;
  margin-left: -1px;
  border-top: 0.75rem solid transparent;
  border-bottom: 0.75rem solid transparent;
}

#scroll-container {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
}

#scroll-text {
  /* animation properties */
  -moz-transform: translateX(100%);
  -webkit-transform: translateX(100%);
  transform: translateX(100%);

  -moz-animation: my-animation 30s linear infinite;
  -webkit-animation: my-animation 30s linear infinite;
  animation: my-animation 30s linear infinite;
}

/* for Firefox */
@-moz-keyframes my-animation {
  from {
    -moz-transform: translateX(100%);
  }
  to {
    -moz-transform: translateX(-100%);
  }
}

/* for Chrome */
@-webkit-keyframes my-animation {
  from {
    -webkit-transform: translateX(100%);
  }
  to {
    -webkit-transform: translateX(-100%);
  }
}

@keyframes my-animation {
  from {
    -moz-transform: translateX(100%);
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
  to {
    -moz-transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
}

</style>
<style src="@vueform/toggle/themes/default.css"></style>