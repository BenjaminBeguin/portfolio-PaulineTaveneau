import { store } from '../../store'

import { TweenMax, Power2 } from 'gsap';

import { projectNameToRoute } from '../../helpers/utils'
import { positionManager } from '../../helpers/PositionManager'
import { transitionManager } from '../../helpers/TransitionManager'

export default {
  data: () => {
    return {
      index: -1,
      name: null,
      routeName: null,
      imageProperties: {
        src: null,
        transform: 'scale(1)',
        filter: 'grayscale(100%)'
      }
    }
  },
  props: [
    'projectProperties',
    'activeOverview'
  ],
  methods: {
    /**
     * initProperties method
     */
    initProperties() {
      transitionManager.initOverview(this.index);
    },
    /**
     * handleClick method
     */
    handleClick() {
      this.$emit('disableOverviews');
    },
    /**
     * handleMouseOver method
     */
    handleMouseOver() {
      const imageProperties = this.imageProperties;

      TweenMax.to(imageProperties, store.state.settings.projectOverviewZoomSpeed, {
        transform: 'scale(1.1)',
        filter: 'grayscale(0%)',
        '-webkit-filter': 'grayscale(0%)',
        ease: Power2.easeOut,
        force3D: true
      });

      this.$emit('updateActiveOverview', this.index);
    },
    /**
     * handleMouseOut method
     */
    handleMouseOut() {
      const imageProperties = this.imageProperties;

      TweenMax.to(imageProperties, store.state.settings.projectOverviewZoomSpeed, {
        transform: 'scale(1)',
        filter: 'grayscale(100%)',
        '-webkit-filter': 'grayscale(100%)',
        ease: Power2.easeOut,
        force3D: true
      });

      this.$emit('updateActiveOverview', this.index);
    },
    /**
     * updateProperties method
     */
    updateProperties() {
      if (this.activeOverview === null) {
        transitionManager.overOverviewDefault(this.index);
      } else if (this.activeOverview === this.index) {
        transitionManager.overOverviewIn(this.index);
      } else {
        transitionManager.overOverviewOut(this.index);
      }
    }
  },
  created() {
    const projectProperties = this.projectProperties;
    const imageProperties = this.imageProperties;

    this.index = projectProperties.index;
    this.name = projectProperties.name;
    this.routeName = projectNameToRoute(projectProperties.name);
    imageProperties.src = projectProperties.overview.src;
  },
  mounted() {
    setTimeout(() => {
      this.initProperties();
    }, 50);
  },
  watch : {
    activeOverview : function() {
      this.updateProperties();
    }
  }
}
