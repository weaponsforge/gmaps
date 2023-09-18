import { WebMapBox } from '../../lib/maps/mapbox'
import {
  GoogleMap,
  GoogleMapLeaflet
} from '../../lib/maps/google'

const main = () => {
  const map = new WebMapBox({
    mapId: 'map_mapbox'
  })

  const gmap2d = new GoogleMapLeaflet({
    mapId: 'map_google_2d'
  })

  const gmap3d = new GoogleMap({
    mapId: 'map_google_3d'
  })

  return {
    map,
    gmap2d,
    gmap3d
  }
}

export default main
