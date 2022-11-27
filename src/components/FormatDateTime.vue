<template>
  {{ this.formattedDateTime }}
</template>

<script>
import { DateTime } from "luxon";
export default {
  name: "FormatDateTime",
  props: ["datetime"],
  data() {
    return {
      formattedDateTime: null,
    };
  },
  created() {
    this.datetime.replace("T", " ");
    this.formattedDateTime = DateTime.fromISO(this.datetime)
      .toFormat("dd.MM.yyyy HH:mm:ss")
      .toString();
  },
};
</script>

<style scoped></style>
