// Menu toggle script
$(document).ready(function(){
	$("#menu-toggle").click( function (e){
   		e.preventDefault();
   		$("#wrapper").toggleClass("menuDisplayed");
	});
});

// Count animation
$(document).ready(function(){
	$('.acc-count').each(function () {
    	$(this).prop('Counter',0).animate({
        	Counter: $(this).text()
    	}, {
        	duration: 500,
        	easing: 'swing',
        	step: function (now) {
        	$(this).text(Math.ceil(now));
        	}
    	});
	});
});

// Hide and Store moment id list
$(document).ready(function() {
    $("#hiddenMomentId").hide();
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


// Delete Moment Modal
$(document).ready(function(){
    $("a[id^='deleteBtn']").click(function(){
        var currentBtnId = $(this).attr('id');
        var to_be_posted = $(this).attr('name');
        var num = parseInt(currentBtnId.match(/(\d+)$/)[0], 10);
        var momentId = "myMoment"+num;
        $("#confirmDeleteBtn").click(function(){
          $("#"+momentId).remove();
          $('#tmpMomentId').attr('value', to_be_posted);
					$('#deleteMomentForm').submit();
        });
    });
});

// Re-edit Moment Modal
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

// Like Moment
$(document).ready(function(){
    $("a[id^='likeBtn']").click(function(){
        var currentBtnId = $(this).attr('id');
        var num = parseInt(currentBtnId.match(/(\d+)$/)[0], 10);
        var momentLikeId = "myMomentLike"+num;
        var like = document.getElementById(momentLikeId);
        var numOfLike = parseInt($(like).text());
        if(!($(this).find("i").hasClass("post-unlike"))){
            $(this).find('i').toggleClass('post-heart').toggleClass('post-unlike');
            $(this).css('color', 'DarkGrey');
            numOfLike -= 1;
            $(like).text(numOfLike+" Likes");
        }
        else{
            $(this).find('i').toggleClass('post-unlike').toggleClass('post-heart');
            $(this).css('color', 'LightCoral');
            numOfLike += 1;
            $(like).text(numOfLike+" Likes");
        }
    });
});

// Comment on Moment
$(document).ready(function(){
    $("a[id^='commentBtn']").click(function(){
        var currentBtnId = $(this).attr('id');
        var num = parseInt(currentBtnId.match(/(\d+)$/)[0], 10);
        var momentCommentId = "myMomentComment"+num;
        var newId = "myNewComment"+num;
        var newComment = "myMomentCommentInput"+num;
        var comment = document.getElementById(momentCommentId);
        var numOfComment = parseInt($(comment).text());
        numOfComment += 1;
        $(comment).text(numOfComment+" Comments");
        $("#"+newId).text($("#"+newComment).val());
    });

    $("input[id^='myMomentCommentInput']").keypress(function(e) {
        if(e.which == 13) {
          e.preventDefault();
        }
    });
});

// Load more
$(document).ready(function () {
    var moment_collection = document.getElementsByClassName("post");
    var moment_num = moment_collection.length;
    for(var i=0; i<3; i++){
        $("#myMoment"+i).show();
    }
    for(var i=3;i<moment_num;i++){
        $("#myMoment"+i).hide();
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

// Avoid invalid input

