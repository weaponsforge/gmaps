import Webmap from '../map/map'
import GoogleMap from './basic'

/**
 * Sub class for rendering a Google Map insidea a Leaflet web map using the LeafletJS GoogleMutant plugin.
 * Requires a properly-configured Google Maps API script via CDN or npm install.
 */
class GoogleMapLeaflet extends Webmap {
  constructor (config) {
    super(config)

    /* eslint-disable no-undef */
    L.gridLayer.googleMutant({
      type: GoogleMap.GOOGLE_MAP_TYPES.SATELLITE
    }).addTo(this.map)
  }
}

export default GoogleMapLeaflet
