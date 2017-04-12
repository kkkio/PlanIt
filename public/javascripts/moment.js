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

// Load more
$(document).ready(function () {
    var moment_collection = document.getElementsByClassName("post");
    var moment_num = moment_collection.length;
    for(var i=0; i<3; i++){
        $("#frdMoment"+i).show();
    }
    for(var i=3;i<moment_num;i++){
        $("#frdMoment"+i).hide();
    }
    $("#loadMore").on('click', function (e) {
        e.preventDefault();
        $(".post:hidden").slice(0, 3).slideDown();
        if ($(".post:hidden").length == 0) {
            $("#load").fadeOut('slow');
        }
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 1500);
    });

});

// Load more
$(document).ready(function () {
    var moment_collection = document.getElementsByClassName("post");
    var moment_num = moment_collection.length;
    for(var i=0; i<6; i++){
        $("#othersMoment"+i).show();
    }
    for(var i=6;i<moment_num;i++){
        $("#othersMoment"+i).hide();
    }
    $("#loadMore").on('click', function (e) {
        e.preventDefault();
        $(".post:hidden").slice(0, 6).slideDown();
        if ($(".post:hidden").length == 0) {
            $("#load").fadeOut('slow');
        }
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 1500);
    });

});