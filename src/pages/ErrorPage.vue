
<template>
  <div class="container main__container" :style="{ 'background': '#3e4248 url(' + imagePath() + ') no-repeat center center / cover' }">
    <section class="main">
      <div class="main__hero center-h">
        <h2 class="font-sec"> {{ $t('404') }}  </h2>
        <img src="../assets/images/image-1.jpg" alt="hero image">
      </div>
      <a class="link-cookies font-sec" href="/"> {{ $t('back') }} </a>
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
import snow from '@/mixins/snow';

export default {
  mixins: [snow],
  methods: {
    imagePath() {
      return require('../assets/images/cookies-bg.jpg');
    }
  }
}
</script>
