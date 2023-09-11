import WebMap from '../map/map.js'

/**
 * Sub class for rendering web maps with the Leaflet MapBox GL JS plugin.
 */
class WebMapBox extends WebMap {
  /**
   * WebMapBox constructor parameters
   * @typedef {Object} config
   * @param {String} config.styleUrl - MapBox (basemap) stylae URL.
   * @param {String} config.accessToken - MapBox access token. This parameter is optional if MAPBOX_ACCESS_TOKEN env variable is defined.
   * @param {String} config.maxZoom - Maximum map zoom (0 - 24).
   */
  constructor (config) {
    super(config)

    const {
      styleUrl,
      accessToken,
      maxZoom
    } = config

    const M_BASEMAP_STYLE = styleUrl ?? process.env.MAPBOX_STYLE_URL
    const M_ACCESS_TOKEN = accessToken ?? process.env.MAPBOX_ACCESS_TOKEN

    /* eslint-disable no-undef */
    L.mapboxGL({
      style: M_BASEMAP_STYLE, // Mapbox satellite style URL
      accessToken: M_ACCESS_TOKEN, // Replace with your Mapbox access token,
      maxZoom: maxZoom ?? 24
    }).addTo(this.map)
  }
}

export default WebMapBox
