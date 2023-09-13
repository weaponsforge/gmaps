/**
 * Base class for rendering web maps using the Google Maps API (directly).
 * Requires a properly-configured Google Maps API script via CDN or npm install.
 */
class GoogleMap {
  gmap
  mapId
  mapType

  static GOOGLE_MAP_TYPES = {
    SATELLITE: 'satellite',
    ROADMAP: 'roadmap',
    TERRAIN: 'terrain',
    HYBRID: 'hybrid'
  }

  /**
   * GoogleMap constructor parameters.
   * @typedef {Object} config
   * @param {String} config.mapId - HTML DOM id where to render the Google map.
   * @param {String} [config.mapType] - Google Map base map type/style. Defaults to "satellite".
   * @param {String} [config.lat] - (Optional) Latitude. Defaults to MAP_LAT.
   * @param {String} [config.lng] - (Optional) Longitude. Defaults to MAP_LON.
   * @param {Number} [config.zoom] - (Optional) Map zoom. Defaults to MAP_ZOOM_INIT.
   * @param {Number} [config.tilt] - (Optional) Map tilt. Defaults 0 (disabled).
   */
  constructor (config) {
    const {
      mapId,
      mapType,
      lat,
      lng,
      zoom,
      tilt = 0
    } = config

    if (!mapId) {
      throw new Error('Missing required parameters')
    }

    const mLat = lat ?? process.env.MAP_LAT
    const mLng = lng ?? process.env.MAP_LON
    const mZoom = zoom ?? process.env.MAP_ZOOM_INIT

    this.mapType = mapType ?? GoogleMap.GOOGLE_MAP_TYPES.SATELLITE
    this.mapId = mapId

    /* eslint-disable no-undef */
    // Set a center point
    const point = new google.maps.LatLng(mLat, mLng)

    // Initialize a google map
    this.gmap = new google.maps.Map(document.getElementById(mapId), {
      center: point,
      mapTypeId: this.mapType,
      tilt,
      zoom: parseInt(mZoom)
    })
  }
}

export default GoogleMap
