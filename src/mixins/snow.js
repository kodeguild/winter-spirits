
/* eslint-disable no-labels */
export default {
  data() {
    return {
      snow: false
    }
  },
  created() {
    setTimeout(() => {
      this.snow = true;
    }, 1000);
  },
  beforeDestroy() {
    this.snow = false;
  }
}
