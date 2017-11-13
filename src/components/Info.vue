
<template>
  <section class="info__modal" :class="{'info-visible': openModal}">
    <p> {{ $t('projectInfo') }} </p>
    <p>{{ $t('projectMotto1') }}<strong class="info__title"> {{ $t('projectMottoTitle') }}</strong> {{ $t('projectMotto2') }}</p>
    <ul class="info__credits">
      <li><strong> {{ $t('images') }}: </strong>{{ $t('by') }} <a href="http://sylar113.deviantart.com">{{ $t('imagesLink') }}</a></li>
      <li><strong>{{ $t('photos') }}: </strong>{{ $t('by') }} <a href="https://pixabay.com">Pixabay</a></li>
      <li><strong>{{ $t('crafted') }}: </strong>{{ $t('in') }} <a href="https://kodeguild.com">Kodeguild</a></li>
      <li><strong>{{ $t('source') }}: </strong>{{ $t('on') }} <a href="https://github.com/kodeguild/winter-spirits" target='_blank' rel="external noopener">GitHub</a></li>
      <li><strong>{{ $t('credits') }}: </strong>{{ $t('in') }} <a href="/humans.txt" target="_blank">humans.txt</a></li>
    </ul>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>Santa in sleigh icon</title><path d="M20.688 15.448c-.896 0-1.625.73-1.625 1.625 0 .276.224.5.5.5.275 0 .5-.224.5-.5 0-.345.28-.625.625-.625 1.31 0 2.375 1.065 2.375 2.375v.25c0 1.31-1.065 2.375-2.375 2.375h-4.625v-2c0-.04-.014-.073-.022-.11.266-.11.522-.306.762-.604 1.2-1.482 1.965-5.145 1.71-6.35-.05-.23-.303-.396-.538-.396-1.46 0-2.693 1.582-3.207 2.46h-4.614c-2.22-3-5.435-3.25-9.09-3.25-.277 0-.5.224-.5.5s.223.5.5.5c2.61 0 3.412 4.89 3.5 6.772.012.268.23.478.5.478v2h-4c-.277 0-.5.224-.5.5s.223.5.5.5h19.624c1.86 0 3.375-1.515 3.375-3.375v-.25c0-1.86-1.513-3.375-3.374-3.375zm-14.626 6v-2h9v2h-9z"/><path d="M1.438 6.823c.827 0 1.5-.673 1.5-1.5 0-.278-.08-.535-.213-.758.203-.083.453-.1.69-.02.23.078.59.31.63.906-.268.01-.483.227-.483.498 0 .276.224.5.5.5h.1c-.06.215-.1.438-.1.666 0 .635.246 1.21.637 1.65-.515.405-.78.835-.965 1.52 2.625.213 5.042.918 6.905 3.165h.504c-.117-2.177-.93-3.92-2.466-5.017.24-.383.385-.833.385-1.32 0-.227-.036-.45-.096-.665h.096c.275 0 .5-.224.5-.5s-.225-.5-.5-.5H9.06c0-.008.003-.014.003-.02 0-1.874-.8-3.876-3.04-3.876-1.106 0-3.336 0-4.293 2.3-.094-.018-.19-.03-.29-.03-.828 0-1.5.674-1.5 1.5s.67 1.5 1.498 1.5z"/></svg><small class="info__age">{{ $t('age') }}</small>
    <button class="info__close font-sec" @click.stop="modalClose">close</button>
  </section>
</template>

<script>
  export default {
    props: ['openModal'],
    methods: {
      modalClose() {
        this.$emit('close', 'infoModal');
      }
    }
  }
</script>
