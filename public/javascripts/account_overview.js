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
        var num = parseInt(currentBtnId.match(/(\d+)$/)[0], 10);
        var momentId = "myMoment"+num;
        $("#confirmDeleteBtn").click(function(){
          $("#"+momentId).remove();
        });
    });
});

// Re-edit Moment Modal
$(document).ready(function(){
    $("a[id^='editBtn']").click(function(){
        var currentBtnId = $(this).attr('id');
        var num = parseInt(currentBtnId.match(/(\d+)$/)[0], 10);
        var momentTextId = "myMomentText"+num;
        var text = document.getElementById(momentTextId);
        if (!($(text).is(':disabled'))) {
          $(this).find('i').toggleClass('glyphicon-ok').toggleClass('glyphicon-edit');
          $(text).prop('disabled', true);
          $(text).blur();
        } else {
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
            numOfLike -= 1;
            $(like).text(numOfLike+" Likes");
        }
        else{
            $(this).find('i').toggleClass('post-unlike').toggleClass('post-heart');
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

