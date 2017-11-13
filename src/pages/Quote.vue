
<template>
  <div class="container quote__container" :class="{'theme-dark': nightMode}" :style="{ 'background': '#3e4248 url(' + imagePath(quote.id, '-bg') + ') no-repeat center center / cover' }">
    <section class="main" :class="{blurred: blurred}">
      <router-link ref="wsLogo" class="ws-logo font-sec" to="/">W.</router-link>

      <div class="quote" :class="{blurred: blurred}">
        <div class="quote__content" :key="quote.id">
          <div class="quote__image" :class="quote.orientation" :style="{'background': screenWidth < 1240 ? ('#3e4248 url(' + imagePath(quote.id, '-bg') + ') no-repeat bottom left / cover') : ''}">
            <div class="quote__arrows">
              <router-link class="font-sec" :to="'/quotes/' + ( quote.id == 1 ? '12' : (quote.id - 1) )">{{  $t('prev') }}</router-link>
              <router-link class="font-sec" :to="'/quotes/' + ( (quote.id == 12) ? '1' : (quote.id + 1) )">{{  $t('next') }}</router-link>
            </div>
            <img :src="imagePath(quote.id, '-pic')" alt="winter image">
          </div>
          <div class="quote__text" :class="quote.orientation" style="white-space: pre-wrap;">{{quote.body}}<p class="quote__author font-sec">— {{quote.author}}</p>
          </div>
        </div>

        <nav class="quote__nav center-v">
          <router-link v-for="n in 12" :key="n" :to="'/quotes/' + n" class="quote__item font-sec" :class="{'quote__item--current': n == $route.params.id}" :aria-label="'Quote ' + n">
            <span>{{(n < 10) ? '0' + n : n}}</span>
          </router-link>
        </nav>

        <div class="quote__theme" title="night mode on/off" @click="changeMode">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"><g stroke-miterlimit="10"><path d="M14.878 22.414c-4.066 0-7.375-3.31-7.375-7.375s3.31-7.376 7.375-7.376c4.065 0 7.375 3.31 7.375 7.375s-3.31 7.374-7.375 7.374zm0-13.75c-3.515 0-6.375 2.86-6.375 6.376s2.86 6.375 6.375 6.375 6.375-2.858 6.375-6.375c0-3.516-2.858-6.375-6.375-6.375z"/><path d="M9.988 10.51c-.078 0-.158-.017-.232-.056-.245-.128-.34-.43-.21-.675l4.92-9.376c.085-.163.253-.266.438-.268.194.023.354.1.442.26l5.104 9.376c.132.242.042.546-.2.678-.244.133-.547.043-.678-.2l-4.657-8.553-4.485 8.546c-.088.172-.262.268-.442.268zM14.908 29.863h-.004c-.185-.002-.354-.104-.438-.27l-4.92-9.326c-.128-.244-.034-.548.21-.677.246-.13.547-.034.676.21l4.485 8.506 4.657-8.515c.133-.24.436-.33.678-.197.243.133.332.438.2.68l-5.105 9.33c-.088.16-.257.26-.44.26z"/><path d="M10.012 20.512c-.078 0-.158-.02-.23-.058l-9.376-4.92c-.163-.085-.267-.254-.27-.438s.1-.355.262-.443L9.772 9.55c.244-.133.548-.043.68.2.13.242.04.546-.2.678l-8.555 4.656 8.547 4.484c.245.127.34.432.21.675-.088.17-.263.27-.442.27zM20.037 20.512c-.182 0-.354-.098-.443-.268-.13-.244-.035-.546.21-.676l8.505-4.484-8.514-4.656c-.243-.133-.332-.437-.198-.68.13-.242.436-.33.678-.198l9.328 5.104c.162.088.263.258.26.442-.002.184-.104.353-.266.438l-9.33 4.92c-.075.038-.153.058-.23.058z"/><path d="M8.618 12.694c-.213 0-.41-.137-.48-.35L6.574 7.315c-.056-.176-.01-.368.12-.5s.32-.182.5-.13l5.176 1.527c.264.078.415.356.337.62s-.354.418-.62.34L7.806 7.91l1.29 4.135c.08.264-.065.544-.33.626-.05.018-.1.024-.15.024zM16.994 8.7c-.007-.214.122-.417.334-.493l4.967-1.748c.173-.063.367-.024.504.102.136.125.192.31.145.492l-1.336 5.23c-.07.267-.34.428-.61.36-.267-.068-.43-.34-.36-.608l1.105-4.323-4.083 1.438c-.262.093-.547-.042-.638-.305-.02-.048-.028-.097-.03-.146zM21.193 17.233c.213-.005.414.127.487.34l1.688 4.987c.06.174.02.367-.11.503-.125.135-.312.19-.493.14l-5.213-1.398c-.267-.072-.424-.346-.353-.613s.343-.426.61-.353l4.31 1.155-1.39-4.1c-.088-.264.05-.547.314-.635.05-.018.1-.026.15-.027zM12.608 21.328c.002.213-.132.413-.345.483L7.256 23.44c-.175.058-.368.014-.5-.115-.134-.128-.187-.316-.136-.496l1.462-5.195c.075-.266.35-.42.617-.346.265.075.42.35.344.617l-1.208 4.294 4.118-1.34c.263-.085.545.058.63.322.017.05.023.1.024.148z"/></g></svg>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import common from '@/mixins/common';

  export default {
    mixins: [common],
    data() {
      return {
        screenWidth: document.documentElement.clientWidth,
        quote: null,
        nightMode: false
      }
    },
    created() {
      this.fetchQuote();
    },
    ready() {
      window.addEventListener('resize', this.setScreenWidth)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.setScreenWidth)
    },
    watch: {
      '$route': 'fetchQuote',
      'lang': 'onChangeLang'
    },
    methods: {
      imagePath(n, w) {
        return require('../assets/images/quote-' + n + w + '.jpg');
      },
      setScreenWidth(e) {
        this.screenWidth = document.documentElement.clientWidth;
      },
      onChangeLang(lang) {
        this.$store.dispatch('fetchQuote', {lang: lang, id: this.$route.params.id});
        this.quote = this.$store.getters.quote;
      },
      fetchQuote() {
        this.$store.dispatch('fetchQuote', {lang: this.lang, id: this.$route.params.id});
        this.quote = this.$store.getters.quote;
      },
      changeMode() {
        this.nightMode = !this.nightMode;
      }
    }
  }
</script>
