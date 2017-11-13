
<template>
  <nav class="langs font-sec" :class="{open: langsOpen}" aria-labelledby="dropdownMenu" :style="'width: ' + (40 * countStyle) + 'px'">
    <a v-for="(lang, i) in langs" class="lang__link" :class="[{'lang--current': lang === currentLang}, 'lang-' + lang]" href="#" @click.prevent="changeLang(lang)" :style="'right: ' + (2 + 38*i) + 'px'">{{lang}}</span></a>
  </nav>
</template>

<script>
export default {
  props: ['currentLang'],
  data() {
    return {
      langsOpen: false
    }
  },
  computed: {
    langs() {
      const locales = Object.keys(this.$store.state.i18n.translations);
      const i = locales.indexOf(this.currentLang);
      locales.splice(i, 1);
      const arr = [this.currentLang, ...locales];
      return arr;
    },
    countStyle() {
      const px = this.langsOpen ? this.langs.length : 1;
      return px;
    }
  },
  methods: {
    changeLang(lang) {
      if (this.langsOpen && lang !== this.currentLang) {
        this.$emit('change', lang);
        const i = this.langs.indexOf(lang);
        this.langs.splice(i, 1);
        this.langs.unshift(lang);
        this.langsOpen = !this.langsOpen;
      } else {
        this.langsOpen = !this.langsOpen;
      }
    }
  }
}
</script>
