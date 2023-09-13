import {
  GoogleMap,
  GoogleMapLeaflet
} from './map-google'

window.mymap = null

const start = () => {
  const center = {
    lat: 47.242384,
    lng: -122.463904
  }

  // Basic Google Map
  const map = new GoogleMap({
    mapId: 'googlemap-basic',
    lat: center.lat,
    lng: center.lng
    // allowUI: [GoogleMap.GOOGLE_MAP_CONTROLS.ROTATE]
  })

  // Google Map satellite basemap inside a LeafletJS web map
  const mapLeaflet = new GoogleMapLeaflet({
    mapId: 'googlemap-leaflet',
    lat: center.lat,
    lng: center.lng
  })

  // Buttons
  const buttonBasic = document.getElementById('screenshot-basic')

  buttonBasic.addEventListener('click', (e) => {
    console.log('click me')
    console.log(map)
    map.screenshot()
  })

  return mapLeaflet
}

const initMap = () => {}

window.gmap = start()

export default initMap
