import WebMapBox from '../map-mapbox/map-mapbox.js'
import { leafletDrawOptions } from './constants.js'

/**
 * Sub class for rendering "editable" web maps with the Leaflet MapBox GL JS plugin.
 */
class MapDraw extends WebMapBox {
  editableLayers = null
  drawControl = null

  static SHAPE_TYPES = {
    CIRCLE: 'circle',
    POLYGON: 'polygon'
  }

  /**
   * MapDraw constructor parameters
   * @typedef {Object} config
   * @param {String} config.styleUrl - MapBox (basemap) style URL.
   * @param {String} config.accessToken - MapBox access token. This parameter is optional if MAPBOX_ACCESS_TOKEN env variable is defined.
   * @param {String} config.maxZoom - Maximum map zoom (0 - 24).
   */
  constructor (config) {
    super(config)

    /* eslint-disable no-undef */
    // Create an editable layer
    this.editableLayers = new L.FeatureGroup()
    this.map.addLayer(this.editableLayers)

    // Create a draw control
    this.initControl()
    this.bindMapEvents()
  }

  /**
   * Initialises the Leaflet.Draw plugin drawing controls on the map.
   */
  initControl () {
    // Create a draw control
    this.drawControl = new L.Control.Draw(leafletDrawOptions)
    this.map.addControl(this.drawControl)
  }

  /**
   * Binds events to the web map
   */
  bindMapEvents () {
    const that = this

    this.map.on(L.Draw.Event.CREATED, function (e) {
      const { layer, layerType: type } = e

      if (type === MapDraw.SHAPE_TYPES.CIRCLE) {
        console.log('is circle')

        // Circle radius
        const radius = layer.getRadius()

        // Circle center
        const center = [
          layer.getLatLng()?.lng ?? 0,
          layer.getLatLng()?.lat ?? 0
        ]

        that.editableLayers.addLayer(layer)

        console.log(`radius: ${radius}`)
        console.log(`center: ${center}`)
        console.log(that.editableLayers)

        /* TURFJS OPTIONS
        const turfOptions = { steps: 64, units: 'meters' }
        const turfCircle = turf.circle(center, radius, turfOptions)
        const turfCircleArea = new L.GeoJSON(turfCircle, {
          color: 'red'
        }).addTo(that.map)
        */
      } else if (type === MapDraw.SHAPE_TYPES.POLYGON) {
        console.log('is polygon')
      }
    })
  }
}

export default MapDraw
