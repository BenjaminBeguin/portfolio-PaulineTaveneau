import { store } from '../../store'
import { routeToProjectIndex } from '../../helpers/utils'

import Header from '../../components/Header'
import Project from '../../components/Project';

export default {
  data: () => {
    return {
      projectProperties: null
    }
  },
  components: {
    Header,
    Project
  },
  methods: {
    /**
     * updateProperties method
     */
    updateProperties() {
      const index = routeToProjectIndex(this.$route.params.name);

      this.projectProperties = store.state.projectsProperties[index];
    }
  },
  created() {
    this.updateProperties();
  },
  beforeUpdate() {
    this.updateProperties();
  }
}
