
<template>
  <footer>
    <share :openModal="shareModal" v-on:close="modalToggle"></share>
    <info :openModal="infoModal" v-on:close="modalToggle"></info>
    <div class="footer">
      <div v-if="player" class="player" :class="{ visible: windowHeight, playing: isPlaying}" @click="audioToggle" title="audio player">
        <div v-for="n in 10" class="player__dot"></div>
      </div>
      <audio v-if="player" ref="audio" loop='' preload="auto" style="opacity: 0; height: 1; width: 1">
        <source type="audio/mp3" src="/sounds/ws-main.mp3">
        <source type="audio/ogg" src="/sounds/ws-main.ogg">
      </audio>
      <div class="footer__menu">
        <a class="modal-trigger" data-modal="shareModal" href="#" @click.prevent="modalOpen">{{ $t('share') }}</a>
        <a class="modal-trigger" data-modal="infoModal" href="#" @click.prevent="modalOpen"> {{ $t('info') }}</a>
      </div>
    </div>
  </footer>
</template>

<script>
  import Share from './Share';
  import Info from './Info';

  export default {
    components: {
      Share,
      Info
    },
    props: ['player'],
    data() {
      return {
        isPlaying: false,
        infoModal: false,
        shareModal: false
      }
    },
    computed: {
      windowHeight() {
        return window.innerWidth > 1000;
      }
    },
    methods: {
      audioToggle() {
        if (this.isPlaying) {
          this.isPlaying = false;
          this.$refs.audio.pause();
        } else {
          this.isPlaying = true;
          this.$refs.audio.play();
        }
      },
      modalOpen(event) {
        const modalAttr = event.target.getAttribute('data-modal');
        this.modalToggle(modalAttr);
      },
      modalToggle(m) {
        this[m] = !this[m]; // change modal prop passed to children
        this.$emit('blur', this[m]);
      }
    }
  }
</script>
