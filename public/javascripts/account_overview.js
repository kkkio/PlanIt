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
        	duration: 1000,
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
        var momentTextId = "myMomentText"+num;
        var text_to_be_submitted = document.getElementById(momentTextId);
        alert($(text_to_be_submitted).val());
        var to_be_posted = $(this).attr('name');
        if (!($(text).is(':disabled'))) {
          alert("haha");
          $(this).find('strong').text('Re-edit');
          $(this).find('i').toggleClass('glyphicon-ok').toggleClass('glyphicon-edit');
          $(text).prop('disabled', true);
          $(text).blur();
          $('#tmpNewTextId').attr('value', to_be_posted);
          //alert($(text_to_be_submitted).val());
          $('#reeditMomentForm').submit();
        } else {
          $(this).find('strong').text('Confirm');
          $(this).find('i').toggleClass('glyphicon-edit').toggleClass('glyphicon-ok');         
          $(text).prop('disabled', false);
          $(text).focus();
        }
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
