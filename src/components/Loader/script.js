import bodymovin from 'bodymovin'
import { TweenMax } from 'gsap';


import { transitionManager } from '../../helpers/TransitionManager'
import { map } from '../../helpers/utils-math'
import Emitter from '../../helpers/Emitter'
import { ON_ASSETS_LOADED } from '../../config/events'


export default {
  data: () => {
    return {
      animation: null,
      loadingStatus: 'pending',
      timer: null,
      time: 0
    }
  },
  methods: {
    /**
     * updateAnimation method
     * @param loadingPercent
     */
    updateAnimation(loadingPercent) {
      const animation = this.animation;
      const percent = document.getElementById('percent');

      const currentFrame = { value: animation.currentFrame };
      const nextFrame = Math.round(animation.totalFrames * loadingPercent);
      const totalDuration = animation.totalFrames / animation.frameRate;
      let duration = totalDuration * (Math.abs(nextFrame - currentFrame.value) / animation.totalFrames);

      TweenMax.to(currentFrame, duration, {
        value: nextFrame,
        force3D: true,
        onUpdate: () => {
          animation.goToAndStop(currentFrame.value, true);
        }
      });

      if (loadingPercent === 1) {
        this.loadingStatus = 'finish';
      }
    },
    /**
     * handleAssetsLoaded method
     */
    handleAssetsLoaded() {
      Emitter.on(ON_ASSETS_LOADED, this.updateAnimation);
    }
  },
  mounted() {
    const animationData = {
      container: document.getElementById('animation'),
      renderer: 'svg',
      autoplay: false,
      loop: false,
      path: '/static/data/loading.json'
    };

    this.animation = bodymovin.loadAnimation(animationData);
    this.animation.addEventListener('data_ready', this.handleAssetsLoaded);

    this.timer = setInterval(() => {
      this.time += 0.5;

      if (this.loadingStatus === 'finish' && this.time >= (this.animation.totalFrames / this.animation.frameRate)) {
        this.$emit('onLoadingComplete');
      }
    }, 500);
  },
  beforeDestroy() {
    Emitter.off(ON_ASSETS_LOADED);
    this.animation.removeEventListener('data_ready', this.handleAssetsLoaded);
    clearInterval(this.timer);
  }
}
