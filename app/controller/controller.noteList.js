"use strict";

app.controller('noteListCtrl', function(NoteFactory, AuthFactory, $scope){
	
	let user = AuthFactory.getUser();

	NoteFactory.getNotes(user).then(function(notes){
		$scope.notes = notes;
		console.log(notes);
	});

});