import { MapDraw } from '../../lib/maps/drawing'

import {
  GoogleMapLeaflet,
  GoogleMapDraw
} from '../../lib/maps/google'

const main = () => {
  const map = new MapDraw({
    mapId: 'map_mapbox'
  })

  const gmap2d = new GoogleMapLeaflet({
    mapId: 'map_google_2d'
  })

  const gmap3d = new GoogleMapDraw({
    mapId: 'map_google_3d',
    allowUI: [
      GoogleMapDraw.GOOGLE_MAP_CONTROLS.FULLSCREEN,
      GoogleMapDraw.GOOGLE_MAP_CONTROLS.ROTATE,
      GoogleMapDraw.GOOGLE_MAP_CONTROLS.ROTATE,
      GoogleMapDraw.GOOGLE_MAP_CONTROLS.ZOOM
    ]
  })

  // Address search
  const input = document.getElementById('searchbox')

  /* eslint-disable no-undef */
  const searchbox = new google.maps.places.SearchBox(input)

  searchbox.addListener('places_changed', () => {
    const places = searchbox.getPlaces()

    if (places.length === 0) {
      return
    }

    const place = places[0]
    const coords = [
      place.geometry.location.lat(),
      place.geometry.location.lng()
    ]

    const newZoom = 18

    // Set map view to coords
    gmap3d.gmap.setCenter(place.geometry.location)
    gmap3d.gmap.setZoom(newZoom)

    gmap2d.map.setView(coords)
    gmap2d.map.setZoom(newZoom)

    map.map.setView(coords)
    map.map.setZoom(newZoom)
  })

  return {
    map,
    gmap2d,
    gmap3d
  }
}

export default main
