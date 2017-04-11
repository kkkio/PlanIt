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

