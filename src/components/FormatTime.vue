<template>
   {{ this.formattedTime }}
</template>

<script>
import { DateTime } from "luxon";

export default {
  name: "FormatTime",
  props: ["departure"],
  data() {
    return {
      departureTime: this.departure,
      formattedTime: null
    };
  },
  created() {
    this.formattedTime = DateTime.fromISO(this.departureTime).toFormat("HH:mm").toString()
  }
};
</script>

<style scoped>

</style>