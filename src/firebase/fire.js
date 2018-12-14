import firebase from 'firebase'
// var firebase = require('firebase')
require('dotenv').config()
var config = {
  apiKey: process.env.API_KEY,
  authDomain: 'youngfox-blackjack.firebaseapp.com',
  databaseURL: 'https://youngfox-blackjack.firebaseio.com',
  projectId: 'youngfox-blackjack',
  storageBucket: 'youngfox-blackjack.appspot.com',
  messagingSenderId: '82165920548'
}
const firebaseStart = firebase.initializeApp(config)

export default firebaseStart




