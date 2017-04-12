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




// Birthday Option Insertion
$(document).ready(function(){
    
    // Year
    var min = 1950, max = 2017, select = document.getElementById("edit-year");

    for (var i = max; i>=min; i--){
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = i;
        select.appendChild(opt);
    }


    // Month
    var min = 1, max = 12, select = document.getElementById("edit-month");

    for (var i = min; i<=max; i++){
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = i;
        select.appendChild(opt);
    } 
    
    // Day
    var min = 1, max = 31, select = document.getElementById("edit-day");

    for (var i = min; i<=max; i++){
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = i;
        select.appendChild(opt);
    }

});

// Upload photos for new moments
$(document).ready(function() {
  $.uploadPreview({
    input_field: "#image-upload",   // Default: .image-upload
    preview_box: "#image-preview",  // Default: .image-preview
    label_field: "#image-label",    // Default: .image-label
    label_default: "Choose File",   // Default: Choose File
    label_selected: "Change",  // Default: Change File
    no_label: false                 // Default: false
  });
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
