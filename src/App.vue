<template>
  <main id="app" :class="{ 'mobile-device': isMobileDevice }">
    <Loader v-on:onLoadingComplete="handleLoadingComplete"
            ></Loader>
    <router-view v-if="store.isInit"></router-view>
  </main>
</template>

<script>
  import _ from 'underscore'
  import MobileDetect from 'mobile-detect'

  import { store } from './store'

  import { positionManager } from './helpers/PositionManager'
  import { transitionManager } from './helpers/TransitionManager'
  import AssetsManager from './helpers/AssetsManager'

  import Loader from './components/Loader'

  export default {
    name: 'app',
    data: () => {
      return {
        store: store,
        isMobileDevice: false
      }
    },
    components: { Loader },
    methods: {
      /**
       * checkDevice method
       */
      checkDevice() {
        const mobile = new MobileDetect(window.navigator.userAgent).mobile();

        if (window.innerWidth <= 768 || mobile) {
          this.isMobileDevice = true;
          this.$router.replace('/about');;
        } else {
          this.isMobileDevice = false;
        }
      },
      /**
       * debounceResize method
       * @param e
       */
      debounceResize(e) {
        _.debounce(this.checkDevice(), 100);
      },
      /**
       * handleLoadingComplete method
       */
      handleLoadingComplete() {
        console.log('handleLoadingComplete');

        setTimeout(() => {
          store.hasInit(true);
          transitionManager.initTitle();
          // transitionManager.fadeMouseScrollIn();
          transitionManager.fadeOutLoader();
          positionManager.init();
        }, store.state.settings.loaderFadeSpeed + 1000);
      }
    },
    created() {
      this.checkDevice();
    },
    mounted() {
      if (!store.isInit) {
        const assetsManager = new AssetsManager().then((data) => {
          store.setSettings(data.settings);
          store.setProjectsProperties(data.projectsProperties);
        });
      }

      window.addEventListener('resize', this.debounceResize);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.debounceResize);
    }
  }
</script>
