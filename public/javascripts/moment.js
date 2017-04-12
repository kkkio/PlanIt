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

// Avoid invalid input
$(document).ready(function(){
    $("#submitNewMoment").click(function(event){
        var image = $("input#image-upload").val();
        var title = $("input#newMomentTitle").val();
        var text = $("textarea#newMomentText").val();
        var location = $("input#newLocation").val();
        var privacy = $("select#newPricacy").val();
        if(!image){
            event.preventDefault();
            alert("Please upload an image :)");
        }
        else if(!title){
            event.preventDefault();
            alert("Please input a title :)");            
        }
        else if(!text){
            event.preventDefault();
            alert("Please input a text :)");            
        }   
        else if(!location){
            event.preventDefault();
            alert("Please input a location :)");            
        } 
        else if(!privacy){
            event.preventDefault();
            alert("Please select a privacy :)");            
        } 
        else{
            $('#newMomentForm').submit();
        }                     
    });
});