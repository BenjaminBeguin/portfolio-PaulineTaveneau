import { store } from '../store'

import { TweenMax, TimelineLite, Power2 } from 'gsap';

import { positionManager } from './PositionManager'

import { projectNameToRoute, routeToProjectIndex } from './utils'

/**
 * TransitionManager class
 */
class TransitionManager {
  /**
   * beforeRouteChange method
   * @param to
   * @param from
   * @param next
   */
  beforeRouteChange(to, from, next) {
    if (from.name === 'home') {
      this.fadeHomeOut(next);
    } else if (from.path.split('/')[1] === 'projects') {
      const index = routeToProjectIndex(from.params.name);
      const projectProperties = store.state.projectsProperties[index];

      this.fadeProjectOut(projectProperties.index, next);
    } else if (from.name === 'about') {
      setTimeout(() => {
        this.fadeAboutOut(next);
      }, 0);
    }
    else {
      next();
    }
  }

  /**
   * afterRouteChange method
   * @param to
   * @param from
   */
  afterRouteChange(to, from) {
    if (from.name && to.name === 'home') {
      this.fadeHomeIn();
    }
  }

  //////////
  // Init
  //////////

  /**
   * initOverview method
   * @param index
   */
  initOverview(index) {
    const overview = document.getElementById(`overview-${index}`);
    const position = positionManager.getOverviewPosition(index);

    if (!overview) {
      return;
    }

    TweenMax.to(overview, 0, {
      top: position.y,
      left: position.x,
      zIndex: position.z,
      force3D: true
    });

    TweenMax.to(overview, 1, {
      opacity: 1,
    });
  }

  /**
   * initOverviewTitle method
   * @param index
   */
  initOverviewTitle(index) {
    const overviewTitle = document.getElementById(`overview-title-${index}`);
    const position = positionManager.getOverviewTitlePosition(index);

    if (!overviewTitle) {
      return;
    }

    TweenMax.to(overviewTitle, 0, {
      top: position.y,
      autoAlpha: store.state.settings.projectOverviewTitleDefaultOpacity,
      force3D: true
    });
  }

  /**
   * initTitle method
   */
  initTitle() {
    setTimeout(() => {
      const title = document.getElementsByTagName('h1')[0];

      if (!title) {
        return;
      }

      TweenMax.to(title, store.state.settings.titleFadeSpeed, {
        autoAlpha: 1,
        ease: Power2.easeInOut
      });
    }, 0)
  }

  //////////
  // Fade
  //////////

  /**
   * fadeOutLoader method
   */
  fadeOutLoader() {
    const loader = document.getElementById('loader');

    if (!loader) {
      return;
    }
    TweenMax.to(loader, store.state.settings.loaderFadeSpeed, {
      autoAlpha: 0,
      ease: Power2.easeInOut
    });
  }

  /**
   * fadeOverview method
   */
  fadeOverview() {
    const overviewsTitles = document.getElementsByClassName('overviews-titles')[0];
    const overviewsContainer = document.getElementsByClassName('container')[0];

    TweenMax.to(overviewsTitles, store.state.settings.projectOverviewRepositioningSpeed, {
      autoAlpha: positionManager.normalizedDistance
    });

    let colorState = positionManager.normalizedDistance * 2;


    TweenMax.to(overviewsContainer, store.state.settings.projectOverviewRepositioningSpeed, {
      backgroundColor: `rgba(15,15,15, ${colorState})`
    });

    for (let i = 0; i < store.state.projectsProperties.length; i++) {
      const projectProperties = store.state.projectsProperties[i];
      const index = projectProperties.index;
      const overview = document.getElementById(`overview-${index}`);
      const overviewTitle = document.getElementById(`overview-title-${index}`);
      const overviewPosition = positionManager.getOverviewPosition(index);
      const overviewTitleposition = positionManager.getOverviewTitlePosition(index);

      if (!overview) {
        return;
      }

      TweenMax.to(overview, store.state.settings.projectOverviewRepositioningSpeed, {
        top: overviewPosition.y,
        left: overviewPosition.x,
        force3D: true
      });

      if (!overviewTitle) {
        return;
      }

      TweenMax.to(overviewTitle, 0, {
        top: overviewTitleposition.y,
        force3D: true
      });
    }
  }

