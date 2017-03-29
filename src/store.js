export const store = {
  isInit: false,
  state: {
    settings: null,
    projectsProperties: null,
    mobileDetect: null
  },
  setSettings (newSettings) {
    this.state.settings = newSettings
  },
  setProjectsProperties (newProjectsProperties) {
    this.state.projectsProperties = newProjectsProperties
  },
  setMobileDetect (newMobileDetect) {
    this.state.mobileDetect = newMobileDetect
  },
  hasInit (bool) {
    this.isInit = bool
  }
};
