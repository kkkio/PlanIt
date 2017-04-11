
	var newID=1;//whenever create a new event, newID increase by 1
	$(document).ready(function() {
    $('input').hide();
    $('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			defaultDate: '2017-04-13',
			navLinks: true, // can click day/week names to navigate views
			selectable: true,
			selectHelper: true,
			select: function(start, end) {
				var title = prompt('Event Title:');
				var eventData;
				if (title) {
					eventData = {
						title: title,
						start: start,
						end: end,
						id: newID
					};
					newID++;
					$('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
				}
				$('#calendar').fullCalendar('unselect');
			},
			eventClick: function(event, element) {

					var update=confirm("Modify this event?");
					if(update==true){
						var title=prompt("Please enter the title");
						event.title=title;
						var starting=prompt("Please enter its start time");
						event.start=starting;
						var ending=prompt("Please enter its end time");
						event.end=ending;
					}
					else{
						var deleteE=confirm("Do you want to delete this event?");
						if(deleteE==1){
							$('#calendar').fullCalendar('removeEvents',event.id);
						}

					}


	        $('#calendar').fullCalendar('updateEvent', event);

	    },

			editable: true,
			eventLimit: true, // allow "more" link when too many events

      var eventArr=document.getElementsByTagName("input");
      var evenNum=eventArr.length;
      for (var i=0; i < evenNum; i++) {
			     events.push({})
      }
		});

	});
