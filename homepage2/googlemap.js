
function myMap() {
	var mapProp= {
    	center:new google.maps.LatLng(22.18,114.11),
    	zoom:5,
	};
	var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
	var activityLatLng = {lat: 22.18, lng: 114.11};

	var marker = new google.maps.Marker({
          position: activityLatLng,
          map: map,
          title: 'Activity Name'
        });
}
