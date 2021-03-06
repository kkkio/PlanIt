// Menu toggle script
$(document).ready(function(){
	$("#menu-toggle").click( function (e){
   		e.preventDefault();
   		$("#wrapper").toggleClass("menuDisplayed");
	});
});

// Back to top
$(document).ready(function(){
   $(window).scroll(function () {
   		if ($(this).scrollTop() > 50) {
        	$('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });
    // scroll body to 0px on click
    $('#back-to-top').click(function () {
        $('#back-to-top').tooltip('hide');
        $('body,html').animate({
        	scrollTop: 0
        }, 800);
     	return false;
    });
        
    $('#back-to-top').tooltip('show');

});

$(document).ready(function(){
    $("#sendFeedback").click(function(event){
        var feedback = $("textarea#feedbackText").val();
        if(!feedback){
            event.preventDefault();
            alert("Please describe your issue or share your idea :)");
        }
        else{
            alert("We have received your feedback successfully :)");
            $('#feedbackModal').modal('hide');
        }
    });        
});


