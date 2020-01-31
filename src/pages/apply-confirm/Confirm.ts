import { Component, Prop, Vue } from 'vue-property-decorator'
import AboutView from '@/views/About.vue'

@Component({
  components: {
    'app-about': AboutView
  }
})

export default class ConfirmPage extends Vue {

}
