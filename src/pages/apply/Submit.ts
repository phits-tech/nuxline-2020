import { Component, Prop, Vue } from 'vue-property-decorator'
import AboutView from '@/views/About.vue'
import firebaseConfig from './firebaseConfig'
import * as firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'

firebase.initializeApp(firebaseConfig)

@Component({
  components: {
    'app-about': AboutView
  }
})

export default class SubmitPage extends Vue {
  // TODO - Get the user's actual UID
  private userUid = 'example123'

  // Data & State
  private formTeamName: string = ''
  private formPresentation: File | null = null

  private presentationRef: string | null = null
  private presentationUrl: string | null = null

  private uploadTask: firebase.storage.UploadTask | null = null
  private uploadProgress: number = 0
  private submitted: boolean = false

  // Functions
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

  getPresentationRef (file: File) {
    return `/presentations/${this.userUid}-${file.name}`
  }

  uploadPresentation () {
    const file = this.formPresentation

    if (file) {
      const fileRef = this.getPresentationRef(file)
      const task = firebase.storage().ref(fileRef).put(file)

      task.on('state_changed',
        snap => { this.uploadProgress = Math.floor(snap.bytesTransferred / snap.totalBytes * 100) },
        err => console.error(err),
        () => {
          this.uploadProgress = 100
          task.snapshot.ref.getDownloadURL().then(url => { this.presentationUrl = url })
        })

      this.uploadTask = task
      this.presentationRef = fileRef
    }
  }

  deletePresentationFile () {
    if (this.uploadProgress === 100 && this.presentationRef) {
      // Uploaded already => delete
      firebase.storage().ref(this.presentationRef).delete()
        .catch((err) => console.error(err))
    } else if (this.uploadTask) {
      // Still uploading => cancel
      this.uploadTask.cancel()
    }

    this.formPresentation = null
    this.presentationUrl = null
    this.presentationRef = null
    this.uploadTask = null
    this.uploadProgress = 0
  }

  submit () {
    this.submitted = true

    const update = {
      teamName: this.formTeamName,
      presentation: this.presentationUrl
    }

    firebase.firestore()
      .collection('teams').doc(this.userUid)
      .set(update, { merge: true })
      .then(() => {
        this.$buefy.snackbar.open('Success!')
        this.submitted = false
      })
      .catch(err => {
        console.error(err)
      })
  }
}
