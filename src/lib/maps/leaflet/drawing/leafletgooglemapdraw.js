import LeafletGoogleMap from '../googlemap'
import { leafletDrawOptions } from './constants.js'

/**
 * Sub class for rendering a Google Map inside a Leaflet web map using the LeafletJS GoogleMutant plugin.
 * This web map have Leaflet.Draw Circle and Polygon drawing tools and screen capture.
 * Requires a properly-configured Google Maps API script via CDN or npm install.
 */
class LeafletGoogleMapDraw extends LeafletGoogleMap {
  editableLayers = null
  drawControl = null
  showCenter = false

  static SHAPE_TYPES = {
    CIRCLE: 'circle',
    POLYGON: 'polygon'
  }

  /**
   * LeafletGoogleMapDraw constructor parameters.
   * All constructor parameters to the LeafletMapBox class also apply.
   * @typedef {Object} config
   * @param {String} config.styleUrl - MapBox (basemap) style URL.
   * @param {String} config.accessToken - MapBox access token. This parameter is optional if MAPBOX_ACCESS_TOKEN env variable is defined.
   * @param {String} config.maxZoom - Maximum map zoom (0 - 24).
   * @param {Bool} config.showCenter - Flag to draw a Marker in the drawn shape's center. Defaults to "false".
   * @param {Function} config.callbackcircle - (Optional) Callback method after drawing a Circle.
   * @param {Function} config.callbackpolygon - (Optional) Callback method after drawing a Polygon.
   */
  constructor (config) {
    super(config)

    /* eslint-disable no-undef */
    // Create an editable layer
    this.editableLayers = new L.FeatureGroup()
    this.map.addLayer(this.editableLayers)
    this.showCenter = config?.showCenter ?? false

    // Create a draw control
    this.initControl()

    this.bindMapEvents({
      cbCircle: config?.callbackcircle ?? undefined,
      cbPolygon: config?.callbackpolygon ?? undefined
    })
  }

  /**
   * Initialises the Leaflet.Draw plugin drawing controls on the map.
   */
  initControl () {
    // Create a draw control
    this.drawControl = new L.Control.Draw(leafletDrawOptions)
    this.map.addControl(this.drawControl, {
      center: {
        lat: process.env.MAP_LAT,
        lng: process.env.MAP_LON
      }
    })
  }

  /**
   * Binds events to the web map.
   * @typedef {Object} params
   * @param {Function} params.cbCircle - Callback function on draw of a Circle object.
   * @param {Function} params.cbPolygon - Callback function on draw of a Polygon object.
   */
  bindMapEvents (callback) {
    const that = this

    this.map.on(L.Draw.Event.CREATED, async function (e) {
      const { layer, layerType: type } = e

      if (type === LeafletGoogleMapDraw.SHAPE_TYPES.CIRCLE) {
        console.log('is circle')

        // Circle radius
        const radius = layer.getRadius()

        // Circle center
        const center = [
          layer.getLatLng()?.lng ?? 0,
          layer.getLatLng()?.lat ?? 0
        ]

        that.editableLayers.addLayer(layer)

        if (callback.cbCircle !== undefined) {
          callback.cbCircle({
            location: layer.getLatLng(),
            radius
          })
        }

        console.log(`radius: ${radius}`)
        console.log(`center: ${center}`)

        // Display a Point marker in the center radius
        if (that.showCenter) {
          that.createMarker(layer.getLatLng()).addTo(that.map)
        }

        /* TURFJS OPTIONS
        const turfOptions = { steps: 64, units: 'meters' }
        const turfCircle = turf.circle(center, radius, turfOptions)
        const turfCircleArea = new L.GeoJSON(turfCircle, {
          color: 'red'
        }).addTo(that.map)
        */
      } else if (type === LeafletGoogleMapDraw.SHAPE_TYPES.POLYGON) {
        console.log('is polygon')

        if (callback.cbPolygon !== undefined) {
          callback.cbPolygon(layer)
        }
      }
    })
  }
}

export default LeafletGoogleMapDraw
