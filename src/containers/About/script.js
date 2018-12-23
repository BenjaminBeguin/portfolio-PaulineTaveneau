import { transitionManager } from '../../helpers/TransitionManager'

import Header from '../../components/Header'
import SocialNetwork from '../../components/SocialNetwork'

export default {
  methods: {
    /**
     * close method
     */
    close() {
      transitionManager.fadeAboutOut();

      setTimeout(() => {
        this.$router.go(-1);
      }, 1500);
      // setTimeout(function () {
      //   window.scroll(0, 0) // dirty but i dont why it goes scrolltoBottom otherwhise
      // }, 10);
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
