
<template>
  <div class="container main__container" :style="{ 'background': '#3e4248 url(' + imagePath() + ')  no-repeat center center / cover' }">
    <section class="main" :class="{blurred: blurred}">
      <router-link ref="wsLogo" class="ws-logo font-sec" to="/">W.</router-link>
      <h1 class="font-sec center-h"> {{ $t('heroTitle') }} </h1>
      <div class="main__hero center-h">
        <h2 class="font-sec"> {{ $t('heroSubTitle') }}</h2>
        <img src="../assets/images/image-1.jpg" alt="hero image">
        <div class="glow"></div>
      </div>

      <router-link class="link-cookies font-sec" to="/cookies"> {{ $t('fortuneCookies') }}</router-link>
      <router-link class="link-quotes font-sec" to="/quotes/1/"> {{ $t('frostyQuotes') }}</router-link>

      <div v-if="snow">
        <div class="snow">
          <div class="snow-1"></div>
          <div class="snow-2"></div>
          <div class="snow-3"></div>
          <div class="snow-4"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import common from '@/mixins/common';
import snow from '@/mixins/snow';

export default {
  mixins: [common, snow],
  methods: {
    imagePath() {
      return require('../assets/images/index-bg.jpg');
    }
  }
}
</script>
