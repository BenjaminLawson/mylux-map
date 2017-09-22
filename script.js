function markerImageFromURL (url) {
  return new google.maps.MarkerImage(url,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34))
}

function markerFromLocation (loc) {
  var coloredPins = {
    b: markerImageFromURL('img/blue-pin.png'),
    g: markerImageFromURL('img/gray-pin.png'),
    r: markerImageFromURL('img/red-pin.png'),
    y: markerImageFromURL('img/yellow-pin.png')
  }
  
  var marker = new google.maps.Marker({
    position: loc,
    icon: coloredPins[loc.cl]
  })
  var iw =  new google.maps.InfoWindow({
    content: `<b>${ loc.lb }</b><br>${ loc.lx } lux <br> ${ loc.tm }`
  })
  marker.addListener('click', function() {
    iw.open(map, marker)
  })

  return marker
}

function initMap() {

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: {lat: 32.8873915, lng: -117.2453427}
  })

  fetch('data.json').then(res => res.json())
    .then((data) => {
      initMarkers(data)
    }).catch(err => {
      console.log('could not fetch data.json: ', err)
    })

  // Add a marker clusterer to manage the markers.
  var markerCluster = new MarkerClusterer(
    map,
    [],
    {
      maxZoom: 17,
      imagePath: 'img/m'
    }
  )

  function initMarkers(locations) {
    var chunkSize = 250
    var index = 0
    processChunk()
    function processChunk() {
      for (var i = 0; i < chunkSize && index < locations.length; i++) {
        markerCluster.addMarker(markerFromLocation(locations[index]))
        index++
      }
      
      if (index < locations.length) {
        setTimeout(processChunk, 90)
      }
      else {
        console.log('Done processing data')
      }
    }
  }
}










