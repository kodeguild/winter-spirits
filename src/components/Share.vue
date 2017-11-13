
<template>
  <section>
    <div class="info__modal share__modal" :class="{'info-visible': openModal}">
      <h3 class="font-sec">{{ $t('sharingCaring') }}</h3>
      <p>{{ $t('shareInfo1') }} <strong class="info__title">{{ $t('projectTitle') }} </strong> {{ $t('shareInfo2') }} </p>
      <input class="share__link" :value="wsLink" type="text"><button class="share__copy font-sec" @click.stop="copyToClipboard">copy</button> <span ref="success"></span>
      <button class="info__close font-sec" @click.stop="modalClose">close</button>
      <share-buttons></share-buttons>
    </div>
    <div class="info__overlay"></div>
  </section>
</template>

<script>
  import copy from 'copy-text-to-clipboard';
  import ShareButtons from './ShareButtons';

  export default {
    props: ['openModal'],
    components: {
      ShareButtons
    },
    data() {
      return {
        wsLink: 'https://winterspirits.win'
      }
    },
    methods: {
      modalClose() {
        this.$emit('close', 'shareModal');
        this.$refs.success.setAttribute('style', 'display: none');
      },
      copyToClipboard() {
        copy(this.wsLink);
        this.$refs.success.textContent = 'copied!';
        this.$refs.success.setAttribute('style', 'display: inline');
      }
    }
  }
</script>
