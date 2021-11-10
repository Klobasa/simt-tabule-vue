<template>
  {{ this.odchylka }}
</template>

<script>
import { DateTime, Duration, Interval } from "luxon";

export default {
  name: "DelayCounter",
  props: ["departure"],
  data() {
    return {
      departureTime: this.departure,
      odchylka: null,
      interval: null
    };
  },
  created() {
    this.countOdchylka();
  },
  methods: {
    countOdchylka() {
      clearInterval(this.interval)
      let departure = DateTime.fromISO(this.departure)
      let odchylka
      let plusMinus
      if (DateTime.now() < departure) {
        odchylka = Interval.fromDateTimes(DateTime.now(), departure).length("milliseconds") // .toFormat("mm:ss").toString()
        plusMinus = "-"
      } else {
        odchylka = Interval.fromDateTimes(departure, DateTime.now()).length("milliseconds") // .toFormat("mm:ss").toString()
        plusMinus = "+"
      }

      let d = Duration.fromObject({years: 0, quarters: 0, months: 0, weeks: 0, days: 0, hours: 0, minutes: parseInt(odchylka/1000/60), seconds: parseInt(parseInt(odchylka/1000)-parseInt(odchylka/1000/60)*60), milliseconds: 0})
      this.odchylka = plusMinus + (d.minutes < 10 ? "0" + d.minutes : d.minutes) + ":" + (d.seconds < 10 ? "0" + d.seconds : d.seconds)
      this.interval = setInterval(() => this.countOdchylka(), 1000)
    }
  },
  beforeUnmount() {
    clearInterval(this.interval)
  }
};
</script>

<style scoped>

</style>