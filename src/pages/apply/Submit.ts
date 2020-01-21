import { Component, Prop, Vue } from 'vue-property-decorator'
import AboutView from '@/views/About.vue'
import firebaseConfig from './firebaseConfig'
import * as firebase from 'firebase/app'
import 'firebase/storage'

firebase.initializeApp(firebaseConfig)

@Component({
  components: {
    'app-about': AboutView
  }
})

export default class SubmitPage extends Vue {
  // TODO - Get the user's actual UID
  private userUid = 'example123'

  // Data
  private formTeamName: string = ''
  private formPresentation: File | null = null

  // State
  private uploadProgress: number = 0
  private submitted: boolean = false

  // Private
  private uploadTask: firebase.storage.UploadTask | null = null
  private presentationUrl: string | null = null

  mounted () {
    this.$watch('$data.formPresentation', this.uploadPresentation)
  }

  data () {
    return ({
      formTeamName: this.formTeamName,
      formPresentation: this.formPresentation,
      uploadProgress: this.uploadProgress,
      submitted: this.submitted
    })
  }

  uploadPresentation () {
    this.uploadProgress = 1

    const file = this.formPresentation
    if (file) {
      const task = firebase.storage().ref(`/presentations/${this.userUid}`).put(file)

      task.on('state_changed',
        snap => { this.uploadProgress = Math.floor(snap.bytesTransferred / snap.totalBytes * 100) },
        (err) => { console.log(err) },
        () => { this.presentationUrl = task.snapshot.downloadURL })
      // task.snapshot.ref.getDownloadURL().then(url => { this.presentationUrl = url })

      this.uploadTask = task
    }
  }

  deletePresentationFile () {
    this.formPresentation = null
  }

  submit () {
    this.submitted = true
    this.$buefy.notification.open(`Submitting: ${this.formTeamName} + ${(this.formPresentation || { name: 'No file' }).name}`)
  }
}