  /**
   * fadeTitle method
   */
  fadeTitle() {
    const title = document.getElementsByTagName('h1')[0];

    if (!title) {
      return;
    }

    TweenMax.to(title, 0.15, {
      autoAlpha: 1 - positionManager.normalizedDistance * 4,
      ease: Power2.easeInOut
    });
  }

  /**
   * fadeHeaderIn method
   */
  fadeHeaderIn() {
    const header = document.getElementById('header');

    if (!header) {
      return;
    }

    TweenMax.to(header, store.state.settings.headerFadeSpeed, {
      autoAlpha: 1,
      ease: Power2.easeInOut
    });
  }

  /**
   * fadeHeaderOut method
   */
  fadeHeaderOut() {
    const header = document.getElementById('header');

    if (!header) {
      return;
    }

    TweenMax.to(header, store.state.settings.headerFadeSpeed, {
      autoAlpha: 0,
      ease: Power2.easeOut
    });
  }

  /**
   * fadeSocialNetworkIn method
   */
  fadeSocialNetworkIn() {
    const socialNetwork = document.getElementById('social-network');

    if (!socialNetwork) {
      return;
    }

    TweenMax.to(socialNetwork, store.state.settings.socialNetworkFadeSpeed, {
      autoAlpha: 1,
      ease: Power2.easeInOut
    });
  }

  /**
   * fadeSocialNetworkOut method
   */
  fadeSocialNetworkOut() {
    const socialNetwork = document.getElementById('social-network');

    if (!socialNetwork) {
      return;
    }

    TweenMax.to(socialNetwork, store.state.settings.socialNetworkFadeSpeed, {
      autoAlpha: 0,
      ease: Power2.easeOut
    });
  }

  /**
   * fadeMouseScrollIn method
   */
  fadeMouseScrollIn() {
    const mouseScroll = document.getElementById('mouse-scroll');

    if (!mouseScroll) {
      return;
    }

    TweenMax.to(mouseScroll, store.state.settings.mouseScrollFadeSpeed, {
      autoAlpha: 1,
      ease: Power2.easeInOut
    });
  }

  /**
   * fadeMouseScrollOut method
   */
  fadeMouseScrollOut() {
    const mouseScroll = document.getElementById('mouse-scroll');

    if (!mouseScroll) {
      return;
    }

    TweenMax.to(mouseScroll, store.state.settings.mouseScrollFadeSpeed, {
      autoAlpha: 0,
      ease: Power2.easeOut
    });
  }

  /**
   * fadeHomeIn method
   */
  fadeHomeIn() {
    setTimeout(() => {
      TweenMax.to(positionManager, store.state.settings.projectOverviewFadeSpeed, {
        normalizedDistance: 1,
        ease: Power2.easeInOut,
        onUpdate: () => {
          this.fadeOverview()
        },
        onComplete: () => {
          this.fadeHeaderIn();
          this.fadeSocialNetworkIn();
        }
      });
    }, 100)
  }

  /**
   * fadeHomeOut method
   * @param next
   */
  fadeHomeOut(next) {
    const overviewsContainer = document.getElementsByClassName('container')[0];

    setTimeout(function () {
      TweenMax.to(overviewsContainer, 0.5, {
        autoAlpha: 0,
        ease: Power2.linear
      })
    }, store.state.settings.projectOverviewFadeSpeed * 800);

    TweenMax.to(positionManager, store.state.settings.projectOverviewFadeSpeed, {
      normalizedDistance: 0,
      autoAlpha: 0,
      ease: Power2.easeInOut,
      onUpdate: () => {
        this.fadeOverview()
      },
      onComplete: () => {
        this.fadeHeaderOut();
        this.fadeSocialNetworkOut();
        setTimeout(() => {
          next();
        }, 200)
      }
    });



  }

