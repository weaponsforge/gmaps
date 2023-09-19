import { GoogleMapDraw } from '../../lib/maps/google'

/**
 * Subclass that renders a Google Map with drawing tools using the Google Maps APIs.
 * This class have drawing event callbacks for Circles, Rectangles and Polygons.
 */
class GoogleShape extends GoogleMapDraw {
  constructor (params) {
    super(params)

    this.onCircleDraw = this.onCircleDraw.bind(this)

    this.bindDrawEvents({
      cbCircle: this.onCircleDraw
    })
  }

  onCircleDraw ({ radius, center }) {
    console.log('circle ok!', radius)
    console.log(this.gmap)

    /* eslint-disable no-undef */
    return new google.maps.Marker({
      position: center,
      map: this.gmap,
      title: 'Hello, world!'
    })
  }
}

export default GoogleShape
