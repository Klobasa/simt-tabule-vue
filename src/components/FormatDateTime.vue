<template>
  {{ this.formatDateTime(this.datetime) }}
</template>

<script>
import { DateTime } from "luxon";
export default {
  name: "FormatDateTime",
  props: ["datetime"],

  methods: {
    formatDateTime(dt) {
      let fdt = "";
      if (typeof (dt) !== 'undefined') {
        dt.replace("T", " ");
        fdt = DateTime.fromISO(dt)
          .toFormat("dd.MM.yyyy HH:mm:ss")
         .toString();
     }
    return fdt;
  }
  }
};
</script>

<style scoped></style>