  /**
   * fadeProjectIn method
   * @param index
   */
  fadeProjectIn(index) {
    const project = document.getElementById(`project-${index}`);
    const projectHeader = project.getElementsByClassName('project-header')[0];
    const projectHeaderDefaultHeight = projectHeader.clientHeight;
    const projectHeaderImage = projectHeader.getElementsByTagName('img');
    const projectBlocks = project.getElementsByClassName('fading-block');

    if (!project) {
      return;
    }

    const tl = new TimelineLite();

    tl.fromTo(project, store.state.settings.projectFadeSpeed,
      {
        autoAlpha: 0,
        transform: `translateY(${window.innerHeight * 0.2}px)`
      },
      {
        autoAlpha: 1,
        transform: `translateY(0px)`,
        ease: Power2.easeInOut,
        force3D: true
      }, 0)
      .fromTo(projectHeader, store.state.settings.projectFadeSpeed,
        {
          transform: `translateY(${projectHeaderDefaultHeight * 0.1}px)`,
          maxHeight: projectHeaderDefaultHeight * 0.9
        },
        {
          transform: `translateY(0px)`,
          maxHeight: projectHeaderDefaultHeight,
          ease: Power2.easeInOut,
          force3D: true
        }, 0)
      .fromTo(projectHeaderImage, store.state.settings.projectFadeSpeed,
        {
          transform: `translateY(-${projectHeaderDefaultHeight * 0.1}px)`
        },
        {
          transform: `translateY(0px)`,
          ease: Power2.easeInOut,
          force3D: true
        }, 0)
      .add('stagger', store.state.settings.projectStaggerDelay)
      .staggerFromTo(projectBlocks, store.state.settings.projectStaggerFade,
        {
          autoAlpha: 0,
          transform: `translateY(${projectHeaderDefaultHeight * 0.1}px)`
        },
        {
          autoAlpha: 1,
          transform: `translateY(0px)`,
          ease: Power2.easeInOut,
          force3D: true
        }, store.state.settings.projectStaggerDelay, "stagger");

    this.fadeHeaderIn();
  }

  /**
   * fadeProjectOut method
   * @param index
   * @param next
   */
  fadeProjectOut(index, next) {
    const project = document.getElementById(`project-${index}`);
    const projectHeader = project.getElementsByClassName('project-header')[0];
    const projectHeaderDefaultHeight = projectHeader.clientHeight;
    const projectHeaderImage = projectHeader.getElementsByTagName('img');

    const windowScroll = {y: window.scrollY};

    if (!project) {
      return;
    }

    const tl = new TimelineLite();

    tl.to(windowScroll, store.state.settings.projectFadeSpeed,
      {
        y: windowScroll.y - window.innerHeight * 0.5,
        ease: Power2.easeInOut,
        force3D: true,
        onUpdate: () => {
          window.scroll(0, windowScroll.y)
        }
      })
      .to(project, store.state.settings.projectFadeSpeed,
        {
          autoAlpha: 0,
          transform: `translateY(${-window.innerHeight * 0.2}px)`,
          ease: Power2.easeInOut,
          force3D: true
        }, 0)
      .to(projectHeader, store.state.settings.projectFadeSpeed,
        {
          transform: `translateY(${projectHeaderDefaultHeight * 0.1}px)`,
          maxHeight: projectHeaderDefaultHeight * 0.9,
          ease: Power2.easeInOut,
          force3D: true
        }, 0)
      .to(projectHeaderImage, store.state.settings.projectFadeSpeed,
        {
          transform: `translateY(${-projectHeaderDefaultHeight * 0.1}px)`,
          ease: Power2.easeInOut,
          force3D: true
        }, 0)
      .call(next);

    this.fadeHeaderOut();
  }

  /**
   * fadeAboutIn method
   */
  fadeAboutIn() {
    const about = document.getElementById('about');
    const close = document.getElementsByClassName('close')[0];
    const thanks = document.getElementsByClassName('thanks')[0];
    const aboutBlocks = about.getElementsByClassName('fading-block');

    if (!about) {
      return;
    }

    const tl = new TimelineLite();

    window.scroll(0, 0)

    tl.to(close, store.state.settings.headerFadeSpeed, {
        autoAlpha: 1,
        ease: Power2.easeInOut
      })
      .to(about, store.state.settings.aboutFadeSpeed, {
        autoAlpha: 1,
        ease: Power2.easeInOut
      })
      .add('stagger', store.state.settings.aboutStaggerDelay)
      .staggerFromTo(aboutBlocks, store.state.settings.aboutStaggerFade,
        {
          autoAlpha: 0,
          transform: `translateY(${window.innerHeight * 0.05}px)`
        },
        {
          autoAlpha: 1,
          transform: `translateY(0px)`,
          ease: Power2.easeInOut,
          force3D: true
        }, store.state.settings.aboutStaggerDelay, "stagger")
      .to(thanks, store.state.settings.headerFadeSpeed, {
        autoAlpha: 1,
        ease: Power2.easeInOut
      });

    this.fadeHeaderIn();
    this.fadeSocialNetworkIn();
  }

