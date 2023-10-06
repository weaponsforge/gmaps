import { MapUtils } from '../../common'

/**
 * Base class for managing LeafletJS web maps.
 */
class LeafletMap extends MapUtils {
  map
  mapId
  config

  /**
   * LeafletMap constructor parameters
   * @typedef {Object} config
   * @param {String} config.mapId - HTML DOM id where to render the map.
   * @param {String} config.lat - Latitude.
   * @param {String} config.lng - Longitude.
   * @param {String} config.zoom - LeafletJS default map zoom.
   */
  constructor (config) {
    super()

    const {
      mapId,
      lat,
      lng,
      zoom
    } = config

    if (!mapId) {
      throw new Error('Missing required parameters')
    }

    const mLat = lat ?? process.env.MAP_LAT
    const mLng = lng ?? process.env.MAP_LON
    const mZoom = zoom ?? process.env.MAP_ZOOM_INIT

    /* eslint-disable no-undef */
    this.map = L.map(mapId).setView([mLat, mLng], mZoom)
    this.config = config
    this.mapId = mapId
  }

  /**
   * Returns a LeafletJS Marker for map placement.
   * @param {Object} location - Object containing the latitude and longitude in { lat, lng }
   * @returns
   */
  createMarker (location) {
    /* eslint-disable new-cap */
    return new L.marker(location)
  }
}

export default LeafletMap
