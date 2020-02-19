import { Component, Prop, Vue } from 'vue-property-decorator'
import { firestore } from '@/services/apis/firebase-facade'

@Component
export default class TeamSummaryPage extends Vue {
  entrepreneurs: Array<any> = []
  students: Array<any> = []

  private entrepreneursRef = firestore.collection('teams')
    .where('category', '==', 'Entrepreneur')
    .orderBy('teamName')

  private studentsRef = firestore.collection('teams')
    .where('category', '==', 'Student')
    .orderBy('teamName')

  constructor () {
    super()

    this.entrepreneursRef.get()
      .then(snap => {
        snap.docs
          .map(doc => doc.data())
          .map(data => {
            data.contactName = this.titleCase(data.contactName)
            return data
          })
          .forEach(data => this.entrepreneurs.push(data))
      })

    this.studentsRef.get()
      .then(snap => {
        snap.docs
          .map(doc => doc.data())
          .map(data => {
            data.contactName = this.titleCase(data.contactName)
            return data
          })
          .forEach(data => this.students.push(data))
      })
  }

  titleCase = (str: String) =>
    str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
}
