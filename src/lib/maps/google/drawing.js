import GoogleMap from './basic'

/**
 * Sub class for rendering a Google Map using the Google Maps API.
 * This web map uses the Google Maps API to draw Circle and Polygon drawing tools.
 * Requires a properly-configured Google Maps API script via CDN or npm install.
 */
class GoogleMapDraw extends GoogleMap {
  constructor (params) {
    super(params)
    console.log('initialized')
  }
}

export default GoogleMapDraw
