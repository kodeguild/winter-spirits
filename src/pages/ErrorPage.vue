
<template>
  <div class="container main__container" :style="{ 'background': '#3e4248 url(' + imagePath() + ') no-repeat center center / cover' }">
    <section class="main">
      <div class="main__hero center-h">
        <h2 class="font-sec"> {{ $t('404') }}  </h2>
        <img src="../assets/images/image-1.jpg" alt="hero image">
      </div>
      <a class="link-cookies font-sec" href="/"> {{ $t('back') }} </a>
    </section>
  </div>
</template>

<script>
  export default {
    methods: {
      imagePath() {
        return require('../assets/images/cookies-bg.jpg');
      }
    }
  }
</script>
