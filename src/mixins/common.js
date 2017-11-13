
/* eslint-disable no-labels */
export default {
  props: ['lang', 'blurred'],
  mounted() {
    setTimeout(() => {
      const el = document.getElementsByClassName('container')[0];
      const bg = el.getAttribute('style');
      const parent = document.getElementById('wrapper');
      parent.style = bg;
    }, 1000);
  }
}
