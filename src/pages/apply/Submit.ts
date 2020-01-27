import { Component, Prop, Vue } from 'vue-property-decorator'
import AboutView from '@/views/About.vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'
import firebaseConfig from './firebaseConfig'
import * as firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
firebase.initializeApp(firebaseConfig)

// extend('secret', {
//   validate: value => value === 'example',
//   message: 'This is not the magic word'
// })

extend('email', {
  ...email,
  message: 'Must be a valid email'
})

extend('required', {
  ...required,
  message: 'Required'
})

@Component({
  components: {
    'app-about': AboutView
  }
})

export default class SubmitPage extends Vue {
  // Data & State
  private formTeamName: string = ''
  private formContactName: string = ''
  private formLine: string = ''
  private formEmail: string = ''
  private formPresentation: File | null = null

  private randomKey = this.uuidv4()
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
      formContactName: this.formContactName,
      formLine: this.formLine,
      formEmail: this.formEmail,
      formPresentation: this.formPresentation,
      uploadProgress: this.uploadProgress,
      submitted: this.submitted
    })
  }

  getPresentationRef (file: File) {
    return `/presentations/${this.randomKey}-${file.name}`
  }

  uploadPresentation () {
    const file = this.formPresentation

    if (file) {
      const maxSize = 10
      if (file.size > (maxSize * 1000000)) {
        this.$buefy.notification.open(`Presentation must be less than ${maxSize}MB`)
        this.formPresentation = null
        return
      }
      if (!file.name.toLowerCase().endsWith('pdf')) {
        this.$buefy.notification.open(`Presentations must be PDF format`)
        this.formPresentation = null
        return
      }

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

    const update: any = {
      teamName: this.formTeamName,
      contactName: this.formContactName,
      lineId: this.formLine.replace('@', ''),
      email: this.formEmail
    }

    if (this.presentationUrl) {
      update.presentation = this.presentationUrl
    }

    firebase.firestore()
      .collection('teams').doc(this.formLine.replace('@', ''))
      .set(update, { merge: true })
      .then(() => {
        this.$buefy.notification.open('Success!')
        this.submitted = false
      })
      .catch(err => {
        console.error(err)
      })
  }

  uuidv4 () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }
}
