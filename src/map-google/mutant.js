import Webmap from '../map/map'
import GoogleMap from './basic'
import { leafletDrawOptions } from '../map-draw/constants'

/**
 * Sub class for rendering a Google Map insidea a Leaflet web map using the LeafletJS GoogleMutant plugin.
 * This web map have Leaflet.Draw Circle and Polygon drawing tools.
 * Requires a properly-configured Google Maps API script via CDN or npm install.
 */
class GoogleMapLeaflet extends Webmap {
  editableLayers = null
  drawControl = null
  gmap

  static SHAPE_TYPES = {
    CIRCLE: 'circle',
    POLYGON: 'polygon'
  }

  /**
   * GoogleMapLeaflet constructor parameters.
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
    // Create an editable layer
    this.editableLayers = new L.FeatureGroup()
    this.map.addLayer(this.editableLayers)

    // Initialize leaflet drawing tools and events
    this.initControl()
    this.bindMapEvents()

    /* eslint-disable no-undef */
    // Render a Google Map base map
    L.gridLayer.googleMutant({
      type: GoogleMap.GOOGLE_MAP_TYPES.SATELLITE
    }).addTo(this.map)
  }

  /**
   * Initialises the Leaflet.Draw plugin drawing controls on the map.
   */
  initControl () {
    // Create a draw control
    this.drawControl = new L.Control.Draw(leafletDrawOptions)

    this.map.addControl(this.drawControl, {
      mapTypeId: 'satellite',
      center: {
        lat: process.env.MAP_LAT,
        lng: process.env.MAP_LON
      }
    })
  }

  /**
   * Binds events to the web map
   */
  bindMapEvents () {
    const that = this

    this.map.on(L.Draw.Event.CREATED, async function (e) {
      const { layer, layerType: type } = e

      if (type === GoogleMapLeaflet.SHAPE_TYPES.CIRCLE) {
        console.log('is circle')

        // Circle radius
        const radius = layer.getRadius()

        // Circle center
        const center = [
          layer.getLatLng()?.lng ?? 0,
          layer.getLatLng()?.lat ?? 0
        ]

        that.editableLayers.addLayer(layer)

        // Display a Point marker in the center radius
        that.createMarker(layer.getLatLng()).addTo(that.map)

        console.log(`radius: ${radius}`)
        console.log(`center: ${center}`)
      } else if (type === GoogleMapLeaflet.SHAPE_TYPES.POLYGON) {
        console.log('is polygon')
      }
    })
  }

  /**
   * Takes a screenshot of the current map area in view.
   * Uses the html2canvas library to capture screenshot in a canvas.
   */
  screenshot () {
    const mapContainer = document.getElementById(this.mapId)

    html2canvas(mapContainer, { useCORS: true }).then((canvas) => {
      console.log(canvas)
      canvas.toBlob((blob) => {
        const fileURL = URL.createObjectURL(blob)
        const link = document.createElement('a')

        link.href = fileURL
        link.setAttribute('download', 'file.png')
        document.body.appendChild(link)

        link.click()
        document.body.removeChild(link)
      })
    })
  }
}

export default GoogleMapLeaflet
