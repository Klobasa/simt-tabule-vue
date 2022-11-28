<template>
 {{ this.time }}
</template>

<script>
export default {
  name: "TheTime",
  data() {
    return {
      timeInterval: null,
      time: null
    };
  },
  created() {
    this.timeInterval = setInterval(() => this.callCurrentTime(), 250);
  },
  methods: {
    callCurrentTime() {
      this.time = Intl.DateTimeFormat(navigator.language, {
        hour: "numeric", minute: "numeric", second:"numeric"
      }).format();
    }
  },
  beforeUnmount() {
    clearInterval(this.timeInterval)
  }
};
</script>

<style scoped>

</style>