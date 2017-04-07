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