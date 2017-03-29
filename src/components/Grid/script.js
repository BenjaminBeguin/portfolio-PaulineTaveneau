import Grid from '../Grid'

export default {
  props: [
    'name',
    'rows'
  ],
  components: {
    Grid
  },
  beforeCreate() {
    this.$options.components.Grid = require('./index.vue')
  }
}
