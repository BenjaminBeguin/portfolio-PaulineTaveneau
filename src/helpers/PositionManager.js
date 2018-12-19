import { store } from '../store'

import { getScale } from './utils'

/**
 * PositionManager class
 */
class PositionManager {
  /**
   * constructor method
   */
  constructor() {
    this.numberOfProjects = null;
    this.normalizedDistance = null;
    this.defaultRadius = null;
  }

  init() {
    this.numberOfProjects = store.state.projectsProperties.length;
    this.normalizedDistance = 0;
    this.defaultRadius = {
      x: this.numberOfProjects * store.state.settings.projectOverviewPositioningRadius.x,
      y: this.numberOfProjects * store.state.settings.projectOverviewPositioningRadius.y
    }
  }

  /**
   * getOverviewPosition method
   * @param index
   * @returns {{x: number, y: number, z: number}}
  */
  getOverviewPosition(index) {
    const overview = document.getElementById(`overview-${index}`);

    if(!overview) {
      return {x: 0, y: 0, z: 0};
    }

    const numberOfProjects = this.numberOfProjects;
    let normalizedDistance = 0.5 - this.normalizedDistance;

    if (this.normalizedDistance > 0.5) {
      normalizedDistance = 0
    }

    const radius = {
      x: this.defaultRadius.x + normalizedDistance * window.innerWidth,
      y: this.defaultRadius.y + normalizedDistance * window.innerHeight
    };

    const scale = getScale(overview);
    const angle = (index / (numberOfProjects * 0.5)) * Math.PI + 3;
    const x = Math.round(window.innerWidth * 0.5 - overview.clientWidth * 0.5 + radius.x * scale * Math.cos(angle));
    const y = Math.round(window.innerHeight * 0.5 - overview.clientHeight * 0.5 + radius.y * scale * Math.sin(angle));
    const z = numberOfProjects - index;

    return {x, y, z}
  }

  /**
   * getTooltipPosition method
   * @param index
   * @returns {{y: number}}
     */
  getOverviewTitlePosition(index) {
    const overviewTitle = document.getElementById(`overview-title-${index}`);
    const title = overviewTitle.getElementsByTagName('h2')[0];
    const titleHeight = title.offsetHeight;

    const y = (titleHeight * index  + store.state.settings.projectOverviewTitleMargin) +
      ((window.innerHeight + 20) / 2 - titleHeight * this.numberOfProjects / 2);

    return {y}
  }
}

export let positionManager = new PositionManager();
