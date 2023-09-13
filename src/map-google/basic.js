import axios from 'axios'
import { screenshotCanvas } from './utils'

/**
 * Base class for rendering web maps using the Google Maps API (directly).
 * Requires a properly-configured Google Maps API script via CDN or npm install.
 */
class GoogleMap {
  gmap
  mapId
  mapType
  key

  static GOOGLE_MAP_TYPES = {
    SATELLITE: 'satellite',
    ROADMAP: 'roadmap',
    TERRAIN: 'terrain',
    HYBRID: 'hybrid'
  }

  static GOOGLE_MAP_CONTROLS = {
    ZOOM: 'zoomControl',
    MAPTYPE: 'mapType',
    SCALE: 'scaleControl',
    STREETVIEW: 'streetViewControl',
    ROTATE: 'rotateControl',
    FULLSCREEN: 'fullscreenControl'
  }

  /**
   * GoogleMap constructor parameters.
   * Initializes and renders a Google Map on screen.
   * @typedef {Object} config
   * @param {String} config.mapId - HTML DOM id where to render the Google map.
   * @param {String} [config.mapType] - Google Map base map type/style. Defaults to "satellite".
   * @param {String} [config.lat] - (Optional) Latitude. Defaults to MAP_LAT.
   * @param {String} [config.lng] - (Optional) Longitude. Defaults to MAP_LON.
   * @param {Number} [config.zoom] - (Optional) Map zoom. Defaults to MAP_ZOOM_INIT.
   * @param {Number} [config.tilt] - (Optional) Map tilt. Defaults 0 (disabled).
   * @param {String[]} config.allowUI
   *    - If undefined (default), render all the default Google Map controls.
   *    - Populate this with Google Map controls "GOOGLE_MAP_CONTROLS" that should render on screen, if you don't want to render everything:
   *      ['zoomControl', 'mapTypeControl', 'scaleControl', 'streetViewControl', 'rotateControl', 'fullscreenControl']
   */
  constructor (config) {
    const {
      mapId,
      mapType,
      lat,
      lng,
      zoom,
      tilt = 0,
      allowUI = []
    } = config

    if (!mapId) {
      throw new Error('Missing required parameters')
    }

    const mLat = lat ?? process.env.MAP_LAT
    const mLng = lng ?? process.env.MAP_LON
    const mZoom = zoom ?? process.env.MAP_ZOOM_INIT

    this.mapType = mapType ?? GoogleMap.GOOGLE_MAP_TYPES.SATELLITE
    this.mapId = mapId
    this.key = process.env.GOOGLE_API_KEY

    /* eslint-disable no-undef */
    // Set a center point
    const point = new google.maps.LatLng(mLat, mLng)

    const mapConfig = {
      center: point,
      mapTypeId: this.mapType,
      tilt,
      zoom: parseInt(mZoom),
      disableDefaultUI: (allowUI.length >= 1)
    }

    // Display map controls
    allowUI.forEach(control => {
      mapConfig[control] = true
    })

    // Initialize a google map
    this.gmap = new google.maps.Map(document.getElementById(mapId), mapConfig)
  }

  /**
   * Takes a screenshot of the current map area in view.
   * Uses the Google Static Maps API.
   */
  async screenshot () {
    try {
      const staticMapURL = 'https://maps.googleapis.com/maps/api/staticmap'

      const center = this.gmap.getCenter()
      const imgSize = this.gmap.getDiv()

      // Image size. Max 640x640 pixels
      const size = `${imgSize.offsetWidth}x${imgSize.offsetHeight}`

      const response = await axios.get(staticMapURL, {
        responseType: 'blob',
        params: {
          center: `${center.lat()},${center.lng()}`,
          zoom: this.gmap.getZoom(),
          size,
          maptype: this.mapType,
          key: this.key
        }
      })

      this.downloadScreenshot(response)
    } catch (err) {
      console.log(`[ERROR]: ${err.message}`)
      throw new Error(err.message)
    }
  }

  /**
   * Downloads an image blob as PNG from the browser.
   * @param {Object} responseObject - Axios response data containing an image blob.
   */
  downloadScreenshot (responseObject) {
    try {
      const fileUrl = window.URL.createObjectURL(new Blob([responseObject.data]))
      const link = document.createElement('a')

      link.href = fileUrl
      link.setAttribute('download', 'file.png')
      document.body.appendChild(link)

      link.click()
      document.body.removeChild(link)
    } catch (err) {
      throw new Error(err.message)
    }
  }

  screenshotCanvas () {
    screenshotCanvas(this.mapId)
  }
}

export default GoogleMap
