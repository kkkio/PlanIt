$(document).on('ready', function(){
    $('#input-1-xs').rating({displayOnly: true, step: 0.5});
});



ratingApp.controller("colourController", [ "$scope", function($scope) {
    $scope.rating = 1;
    $scope.options = {
    	values 			: [ 1, 2, 3 ],
        cssBaseSelected     	: "fa-thumbs-up",
        cssBaseUnselected   	: "fa-thumbs-o-up",
        cssValuesSelected 	: [
            "first-selected",
            "second-selected",
            "third-selected",],
        cssValuesUnselected	: [
            "first-unselected",
            "second-unselected",
            "thirs-unselected",],
        cssHover		: "rating-star-hover-blue"
    };
}]);


// submit comment
$(document).ready(function(){
    $("a[id^='editBtn']").click(function(){
        var currentBtnId = $(this).attr('id');
        var num = parseInt(currentBtnId.match(/(\d+)$/)[0], 10);
        var to_be_posted = $(this).attr('name'); //momentId
        var oldTitleId = "myMomentTitle" + num;
        var oldTextId = "myMomentText" + num;
        var oldTitle = document.getElementById(oldTitleId);
        var oldText = document.getElementById(oldTextId);
        var newTitle = document.getElementById("tmpMomentTitle");
        var newText = document.getElementById("tmpMomentText");
        // Keep original title and text
        $(newTitle).val(($(oldTitle).text()));
        $(newText).val(($(oldText).val()));
        // Update
        $("#confirmUpdateBtn").click(function(){
          $('#tmpMomentId2').attr('value', to_be_posted);
          $('#updateTitle').attr('value', $(newTitle).val());
          $('#updateText').attr('value', $(newText).val());
          $('#updateMomentForm').submit();
        });        

    });
});
