'use strict';

// Initialize Firebase
let config = {
  apiKey: 'AIzaSyAKHPRrQNig4S-hol7JKCYRMQMP1-rsTg8',
  authDomain: 'esptest-73b9b.firebaseapp.com',
  databaseURL: 'https://esptest-73b9b.firebaseio.com',
  projectId: 'esptest-73b9b',
  storageBucket: 'esptest-73b9b.appspot.com',
  messagingSenderId: '766348783330'
};
firebase.initializeApp(config);
// SIGN ANONYMOUS USER ----
firebase.auth().onAuthStateChanged(function(user) {
  console.log('onAuthStateChanged');
  if (user) {
    console.log(user);
    // User is signed in.
    let isAnonymous = user.isAnonymous;
    let uid = user.uid;
    // console.log(uid);
  } else {
    // No user is signed in.
  }
});

firebase.auth().signInAnonymously().catch(function(error) {
  // Handle Errors here.
  let errorCode = error.code;
  let errorMessage = error.message;
  console.log('anonymously auth error ----- ' + errorCode);
  console.log(errorCode);
});


let database = firebase.database();
let toggle = document.getElementById('check');
toggle.addEventListener('change', change);
let onOff = false;
document.body.addEventListener('keydown', onKeyDown);

database.ref('RED_LED').on('value', function(snapshot) {
  let value = snapshot.val();
  if (value == 1) {
    toggle.checked = true;

  } else {
    toggle.checked = false;
  }
});

function sendMessage(_type, _data = 'yes') {
  // _data = {'data': _data, 't_created': Date.now()};
  database.ref(_type).set(_data);
}

function onKeyDown(e) {
  if (e.keyCode == 32) {
    onOff = !onOff;
    if (onOff) {
      sendMessage('RED_LED', 1);
    } else {
      sendMessage('RED_LED', 0);
    }
  }
}

function change(e) {
  if (e.target.checked) {
    sendMessage('RED_LED', 1);
  } else {
    sendMessage('RED_LED', 0);
  }
}
