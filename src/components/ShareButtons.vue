
<template>
  <section class="dex-btns">
    <h5>Share on Fediverse</h5>
    <input name="popup" class="overlay" id="overlay" type="radio">
    <div v-for="n in networks" class="share">
      <input name="popup" :id="n.name + '-share'" class="hidden" type="radio">
      <span class="popup">
        <label for="overlay"></label>
        <input name="podurl" value="" :placeholder="capitalize(n.name) + ' URL (' + n.pod + ')'" type="text"><button class="share-btn" type="submit" :value="n.name" @click="shareLink">OK</button>
      </span>
      <label class="dex-btn wo-text" :class="n.name" :title="'Share this page on ' + capitalize(n.name)" :for="n.name + '-share'">
        <svg role="img" class="dex-icon" width="16" height="16">
          <use :xlink:href="'#icon-' + n.name"></use>
        </svg>
      </label>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        networks: [{'name': 'diaspora', 'pod': 'nerdpol.ch'}, {'name': 'mastodon', 'pod': 'witches.town'}, {'name': 'hubzilla', 'pod': 'gerzilla.de'}, {'name': 'gnu_social', 'pod': 'quitter.se'}, {'name': 'friendica', 'pod': 'libranet.de'}, {'name': 'socialhome', 'pod': 'socialhome.network'}]
      }
    },
    methods: {
      capitalize: function(n) {
        if (n.indexOf('_') > -1) {
          return this.GNUcapitalize(n);
        } else {
          return n.charAt(0).toUpperCase() + n.slice(1);
        }
      },
      GNUcapitalize: function(x) {
        const wordArr = x.split('_');
        wordArr[0] = wordArr[0].toUpperCase();
        wordArr[1] = wordArr[1].charAt(0).toUpperCase() + wordArr[1].slice(1);
        return wordArr.join(' ');
      },
      shareLink: function(e) {
        const h1 = document.querySelector('h1');
        const pageTitle = document.querySelector('head').querySelector('title');
        const oggProp = document.querySelector('meta[property="og:title"]');

        const t1 = (pageTitle === null) ? '' : pageTitle.textContent;
        const t2 = (oggProp === null) ? '' : oggProp.content;
        const t3 = (h1 === null) ? '' : h1.textContent;

        const text = t1 || t2 || t3;

        const link = encodeURIComponent(window.location.href);

        const isBtn = (e.target.name !== 'podurl');
        const service = isBtn ? e.target.value : e.target.nextSibling.value;
        const pod = isBtn ? e.target.previousSibling.value : e.target.value;
        const title = encodeURI(text).replace(/%20/g, '+');
        const path = this.validateProtocol(pod);

        if (service === 'diaspora') {
          window.open(`${path}/bookmarklet?url=${link}&title=${title}`);
        } else if (service === 'gnu_social') {
          window.open(`${path}/notice/new?status_textarea=${title}&${link}`);
        } else if (service === 'mastodon') {
          window.open(`${path}/share?text=${title}&${link}`);
        } else if (service === 'friendica') {
          window.open(`${path}/bookmarklet?url=${link}&title=${title}`);
        } else if (service === 'hubzilla') {
          window.open(`${path}/rpost?f=&url=${link}&title=${title}`);
        } else if (service === 'socialhome') {
          window.open(`${path}/bookmarklet?url=${link}&title=${title}`);
        }
      },
      validateProtocol(url) { // If url was typed without https://, add it
        const check = url.match(/^https:\/\//i);
        if (check) {
          return url;
        } else {
          const newUrl = url.split('/').filter((n) => n.indexOf('.') > -1);
          return `https://${encodeURIComponent(newUrl)}`;
        }
      }
    }
  }
</script>
