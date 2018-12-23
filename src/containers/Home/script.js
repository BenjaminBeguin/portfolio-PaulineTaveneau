import _ from 'underscore'

import { store } from '../../store'

import { positionManager } from '../../helpers/PositionManager'
import { transitionManager } from '../../helpers/TransitionManager'

import Header from '../../components/Header'
import SocialNetwork from '../../components/SocialNetwork'
import Overview from '../../components/Overview'
import OverviewTitle from '../../components/OverviewTitle'

export default{
  data: () => {
    return {
      projectsProperties: null,
      activeOverview: null,
      titleProperties: {
        pointerEvents: 'auto'
      }
    }
  },
  components: {
    Header,
    SocialNetwork,
    Overview,
    OverviewTitle
  },
  methods: {
    /**
     * handleClick method
     */
    handleClick() {
      const windowHeight = window.innerHeight;
      window.scrollTo(0, windowHeight * 0.5);
    },
    /**
     * handleScroll method
     * @param e
     */
    handleScroll(e) {
      const windowHeight = window.innerHeight;
      const scrollTop = window.pageYOffset;
      const normalizeDistance = (100 * scrollTop / windowHeight) / 100;

      this.titleProperties.pointerEvents = (normalizeDistance >= 0.5) ? 'none' : 'auto';
      positionManager.normalizedDistance = normalizeDistance;

      if (normalizeDistance == 1) {
        transitionManager.fadeHeaderIn();
        transitionManager.fadeSocialNetworkIn();
      } else {
        transitionManager.fadeHeaderOut();
        transitionManager.fadeSocialNetworkOut();
      }

      if (normalizeDistance >= 0.1) {
        transitionManager.fadeMouseScrollOut();
      } else {
        transitionManager.fadeMouseScrollIn();
      }

      transitionManager.fadeOverview();
      transitionManager.fadeTitle();
    },
    /**
     * handleResize method
     */
    handleResize() {
      transitionManager.fadeOverview();
      transitionManager.fadeTitle();
    },
    /**
     * debounceResize method
     * @param e
     */
    debounceResize(e) {
      _.debounce(this.handleResize(e), 100);
    },
    /**
     * updateActiveOverview method
     * @param overview
     */
    updateActiveOverview(overview) {
      if(this.activeOverview == overview) {
        this.activeOverview = null;
      } else {
        this.activeOverview = overview;
      }
    },
    /**
     * disableOverviews method
     */
    disableOverviews() {
      const overviews = document.getElementsByClassName('overview');

      for (let i = 0; i < overviews.length; i++) {
        overviews.css.pointerEvents = 'none';
      }

      this.activeOverview = null;
    }
  },
  created() {
    this.projectsProperties = store.state.projectsProperties;
  },
  mounted() {
    document.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.debounceResize);
  },
  beforeDestroy() {
    this.activeOverview = null;
    document.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.debounceResize);
  }
}
