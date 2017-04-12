// Search
$(document).ready(function(){
  var keywordEle = document.getElementById("search_text");
  document.getElementById("search_button").onclick = function() {
      var keyword = $(keywordEle).val();
      window.location.href = '/explore/music?keyword='+keyword;
  };

  $("input[id='search_text']").keypress(function(e) {
       if(e.which == 13) {
          e.preventDefault();
          var keyword = $(keywordEle).val();
          window.location.href = '/explore/music?keyword='+$(keywordEle).val();
       }
    });

});

$(document).ready(function () {
  var toBeFilled = document.getElementById("search_text");
  var tmp = $(location).attr('search');
  var tmp_keyword = tmp.substring(9);
  var keyword = tmp_keyword.slice(0,-6);
  if(keyword){
    $(toBeFilled).val(keyword);
  }
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

//highlight
/*
$(function() {
  var $context = $(".context");
  var $form = $("form");
  var $button = $form.find("button[name='perform']");
  var $input = $form.find("input[name='keyword']");

  $button.on("click.perform", function() {

    // Determine search term
    var searchTerm = $input.val();

    // Determine options
    var options = {};
    var values = $form.serializeArray();
    // Because serializeArray() ignores unset checkboxes 
    values = values.concat(
      $form.find("input[type='checkbox']:not(:checked)").map(
        function() {
          return {
            "name": this.name,
            "value": "false"
          }
        }).get()
    );
    $.each(values, function(i, opt){
      var key = opt.name;
      var val = opt.value;
      if(key === "keyword" || !val){
        return;
      }
      if(val === "false"){
        val = false;
      } else if(val === "true"){
        val = true;
      }
      options[key] = val;
    });

    // Remove old highlights and highlight
    // new search term afterwards
    $context.unmark();
    $context.mark(searchTerm, options);

  });
  $button.trigger("click.perform");
});
*/
