$(document).ready(function(){
	document.getElementById("search_button").onclick = function() {
		  var keyword = document.getElementById("search_text");
  		window.location.href = '/explore/search?keyword='+$(keyword).val();
      var insertText = document.getElementById("show_results");
      $(insertText).append($(keyword).val());
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