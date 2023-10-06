import { GoogleMap } from '../../lib/maps/google'
import { LeafletGoogleMap } from '../../lib/maps/leaflet'

const app = () => {
  /* eslint-disable no-unused-vars */
  const centerCity = {
    lat: 47.6061389,
    lng: -122.3328481
  }

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
  const mapLeaflet = new LeafletGoogleMap({
    mapId: 'googlemap-leaflet',
    lat: center.lat,
    lng: center.lng
  })

  // Buttons
  const buttonBasic = document.getElementById('screenshot-basic')
  const buttonBasicCanvas = document.getElementById('screenshot-basic-canvas')
  const buttonLeaflet = document.getElementById('screenshot-leaflet')

  buttonBasic.addEventListener('click', (e) => {
    console.log(map)
    map.screenshot()
  })

  buttonBasicCanvas.addEventListener('click', (e) => {
    console.log(map)
    map.screenshot()
  })

  buttonLeaflet.addEventListener('click', (e) => {
    console.log(map)
    mapLeaflet.screenshot()
  })

  return {
    gmap: map,
    map: mapLeaflet
  }
}

export default app