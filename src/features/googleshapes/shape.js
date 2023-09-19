import { GoogleMapDraw } from '../../lib/maps/google'
import { fetchNearbyPlaces } from '../../lib/services'

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

  async onCircleDraw ({ radius, center }) {
    console.log('circle ok!', radius)
    console.log(this.gmap)

    const data = await fetchNearbyPlaces({
      location: center,
      radius,
      service: this.service
    })

    console.log(data)

    /* eslint-disable no-undef */
    data.forEach((address) => {
      return new google.maps.Marker({
        position: address.geometry.location,
        map: this.gmap,
        title: 'Hello, world!'
      })
    })

    /* eslint-disable no-undef */
    return new google.maps.Marker({
      position: center,
      map: this.gmap,
      title: 'Hello, world!'
    })
  }
}

export default GoogleShape
