import firebase from "firebase-admin"
import {firebaseConfig} from '../config'

firebase.initializeApp(firebaseConfig);

module.exports = firebase
