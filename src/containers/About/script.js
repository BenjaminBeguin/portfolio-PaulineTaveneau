import { transitionManager } from '../../helpers/TransitionManager'

import Header from '../../components/Header'
import SocialNetwork from '../../components/SocialNetwork'

export default {
  data: () => {
    return {
      headIsBottom: false,
      headCanScroll: true
    }
  },
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
    },
    handleScrollWindow() {
      if (window.scrollY >= 5) {
        this.headCanScroll = false
      } else {
        this.headCanScroll = true
      }

      console.log(this.headCanScroll);
    },
    checkScroll() {
      const about = document.getElementById('aboutHead');
      const social = document.getElementById('aboutSocial');

      window.addEventListener('scroll', this.handleScrollWindow);

      // about.addEventListener('scroll', () => {
      //   if (about.scrollTop + about.offsetHeight >= about.scrollHeight - 5) {
      //     this.headIsBottom = true
      //   } else {
      //     this.headIsBottom = false
      //   }
      // })
    }
  },
  components: {
    Header,
    SocialNetwork
  },
  mounted() {
    setTimeout(() => {
      transitionManager.fadeAboutIn();
      this.checkScroll()
    }, 50);
  },
  beforeDestroy() {
    // about.removeEventListener('scroll')
    window.removeEventListener('scroll', handleScrollWindow)
  }
}
