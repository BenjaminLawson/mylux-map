function initMap() {

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: {lat: 32.8873915, lng: -117.2453427}
  })

  fetch('data.json').then(res => res.json())
    .then((data) => {
      console.log(data)
      initMarkers(data)
    }).catch(err => {
      console.log('could not fetch data.json: ', err)
    })

  function initMarkers(locations) {
    var markers = locations.map(function(location, i) {
      var marker = new google.maps.Marker({
        position: location
      })
      var iw =  new google.maps.InfoWindow({
        content: location.lux + ' lux <br>' + location.time
      })
      marker.addListener('click', function() {
        iw.open(map, marker)
      })
      return marker
    })

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(
      map,
      markers,
      {
        maxZoom: 7,
        imagePath: 'img/m'
      }
    )
  }
}
