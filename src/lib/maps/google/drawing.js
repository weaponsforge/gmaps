import GoogleMap from './basic'

/**
 * Sub class for rendering a Google Map with drawing tools using the Google Maps API.
 * This web map uses the Google Maps API to draw Circle and Polygon drawing tools.
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
   * @typedef {Object} params.circleOptions - Circle shape drawing options.
   * @param {String} circleOptions.fillColor - Cicle color
   * @param {Number} circleOptions.fillOpacity (Float)
   * @param {Number} circleOptions.strokeWeight Circle edge stroke
   * @param {Bool} circleOptions.clickable - Circle listens for click events
   * @param {Bool} circleOptions.editable - Editable Circle
   * @param {Number} circleOptions.zIndex - zIndex positioning
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
  }
}

export default GoogleMapDraw
