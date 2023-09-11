/**
 * Base class for managing LeafletJS web maps.
 */
class Webmap {
  map

  /**
   * WebMap constructor parameters
   * @typedef {Object} config
   * @param {String} config.mapId - HTML DOM id where to render the map.
   * @param {String} config.lat - Latitude.
   * @param {String} config.lng - Longitude.
   * @param {String} config.zoom - LeafletJS default map zoom.
   */
  constructor (config) {
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
    this.map = L.map(mapId).setView([mLat, mLng], mZoom)
  }
}

export default Webmap
