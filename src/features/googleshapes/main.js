import GoogleShape from './shape'
window.mymap = null

/**
 * Draw Circles and Polygons in a Google Map using the Google Maps API.
 */
const main = () => {
  const googlemap = new GoogleShape({
    mapId: 'gmap',
    allowModes: [
      GoogleShape.DRAWING_MODES.CIRCLE,
      GoogleShape.DRAWING_MODES.RECTANGLE,
      GoogleShape.DRAWING_MODES.POLYGON
    ]
  })

  return googlemap
}

export default main
