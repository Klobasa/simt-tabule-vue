<template>
  <td class="d-md-none" colspan="7" v-if="fp !== null">
    <b>{{ this.player.nick}}</b> - {{ this.player.sluzba }}
    <div class="d-flex">
      <div class="line flex-shrink-0">
        <div class="px-2 py-1 mr-1" :class="[this.fp.line.traction === 2 ? 'tram' : this.fp.line.traction === 1 ? 'trolleybus' : this.fp.line.traction === 0 ? 'bus' : 'tractionUndefined']">
          <router-link :to="{path: '/spoj/' + this.fp.id}"><span class="biggerFont boardButton">{{ this.fp.line.line }}&nbsp;</span></router-link>
        </div>
      </div>

      <div class="d-flex flex-wrap align-items-center px-2">
        <div v-if="this.fp.startStation !== null">
          {{ this.fp.startStation.station }} <small>({{ this.fp.startStation.departure }})</small>&nbsp;
        </div>
        <div v-if="this.fp.endStation !== null">
          » <b>{{ this.fp.endStation.station }}</b> <small>({{ this.fp.endStation.departure }})</small>
        </div>
      </div>
    </div>

    <div class="d-md-none d-flex flex-wrap justify-content-between py-1 align-content-center">
      <div>{{ fp.actualStation.station }}&nbsp;<small>({{ fp.actualStation.departure }})</small></div>
      <div class="align-content-end"><delay-counter :departure="fp.departureFromActualStation" v-if="fp.departureFromActualStation != null"></delay-counter></div>
    </div>
  </td>


  <td class="d-none d-md-table-cell" v-if="fp !== null">{{ fp.playerNick }}</td>
  <td class="d-none d-md-table-cell" v-if="fp !== null">{{ this.player.sluzba }} </td>
  <td class="d-none d-md-table-cell" v-if="fp !== null && this.fp.line.line !== '0'">{{ fp.line.line }}</td>
  <td class="d-none d-md-table-cell" v-if="fp !== null && this.fp.line.line !== '0'">{{ fp.startStation.station }} <small>({{ fp.startStation.departure }})</small></td>
  <td class="d-none d-md-table-cell" v-if="fp !== null && this.fp.line.line !== '0'">{{ fp.actualStation.station }} <small>({{ fp.actualStation.departure }})</small></td>
  <td class="d-none d-md-table-cell" v-if="fp !== null && this.fp.line.line !== '0'">{{ fp.endStation.station }} <small>({{ fp.endStation.departure }})</small></td>
  <td class="d-none d-md-table-cell" v-if="fp !== null && this.fp.line.line !== '0'"><delay-counter :departure="fp.actualStation.departure" v-if="fp.actualStation.departure != null"/></td>

  <td colspan="5" v-if="fp !== null && this.fp.line.line === '0'">{{ this.fp.endStation.station }}</td>

 <!-- Když hráč není online -->
  <td class="table-danger" v-if="fp === null">{{ this.player.nick }} </td>
  <td class="table-danger" v-if="fp === null">{{ this.player.sluzba }}</td>
  <td colspan="5" class="table-danger" v-if="fp === null">Hráč není online</td>

</template>

<script>
import { computed } from "vue";
import DelayCounter from "./DelayCounter";

export default {
  name: "DispatchPlayerDiv.vue",
  components: { DelayCounter },
  props:["player", "trips"],
  data() {
    return {
      fp: null, //filtered player
    };
  },
  created() {
     this.filterPlayer();
  },

  methods: {
      filterPlayer() {
       if (this.trips.tripHeader !== undefined) {
          const player = computed(() => {
           return this.trips.tripHeader.filter(s => s.playerNick.toLowerCase() === this.player.nick.toLowerCase());
         });
         if (player.value.length > 0) {
           this.fp = player.value[0];
         }
       }
     }
  }
};
</script>

<style scoped>

</style>