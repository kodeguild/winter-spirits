
<template>
  <div class="container cookies__container" :style="{ 'background': '#3e4248 url(' + imagePath() + ') no-repeat center center / cover' }">
    <section class="main" :class="{blurred: blurred}">
      <router-link id="wsLogo" class="ws-logo font-sec" to="/">W.</router-link>

      <h2 class="font-sec center-h">{{ $t('getCookie') }}</h2>
      <div class="cookie__wrapper" :class="{revealed: revealed}">
        <p class="cookie__text" ref="cookieText" :class="{fadeIn: fadeIn}"></p>
      </div>

      <div class="cookies__jar center-h">
        <div id="showNum" class="cookie__showNum center-h-v">{{showNum}}</div>

        <div class="cookie__chooser center-h">
          <input v-focus type="text" v-model="cookieNum" class="cookie__number font-sec" placeholder="01" maxlength="2"><button class="cookie__submit" title="get fortune cookie" @click.stop="getCookie()"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 512 512"><title>get cookie</title><path d="M64 400h10.3l19.2-31.2c20.5-32.7 44.9-62.8 75.8-76.6 24.4-10.9 46.7-18.9 86.7-20V352l192-128L256 96v80.3c-63 2.8-108.1 20.7-143.3 56.2C60.4 285.2 64 351.5 64 368.2c.1 8.9 0 21.7 0 31.8z"/></svg></button>
        </div>
      </div>

      <div class="star-rain">
        <span v-for="(n, i) in 12" class="star" :class="[{shoot: shoot}, 'star-' + i]">★</span>
      </div>

      <div id="randomCookie" class="cookie__random center-v" @click="randomCookie">
        <span><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="34px"
       height="34px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve"><title>random fortune cookie</title><rect fill="none" width="24" height="24"/><path fill="#fff" d="M15.999,2.07C13.61,1.274,12.49,7.45,12.133,10h4.226C17.053,7.792,18.319,2.844,15.999,2.07z"/>
        <path fill="#fff" d="M11.865,10c-0.357-2.55-1.477-8.726-3.866-7.93C5.679,2.844,6.945,7.792,7.639,10H11.865z"/>
        <path fill="#1e1f21" d="M6.999,21c0,0.552,0.448,1,1,1h8c0.552,0,1-0.448,1-1v-3h-10V21z"/>
        <polygon fill="#1e1f21" points="3.999,11 3.999,13 6.999,13 6.999,17 16.999,17 16.999,13 19.999,13 19.999,11"/></svg></span>
      </div>
      <span class="cookie__tip center-h">{{ $t('cookieTip') }}</span>
    </section>
  </div>
</template>

<script>
  import common from '@/mixins/common';

  function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  export default {
    mixins: [common],
    data() {
      return {
        cookieNum: '',
        showNum: '?',
        revealed: false,
        fadeIn: false,
        shoot: false
      }
    },
    created() {
      this.$store.dispatch('fetchCookies', this.lang); // get default cookies (en)
    },
    watch: {
      'lang': 'onChangeLang'
    },
    computed: {
      cookies() {
        return this.$store.getters.cookies.text;
      },
      errors() {
        return this.$store.getters.cookies.errors;
      }
    },
    directives: {
      focus: {
        inserted(el) {
          setTimeout(() => {
            el.focus();
          }, 1050);
        }
      }
    },
    methods: {
      imagePath() {
        return require('../assets/images/cookies-bg.jpg');
      },
      onChangeLang(lang) {
        this.$store.dispatch('fetchCookies', lang);
      },
      shootStars() {
        this.shoot = true;

        setTimeout(() => {
          this.shoot = false;
        }, 1200);
      },
      getCookie() {
        this.showNum = '?';
        const cValue = this.cookieNum;
        let text;

        if (!cValue.match(/^-?\d+$/)) {
          const ranNum = getRandomNum(0, 3);
          text = this.errors.notNum[ranNum];
          this.revealCookie(text);
        } else {
          this.shootStars();
          setTimeout(() => {
            const cNum = parseInt(cValue);
            if (cNum <= 0) {
              text = this.errors.ltZero;
              this.revealCookie(text);
            } else if (cNum > 42) {
              text = this.errors.gtMax;
              this.revealCookie(text);
            } else {
              this.generateText(cNum, text);
            }
          }, 400);
        }
      },
      randomCookie() {
        this.shootStars();
        const num = getRandomNum(1, 42);

        setTimeout(() => {
          this.generateText(num);
        }, 400);
      },
      revealCookie(text) {
        const cText = this.$refs.cookieText;

        this.fadeIn = false; // reset class
        this.revealed = false; // reset class
        cText.innerHTML = ''; // reset cookie

        setTimeout(() => {
          cText.innerHTML = text;
          this.fadeIn = true;
          this.revealed = true;
        }, 250);
      },
      generateText(num, text) {
        this.showNum = num;
        text = this.cookies[num];
        this.revealCookie(text);
      }
    }
  }
</script>
