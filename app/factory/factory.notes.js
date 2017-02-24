"use strict";

app.factory('NoteFactory', function($q, $http, firebaseCredentials){

	let postNewNote = (newNote) => {
        console.log("post new note");
        return $q((resolve, reject) => {
            $http.post(`${firebaseCredentials.databaseURL}/notes.json`,
                JSON.stringify(newNote))
                .then((ObjectFromFirebase) => {
                    resolve(ObjectFromFirebase);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    let getNotes = (user) => {
        let notes = [];
        return $q((resolve, reject)=>{
            $http.get(`${firebaseCredentials.databaseURL}/notes.json?orderBy="uid"&equalTo="${user}"`)
            .then((noteObject)=>{
                let noteCollection = noteObject.data;
                Object.keys(noteCollection).forEach((key)=> {
                    noteCollection[key].id = key;
                    notes.push(noteCollection[key]);
                });
                resolve(notes);
            })
            .catch((error)=>{
                reject(error);
            });
        });
    };

    return {postNewNote, getNotes};
});