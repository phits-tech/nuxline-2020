import firebaseConfig from './firebase-config'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

firebase.initializeApp(firebaseConfig)

export const firestore = firebase.firestore()
export const storage = firebase.storage()
export const FieldValue = firebase.firestore.FieldValue
export const Timestamp = firebase.firestore.Timestamp

export default { firestore, storage, FieldValue, Timestamp }
