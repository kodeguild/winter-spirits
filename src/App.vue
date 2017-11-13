
<template>
  <div style="display: inline;">
    <locales :currentLang="currentLang" v-on:change="setLocale"></locales>
    <transition :name="transitionName">
      <router-view :lang="currentLang" :key="$route.path" :blurred="isBlurred"></router-view>
    </transition>
    <afooter :player="player" v-on:blur="blur"></afooter>
  </div>
</template>

<style src="./assets/styles/main.scss" lang="scss"></style>

<script>
import locales from './components/Locales';
import afooter from './components/aFooter';

export default {
  components: {
    locales,
    afooter
  },
  computed: {
    currentLang() {
      return this.$i18n.locale();
    }
  },
  data() {
    return {
      isBlurred: false,
      player: null,
      transitionName: 'moveFromLeft'
    }
  },
  created() {
    this.player = (this.$route.path === '/');
  },
  watch: {
    '$route' (to, from) {
      const quotePath = 'quotes';
      const cookiePath = 'cookies';
      const quoteNext = Number(to.path.match(/\d+/));
      const quotePrev = Number(from.path.match(/\d+/));

      if (to.path.match(cookiePath) || (from.path.match(quotePath) && to.path === '/')) {
        this.transitionName = 'moveFromLeft';
      } else if ((to.path.match(quotePath) && quotePrev === 0) || from.path.match(cookiePath)) {
        this.transitionName = 'moveFromRight';
      } else {
        this.transitionName = quoteNext > quotePrev ? 'moveFromTop' : 'moveFromBottom';
      }

      this.player = (this.$route.path === '/');
    }
  },
  methods: {
    setLocale(lang) {
      this.$i18n.set(lang);
    },
    blur(int) {
      this.isBlurred = int;
    }
  }
}
</script>
