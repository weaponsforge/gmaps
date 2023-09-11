import WebMapBox from '../map-mapbox/map-mapbox.js'

/**
 * Sub class for rendering "editable" web maps with the Leaflet MapBox GL JS plugin.
 */
class MapDraw extends WebMapBox {
  editableLayers
  drawControl

  /**
   * MapDraw constructor parameters
   * @typedef {Object} config
   * @param {String} config.styleUrl - MapBox (basemap) stylae URL.
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

    this.map.on(L.Draw.Event.CREATED, function (e) {
      /* eslint-disable no-unused-vars */
      const layer = e.layer
      const type = e.layerType

      console.log(e)
    })
  }

  initControl () {
    // Create a draw control
    const options = {
      position: 'topleft',
      collapsed: false,
      draw: {
        circle: {
          shapeOptions: {
            color: 'black'
          }
        },
        polyline: false,
        polygon: {
          allowIntersection: false,
          drawError: {
            color: '#e1e100',
            message: '<strong>Error:</strong> Polygon edges cannot cross!'
          },
          shapeOptions: {
            color: 'black'
          }
        },
        rectangle: false,
        marker: false,
        circlemarker: false
      }
    }

    this.drawControl = new L.Control.Draw(options)
    this.map.addControl(this.drawControl)
  }
}

export default MapDraw
