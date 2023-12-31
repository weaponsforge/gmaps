import LeafletMap from './basic/basic'

/**
 * Sub class for rendering Leaflet web maps with Leaflet.TileLayer.
 */
class LeafletWebMap extends LeafletMap {
  /**
   * LeafletWebMap constructor parameters
   * @typedef {Object} config
   * @param {String} config.baseMapUrl - Basemap URL.
   * @param {String} config.baseMapAttrib - Basemap attribution text.
   * @param {String} config.maxZoom - Maximum map zoom.
   */
  constructor (config) {
    super(config)

    const {
      baseMapUrl,
      baseMapAttrib,
      maxZoom
    } = config

    const M_BASEMAP = baseMapUrl ?? process.env.MAP_BASEMAP_URL
    const M_BASEMAP_ATTRIB = baseMapAttrib ?? process.env.MAP_BASEMAP_ATTRIB

    /* eslint-disable no-undef */
    L.tileLayer(M_BASEMAP, {
      maxZoom: maxZoom ?? 21,
      attribution: M_BASEMAP_ATTRIB
    }).addTo(this.map)
  }
}

export default LeafletWebMap
