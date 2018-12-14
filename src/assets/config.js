import firebase from 'firebase'

// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
    apiKey: process.env.API_KEY,
    authDomain: "youngfox-blackjack.firebaseapp.com",
    databaseURL: "https://youngfox-blackjack.firebaseio.com",
    projectId: "youngfox-blackjack",
    storageBucket: "youngfox-blackjack.appspot.com",
    messagingSenderId: "82165920548"
};
firebase.initializeApp(config);

// Get a reference to the database service
var db = firebase.database();

export default db