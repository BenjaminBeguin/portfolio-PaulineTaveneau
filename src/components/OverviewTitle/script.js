import { store } from '../../store'

import { positionManager } from '../../helpers/PositionManager'
import { transitionManager } from '../../helpers/TransitionManager'

export default {
  data: () => {
    return {
      index: -1,
      name: null,
      properties: {
        top: -1
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
      transitionManager.initOverviewTitle(this.index);
    },
    /**
     * updateProperties method
     */
    updateProperties() {
      if (this.activeOverview === null) {
        transitionManager.overOverviewTitleOut(this.index);
      } else if (this.activeOverview === this.index) {
        transitionManager.overOverviewTitleIn(this.index);
      } else {
        transitionManager.overOverviewTitleOut(this.index);
      }
    },
    /**
     * debounceResize method
     * @param e
     */
    debounceResize(e) {
      _.debounce(this.initProperties, 100);
    }
  },
  created() {
    const projectProperties = this.projectProperties;

    this.index = projectProperties.index;
    this.name = projectProperties.name;
  },
  mounted() {
    setTimeout(() => {
      this.initProperties();
    }, 50);
    window.addEventListener('resize', this.debounceResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.debounceResize);
  },
  watch : {
    activeOverview : function() {
      this.updateProperties();
    }
  }
}
