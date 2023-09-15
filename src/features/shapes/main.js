import { GoogleMapDraw } from '../../lib/maps/google'

/**
 * Draw Circles and Polygons in a Google Map using the Google Map API.
 */
const main = () => {
  const map = new GoogleMapDraw({
    mapId: 'gmap'
  })

  return map
}

export default main
