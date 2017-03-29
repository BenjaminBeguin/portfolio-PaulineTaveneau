import _ from 'lodash'
import axios from 'axios'

import Emitter from './Emitter'
import { ON_ASSETS_LOADED } from '../config/events'

class AssetsManager {
  constructor() {
    this.settings = null;
    this.projectsProperties = null;

    this.numberOfImages = 0;
    this.preloadedImages = 0;

    return this.init();
  }

  init() {
    return axios.all([this.getSettings(), this.getProjectsProperties()])
      .then(axios.spread((_settings, _projectsProperties) => {
        this.settings = _settings.data;
        this.projectsProperties = _projectsProperties.data.array;

        return this.load();
      }));
  }

  load() {
    const promises = [];
    const images = [];

    for (let i = 0; i < this.projectsProperties.length; i++) {
      const projectProperties = this.projectsProperties[i];

      images.push(projectProperties.overview.src);
      images.push(projectProperties.header.src);
      images.push(projectProperties.panelTop.backgroundSrc);
      if (projectProperties.panelTop.foregroundSrc)
        images.push(projectProperties.panelTop.foregroundSrc);

    }

    this.numberOfImages = images.length;

    for (let i = 0; i < images.length; i++) {
      promises.push(this.preloadImage(images[i]))
    }

    return Promise.all(promises).then(() => {
      return {settings: this.settings, projectsProperties: this.projectsProperties}
    });
  }

  preloadImage(_src) {
    return new Promise((resolve) => {
      const image = new Image();

      image.onload = () => {
        this.preloadedImages++;
        const loadingPercent = 100 * this.preloadedImages / this.numberOfImages * 0.01;

        Emitter.emit(ON_ASSETS_LOADED, loadingPercent);
        resolve();
      };
      image.src = _src;
    })
  }

  getSettings() {
    return axios.get('/static/config/settings.json');
  }

  getProjectsProperties() {
    return axios.get('/static/data/projects-properties.json');
  }
}

export default AssetsManager;
