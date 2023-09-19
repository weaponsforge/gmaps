import {
  GoogleMapDraw
} from '../../lib/maps/google'

window.mymap = null

/**
 * Draw Circles and Polygons in a Google Map using the Google Map API.
 */
const main = () => {
  const googlemap = new GoogleMapDraw({
    mapId: 'gmap',
    allowModes: [
      GoogleMapDraw.DRAWING_MODES.CIRCLE,
      GoogleMapDraw.DRAWING_MODES.RECTANGLE,
      GoogleMapDraw.DRAWING_MODES.POLYGON
    ]
  })

  return googlemap
}

export default main
