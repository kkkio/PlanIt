
$(document).ready(function(){
	document.getElementById("search_button").onclick = function() {
		  var keywordEle = document.getElementById("search_text");
  		window.location.href = '/explore/search?keyword='+$(keywordEle).val();
      var keyword = $(keywordEle).val();
      $(keyword).text()
	};

	$("input[id='search_text']").keypress(function(e) {
       if(e.which == 13) {
          e.preventDefault();
          var keyword = document.getElementById("search_text");
  		    window.location.href = '/explore/search?keyword='+$(keyword).val();
          var insertText = document.getElementById("show_results");
          $(insertText).append($(keyword).val());
       }
    });

});



// Load more
$(document).ready(function () {
    var activity_collection = document.getElementsByClassName("activity-list");
    var activity_num = activity_collection.length;
    for(var i=0; i<8; i++){
        $("#activityList"+i).show();
    }
    for(var i=8;i<activity_num;i++){
        $("#activityList"+i).hide();
    }
    $("#loadMore").on('click', function (e) {
        e.preventDefault();
        $(".activity-list:hidden").slice(0, 8).slideDown();
        if ($(".activity-list:hidden").length == 0) {
            $("#load").fadeOut('slow');
        }
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 1500);
    });

});