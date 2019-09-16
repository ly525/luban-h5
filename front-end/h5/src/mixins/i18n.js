import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      currentLang: state => state.i18n.lang
    })
  },
  methods: {
    ...mapActions('i18n', ['SetLang']),
    setLang (lang) {
      this.SetLang(lang)
    }
  }
}
