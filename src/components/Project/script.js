import _ from 'underscore';
import { TimelineLite, Power2 } from 'gsap';

import { store } from '../../store'
import { projectNameToRoute } from '../../helpers/utils'
import { transitionManager } from '../../helpers/TransitionManager'

import Grid from '../Grid'

export default {
  data: () => {
    return {
      index: -1,
      name: null,
      template: null,
      url: null,
      primaryColor: '#000000',
      secondaryColor: '#000000',
      headerProperties: {
        src: null
      },
      infoProperties: {
        type: null,
        role: null,
        agency: null,
        date: null,
        description: null
      },
      panelTopProperties: {
        backgroundPosition: null,
        foregroundPosition: null,
        backgroundSrc: null,
        foregroundSrc: null,
        backgroundStyle: {},
        foregroundStyle: {}
      },
      panelBaniere: {
        imageSrc: null
      },
      panelCenterProperties: null,
      panelMobileProperties: null,
      panelScreenProperties: null,
      panelBottomProperties: null,
      navProperties: {
        previous: {
          name: null,
          template: null,
          src: null,
          path: null
        },
        next: {
          name: null,
          template: null,
          src: null,
          path: null
        }
      }
    }
  },
  props: [
    'projectProperties'
  ],
  components: {
    Grid
  },
  methods: {
    /**
     * handleMouseOverNav method
     * @param direction
     */
    handleMouseOverNav(direction) {
      const text = document.querySelector(`.project-nav-${direction} .project-nav-text`);
      const title = document.querySelector(`.project-nav-${direction} .project-nav-title`);
      const overview = document.querySelector(`.project-nav-${direction} .project-nav-overview`);
      const navHeight = document.getElementsByTagName('nav')[0].clientHeight;

      const tl = new TimelineLite();

      tl.to(text, store.state.settings.projectNavFadeSpeed, {
          opacity: 0,
          ease: Power2.easeInOut
        }, 0)
        .to(title, store.state.settings.projectNavFadeSpeed, {
          opacity: 0,
          ease: Power2.easeInOut
        }, 0)
        .to(overview, store.state.settings.projectNavFadeSpeed, {
          opacity: 1,
          transform: 'translateY(0px)',
          maxHeight: navHeight,
          ease: Power2.easeOut,
          force3D: true
        }, 0.3)
    },
    /**
     * handleMouseOutNav method
     * @param direction
     */
    handleMouseOutNav(direction) {
      const text = document.querySelector(`.project-nav-${direction} .project-nav-text`);
      const title = document.querySelector(`.project-nav-${direction} .project-nav-title`);
      const overview = document.querySelector(`.project-nav-${direction} .project-nav-overview`);
      const navHeight = document.getElementsByTagName('nav')[0].clientHeight;

      const tl = new TimelineLite();

      tl.to(overview, store.state.settings.projectNavFadeSpeed, {
          opacity: 0,
          transform: `translateY(${navHeight}px)`,
          maxHeight: navHeight * 0.8,
          ease: Power2.easeInOut,
          force3D: true
        }, 0)
        .to(text, store.state.settings.projectNavFadeSpeed, {
          opacity: 1,
          ease: Power2.easeInOut
        }, 0.1)
        .to(title, store.state.settings.projectNavFadeSpeed, {
          opacity: 1,
          ease: Power2.easeInOut
        }, 0.1)
    },
    /**
     * getPreviousProjectProperties method
     * @returns {*}
     */
    getPreviousProjectProperties() {
      const projectsProperties = store.state.projectsProperties;
      const indexInArray = _.findIndex(projectsProperties, {index: this.index});

      if (indexInArray > 0) {
        return projectsProperties[indexInArray - 1];
      } else {
        return projectsProperties[projectsProperties.length - 1]
      }
    },
    /**
     * getNextProjectProperties method
     * @returns {*}
     */
    getNextProjectProperties() {
      const projectsProperties = store.state.projectsProperties;
      const indexInArray = _.findIndex(projectsProperties, {index: this.index});

      if (indexInArray < projectsProperties.length - 1) {
        return projectsProperties[indexInArray + 1];
      } else {
        return projectsProperties[0]
      }
    },
    /**
     * updateProperties method
     */
    updateProperties() {
      const headerProperties = this.headerProperties;
      const infoProperties = this.infoProperties;
      const panelTopProperties = this.panelTopProperties;
      const panelBaniere = this.panelBaniere;
      const navProperties = this.navProperties;
      const projectProperties = this.projectProperties;

      this.index = projectProperties.index;
      this.name = projectProperties.name;
      this.template = projectProperties.template;
      this.url = projectProperties.url;
      this.primaryColor = projectProperties.primaryColor;
      this.secondaryColor = projectProperties.secondaryColor;

      headerProperties.src = projectProperties.header.src;
      infoProperties.type = projectProperties.info.type;
      infoProperties.role = projectProperties.info.role;
      infoProperties.agency = projectProperties.info.agency;
      infoProperties.date = projectProperties.info.date;
      infoProperties.description = projectProperties.info.description;

      panelTopProperties.backgroundPosition = projectProperties.panelTop.backgroundPosition;
      panelTopProperties.foregroundPosition = projectProperties.panelTop.foregroundPosition;
      panelTopProperties.backgroundSrc = projectProperties.panelTop.backgroundSrc;
      panelTopProperties.foregroundSrc = projectProperties.panelTop.foregroundSrc;

      panelBaniere.imageSrc = projectProperties.panelBaniere.imageSrc;


      this.panelCenterProperties = projectProperties.panelCenter;
      this.panelMobileProperties = projectProperties.panelMobile;
      this.panelScreenProperties = projectProperties.panelScreen;
      this.panelBottomProperties = projectProperties.panelBottom;

      switch (panelTopProperties.backgroundPosition) {
        case 'left':
          panelTopProperties.backgroundStyle = { left: 0 };
          break;
        case 'right':
          panelTopProperties.backgroundStyle = { right: 0 };
          break;
        case 'cover':
          panelTopProperties.backgroundStyle = { backgroundImage: `url(${panelTopProperties.backgroundSrc})` };
          break;
      }

      switch (panelTopProperties.foregroundPosition) {
        case 'left':
          panelTopProperties.foregroundStyle = { left: 0, transform: 'translate3d(0, -50%, 0px)' };
          break;
        case 'right':
          panelTopProperties.foregroundStyle = { right: 0, transform: 'translate3d(0, -50%, 0px)' };
          break;
        case 'center':
          panelTopProperties.foregroundStyle = { left: '50%', transform: 'translate3d(-50%, -50%, 0px)' };
          break;
      }

      navProperties.previous.name = this.getPreviousProjectProperties().name;
      navProperties.previous.template = this.getPreviousProjectProperties().template;
      navProperties.previous.src = this.getPreviousProjectProperties().header.src;
      navProperties.previous.path = '/projects/' + projectNameToRoute(navProperties.previous.name);
      navProperties.next.name = this.getNextProjectProperties().name;
      navProperties.next.template = this.getNextProjectProperties().template;
      navProperties.next.src = this.getNextProjectProperties().header.src;
      navProperties.next.path = '/projects/' + projectNameToRoute(navProperties.next.name)
    }
  },
  created() {
    this.updateProperties();
  },
  mounted() {
    window.scroll(0, 0);

    setTimeout(() => {
      transitionManager.fadeProjectIn(this.index);
    }, 50);
  },
  watch : {
    projectProperties : function() {
      this.updateProperties();
    }
  }
}
