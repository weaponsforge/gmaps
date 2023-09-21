import GoogleMap from './basic'

/**
 * Sub class for rendering a Google Map with drawing tools using the Google Maps API.
 * This web map uses the Google Maps API to draw Circle and Polygon drawing tools.
 * Accepts callbacks on drawing shapes.
 * Requires a properly-configured Google Maps API script via CDN or npm install.
 * https://developers.google.com/maps/documentation/javascript/examples/drawing-tools
 */
class GoogleMapDraw extends GoogleMap {
  tools

  /* eslint-disable no-undef */
  static DRAWING_MODES = {
    MARKER: google.maps.drawing.OverlayType.MARKER,
    CIRCLE: google.maps.drawing.OverlayType.CIRCLE,
    POLYGON: google.maps.drawing.OverlayType.POLYGON,
    POLYLINE: google.maps.drawing.OverlayType.POLYLINE,
    RECTANGLE: google.maps.drawing.OverlayType.RECTANGLE
  }

  /**
   * GoogleMapDraw constructor parameters.
   * Initializes and renders a Google Map with drawing controls using only the Google Maps API.
   * @typedef {Object} params
   * @param {Bool} params.draw - Toggle the drawing tools visibility.
   * @param {String[]} params.allowModes[] - List of drawing tools to show on the map. Renders all tools if undefined.
   * @param {Object} params.circleOptions - Circle shape drawing options.
   * - { fillColor, fillOpacity, strokeWeight, clickable, editable, zIndex }
   * @param {Function} params.callbackcircle
   */
  constructor (params) {
    super(params)

    const {
      draw,
      allowModes,
      circleOptions
    } = params

    this.tools = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.MARKER,
      drawingControl: draw ?? true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: (allowModes?.length > 0)
          ? [...allowModes]
          : [...Object.values(GoogleMapDraw.DRAWING_MODES)]
      },
      markerOptions: {
        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
      },
      circleOptions: circleOptions ??
        {
          fillColor: '#ffff00',
          fillOpacity: 0.4,
          strokeWeight: 5,
          clickable: false,
          editable: true,
          zIndex: 1
        }
    })

    this.tools.setMap(this.gmap)

    this.bindDrawEvents({
      cbCircle: params?.callbackcircle ?? undefined,
      cbPolygon: params?.callbackpolygon ?? undefined,
      cbRectangle: params?.callbackrectangle ?? undefined
    })
  }

  /**
   * Binds events to the drawing tools.
   * @typedef {Object} params
   * @param {Function} params.cbCircle - Callback function on draw of a Circle object. Passes { radius, center } in the callback.
   * @param {Function} params.cbPolygon - Callback function on draw of a Polygon object.
   * @param {Function} params.cbRectangle - Callback function on draw of a Rectangle object.
   */
  bindDrawEvents (callback) {
    google.maps.event.addListener(this.tools, 'overlaycomplete', (e) => {
      const { type, overlay } = e

      if (type === GoogleMapDraw.DRAWING_MODES.CIRCLE) {
        const radius = overlay.getRadius()
        const center = overlay.getCenter()

        if (callback.cbCircle !== undefined) {
          callback.cbCircle({ radius, center })
        }
      }

      if (type === GoogleMapDraw.DRAWING_MODES.POLYGON) {
        console.log('is polygon')

        // Calculate the center coordinates
        // Reference: https://stackoverflow.com/questions/3081021/how-to-get-the-center-of-a-polygon-in-google-maps-v3
        const coordinates = overlay.getPath().getArray()

        let x1 = 9999
        let y1 = 9999
        let x2 = -1
        let y2 = -1

        coordinates.forEach(coord => {
          console.log(coord.lat(), coord.lng())
          const x = coord.lat()
          const y = coord.lng()

          if (x < x1) {
            x1 = x
          }

          if (x > x2) {
            x2 = x
          }

          if (y < y1) {
            y1 = y
          }

          if (y > y2) {
            y2 = y
          }
        })

        // Attach the center coordinates
        overlay.center = {
          x: x1 + ((x2 - x1) / 2),
          y: y1 + ((y2 - y1) / 2)
        }

        // Attach the point coordinates
        overlay.vertices = coordinates

        if (callback.cbPolygon !== undefined) {
          callback.cbPolygon(overlay)
        }
      }

      if (type === GoogleMapDraw.DRAWING_MODES.RECTANGLE) {
        console.log('is rectangle')
      }

      if (type === GoogleMapDraw.DRAWING_MODES.MARKER) {
        console.log('is marker')
      }
    })
  }
}

export default GoogleMapDraw
