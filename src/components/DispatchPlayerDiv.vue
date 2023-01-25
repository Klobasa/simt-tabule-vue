<template>
  <td v-if="fp !== null">(1) {{ fp.playerNick }}</td>
  <td v-if="fp !== null">{{ this.player.sluzba }} </td>
  <td v-if="fp !== null && this.fp.line.line !== '0'">{{ fp.line.line }}</td>
  <td v-if="fp !== null && this.fp.line.line !== '0'">{{ fp.startStation.station }} <small>({{ fp.startStation.departure }})</small></td>
  <td v-if="fp !== null && this.fp.line.line !== '0'">{{ fp.actualStation.station }} <small>({{ fp.actualStation.departure }})</small></td>
  <td v-if="fp !== null && this.fp.line.line !== '0'">{{ fp.endStation.station }} <small>({{ fp.endStation.departure }})</small></td>
  <td v-if="fp !== null && this.fp.line.line !== '0'"><delay-counter :departure="fp.actualStation.departure" v-if="fp.actualStation.departure != null"/></td>

  <td colspan="5" v-if="fp !== null && this.fp.line.line === '0'">{{ this.fp.endStation.station }}</td>

 <!-- <td>{{ filteredPlayer[0].trips.startStation }}</td> -->
  <td class="table-danger" v-if="fp === null">(2) {{ this.player.nick }} </td>
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