  /**
   * fadeAboutOut method
   * @param next
   */
  fadeAboutOut(next) {
    const about = document.getElementById('about');
    const close = document.getElementsByClassName('close')[0];
    const thanks = document.getElementsByClassName('thanks')[0];

    if (!about) {
      return;
    }

    const tl = new TimelineLite();

    tl.to(close, store.state.settings.headerFadeSpeed, {
        autoAlpha: 0,
        ease: Power2.easeInOut
      })
      .to(thanks, store.state.settings.headerFadeSpeed, {
        autoAlpha: 0,
        ease: Power2.easeInOut
      }, 0)
      .to(about, store.state.settings.aboutFadeSpeed, {
        autoAlpha: 0,
        ease: Power2.easeInOut
      })

    if (next) {
      tl.call(next);
    }

    this.fadeHeaderOut();
    this.fadeSocialNetworkOut();
  }

  //////////
  // Over
  //////////

  overOverviewIn(index) {
    const overview = document.getElementById(`overview-${index}`);

    if (!overview) {
      return;
    }


    setTimeout(function () {
      overview.style.zIndex = 99;
    }, store.state.settings.projectOverviewOpacitySpeed  * 700);

    TweenMax.to(overview, store.state.settings.projectOverviewOpacitySpeed, {
      autoAlpha: 1,
      ease: Power2.easeOut
    });
  }

  overOverviewOut(index) {
    const overview = document.getElementById(`overview-${index}`);

    if (!overview) {
      return;
    }

    overview.style.zIndex = positionManager.getOverviewPosition(index).z;

    TweenMax.to(overview, store.state.settings.projectOverviewOpacitySpeed, {
      autoAlpha: 0.1,
      ease: Power2.easeOut
    });
  }

  overOverviewDefault(index) {
    const overview = document.getElementById(`overview-${index}`);

    if (!overview) {
      return;
    }

    overview.style.zIndex = positionManager.getOverviewPosition(index).z;

    TweenMax.to(overview, store.state.settings.projectOverviewOpacitySpeed, {
      autoAlpha: 1,
      ease: Power2.easeOut
    });
  }

  /**
   * overOverviewTitleIn method
   * @param index
   */
  overOverviewTitleIn(index) {
    const overviewTitle = document.getElementById(`overview-title-${index}`);
    const title = overviewTitle.getElementsByTagName('h2')[0];

    if (!overviewTitle && !title) {
      return;
    }

    const tl = new TimelineLite();

    overviewTitle.style.zIndex = 999;

    tl.to(overviewTitle, store.state.settings.projectOverviewTitleFadeSpeed,
      {
        autoAlpha: 1,
        ease: Power2.easeOut
      }, 0)
      .fromTo(title, store.state.settings.projectOverviewTitleFadeSpeed,
        {
          transform: `translateY(${title.offsetHeight * 0.5}px)`
        },
        {
          transform: 'translateY(0px)',
          ease: Power2.easeOut,
          force3D: true
        }, 0)
  }

  /**
   * overOverviewTitleOut method
   * @param index
   */
  overOverviewTitleOut(index) {
    const overviewTitle = document.getElementById(`overview-title-${index}`);
    const title = overviewTitle.getElementsByTagName('h2')[0];

    if ((!overviewTitle && !title) || overviewTitle.style.opacity == store.state.settings.projectOverviewTitleDefaultOpacity) {
      return;
    }

    const tl = new TimelineLite();

    tl.to(overviewTitle, store.state.settings.projectOverviewTitleFadeSpeed,
      {
        autoAlpha: store.state.settings.projectOverviewTitleDefaultOpacity,
        ease: Power2.easeOut,
        onComplete: () => {
          TweenMax.to(title, store.state.settings.projectOverviewTitleFadeSpeed, {
            transform: 'translateY(0px)'
          });
          overviewTitle.style.zIndex = 0;
        }
      }, 0)
  }
}

export let transitionManager = new TransitionManager();
