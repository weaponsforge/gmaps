import GoogleMap from '../google/basic'
import LeafletMap from './basic/basic'

/**
 * Sub class for rendering a Google Map inside a Leaflet web map using the LeafletJS GoogleMutant plugin.
 * Requires a properly-configured Google Maps API script via CDN or npm install.
 */
class LeafletGoogleMap extends LeafletMap {
  /**
   * LeafletGoogleMap constructor parameters.
   * Initializes and renders a Google Map using LeafletJS with drawing controls.
   * @typedef {Object} config
   * @param {String} config.mapId - HTML DOM id where to render the map.
   * @param {String} config.lat - Latitude.
   * @param {String} config.lng - Longitude.
   * @param {String} config.zoom - LeafletJS default map zoom.
   */
  constructor (config) {
    super(config)

    /* eslint-disable no-undef */
    // Render a Google Map base map
    L.gridLayer.googleMutant({
      type: GoogleMap.GOOGLE_MAP_TYPES.SATELLITE
    }).addTo(this.map)
  }

  /**
   * Takes a screenshot of the current map area in view.
   * Uses the html2canvas library to capture screenshot in a canvas.
   */
  screenshot () {
    super.screenshot(this.mapId)
  }
}

export default LeafletGoogleMap
