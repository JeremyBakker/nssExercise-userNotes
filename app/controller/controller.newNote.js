"use strict";

app.controller("newNoteCtrl", function($scope, AuthFactory, NoteFactory, $location){
	let user = AuthFactory.getUser();
	let date = Date();
	console.log(date);

	$scope.btnText = "Submit";
	
	$scope.newNote = {
		note: "",
		time: date,
		uid: user
	};
	
	$scope.addNewNote = function(){
       console.log("add new note");
       NoteFactory.postNewNote($scope.newNote)
       .then(function(response){
       		$location.url("noteList");
       });
       console.log("you added a new note", $scope.newNote);
       $scope.newNote = {};
    };
});