import { Component, Prop, Vue } from 'vue-property-decorator'
import AboutView from '@/views/About.vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'
import firebaseConfig from '../../firebaseConfig'
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
  private formCategory: string = ''
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
      formCategory: this.formCategory || 'Entrepreneur',
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
        err => {
          if (err) {
            this.$buefy.notification.open('Error during upload')
            this.deletePresentationFile()
          }
        },
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
    } else if (this.uploadTask) {
      // Still uploading => cancel
      this.uploadTask.cancel()
    }

    // Reset all upload fields
    this.formPresentation = null
    this.presentationUrl = null
    this.presentationRef = null
    this.uploadTask = null
    this.uploadProgress = 0
  }

  submit () {
    // Finish file uploads first
    if (this.uploadTask && this.uploadProgress !== 100) {
      this.$buefy.notification.open('Please wait for file upload to complete')
      return
    }

    // Start submission
    this.submitted = true

    // Data
    const lineIdClean = this.formLine.replace('@', '').toLowerCase()

    const update: any = {
      teamName: this.formTeamName,
      contactName: this.formContactName,
      lineId: lineIdClean,
      email: this.formEmail,
      category: this.formCategory
    }

    // Optional data
    if (this.presentationUrl) {
      update.presentation = this.presentationUrl
    }

    // Save to Firestore
    firebase.firestore()
      .collection('teams').doc(lineIdClean)
      .set(update, { merge: true })
      .then(() => {
        this.submitted = false
        this.$router.push('confirm')
      })
      .catch(err => {
        if (err) {
          this.$buefy.notification.open('Could not submit :(')
          this.submitted = false
        }
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
