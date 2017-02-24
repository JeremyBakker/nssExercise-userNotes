"use strict";

var app = angular.module("userNotesApp", ["ngRoute"]);

let isAuth = (AuthFactory) => new Promise ( (resolve, reject) => {
  // console.log("running isAuth");
    AuthFactory.isAuthenticated()
    .then ( (userExists) => {
    console.log("userExists", userExists);
        if (userExists){
      console.log("Authenticated, go ahead.");
            resolve();
        }else {
      console.log("Authentication rejected, go away.");
            reject();
        }
    });
});

app.config(function($routeProvider){
    $routeProvider.
    when('/', {
        templateUrl: 'partials/partial.login.html',
        controller: "loginCtrl"
    }).
    when('/register', {
    	templateUrl: 'partials/partial.register.html',
    	controller: "registerCtrl"
    }).
    when('/newNote',{
        templateUrl: 'partials/partial.newNote.html',
        controller: "newNoteCtrl"
    }).
    when('/noteList',{
        templateUrl: 'partials/partial.noteList.html',
        controller: "noteListCtrl"
    });
});

app.run(($location, firebaseCredentials) => {
    let credentials = firebaseCredentials;
    let authConfig = {
        apiKey: credentials.apiKey,
        authDomain: credentials.authDomain
    };
    firebase.initializeApp(authConfig);
});

