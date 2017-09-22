function markerImageFromURL(url) {
  return new google.maps.MarkerImage(url,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34))
}

function initMap() {

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: {lat: 32.8873915, lng: -117.2453427}
  })
  
  var coloredPins = {
    b: markerImageFromURL('img/blue-pin.png'),
    g: markerImageFromURL('img/gray-pin.png'),
    r: markerImageFromURL('img/red-pin.png'),
    y: markerImageFromURL('img/yellow-pin.png')
  }

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
        position: location,
        icon: coloredPins[location.cl]
      })
      var iw =  new google.maps.InfoWindow({
        content: `<b>${ location.lb }</b><br>${ location.lx } lux <br> ${ location.tm }`
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
        maxZoom: 17,
        imagePath: 'img/m'
      }
    )
  }
}
