<template>
  {{ this.formatDateTime(this.datetime, this.datetimeFormat) }}
</template>

<script>
import { DateTime } from "luxon";
export default {
  name: "FormatDateTime",
  props: ["datetime", "datetimeFormat"],

  methods: {
    formatDateTime(dateTime, dateTimeFormat) {
      let formattedDateTime = "";
      if (typeof (dateTime) !== 'undefined') {
        dateTime.replace("T", " ");
        formattedDateTime = DateTime.fromISO(dateTime)
          .toFormat(dateTimeFormat)
          .toString();
     }
    return formattedDateTime;
  }
  }
};
</script>

<style scoped></style>
