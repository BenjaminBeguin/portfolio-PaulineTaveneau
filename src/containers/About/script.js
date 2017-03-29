import { transitionManager } from '../../helpers/TransitionManager'

import Header from '../../components/Header'
import SocialNetwork from '../../components/SocialNetwork'

export default {
  methods: {
    /**
     * close method
     */
    close() {
      this.$router.go(-1);
    }
  },
  components: {
    Header,
    SocialNetwork
  },
  mounted() {
    setTimeout(() => {
      transitionManager.fadeAboutIn();
    }, 50);
  }
}
