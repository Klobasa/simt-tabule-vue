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

    <div class="errors" v-if="stationData.length === 0">
      <div class="alert alert-danger" v-for="error in errors" :key="error">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
        {{ error }}
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

      <tr v-if="timeFromLastRespond > 1.5">
        <td class="table-danger" colspan="5">
          Nelze aktualizovat data. Poslední aktualizace: <format-date-time :datetime="stationData.dataGenerated" :datetimeFormat="'HH:mm:ss'"/>
        </td>
      </tr>

      <tr v-for="station in stationData.departures" :key="station.id" :class="{'arrival' : station.endStation === stationData.stationName}" v-show="station.endStation !== stationData.stationName || showArrivals">
        <th>
          <div class="line">
            <div :class="[station.traction === 2 ? 'tram' : station.traction === 1 ? 'trolleybus' : station.traction === 0 ? 'bus' : 'tractionUndefined']">
              {{ station.route.startsWith("X") ? station.line + "X" : station.line }}
              <img src="../assets/line/tram.svg" alt="" v-if="station.traction === 2">
              <img src="../assets/line/trolleybus.svg" alt="" v-if="station.traction === 1">
              <img src="../assets/line/bus.svg" alt="" v-if="station.traction === 0">
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
import { DateTime, Interval } from "luxon";
import FormatDateTime from "../components/FormatDateTime";

export default {
  name: "Station",
  components: { FormatDateTime, TheTime, Toggle },
  data() {
    return {
      stationData: [],
      interval: null,
      error: null,
      url: process.env.VUE_APP_ROOT_API + "zastavky/" + this.$route.params.stationId,
      information: null,
      showArrivals: true,
      errors: [],
      timeFromLastRespond: 0,
    };
  },
  created() {
    this.showArrivals = this.$cookie.isCookieAvailable("showArrivals") ? this.$cookie.getCookie("showArrivals") : false;
    this.callStationData();
    this.interval = setInterval(() => this.callStationData(), 10000);
  },
  methods: {
    async callStationData() {
      try {
        const response = await fetch(this.url);
        if (response.ok) {
          this.stationData = await response.json();
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

      this.timeFromLastRespond = Interval.fromDateTimes(DateTime.fromISO(this.stationData.dataGenerated), DateTime.now()).length("minutes");
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