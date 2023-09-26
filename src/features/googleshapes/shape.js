import { GoogleMapDraw } from '../../lib/maps/google'
import {
  fetchNearbyPlaces,
  fetchPlaceDetails,
  buildUniqueAddresses
} from '../homeaddresses/lib/services'

/**
 * Subclass that renders a Google Map with drawing tools using the Google Maps APIs.
 * This class have drawing event callbacks for Circles, Rectangles and Polygons.
 */
class GoogleShape extends GoogleMapDraw {
  unique_addresses = []

  constructor (params) {
    super(params)

    this.onCircleDraw = this.onCircleDraw.bind(this)
    this.onPolygonDraw = this.onPolygonDraw.bind(this)

    this.bindDrawEvents({
      cbCircle: this.onCircleDraw,
      cbPolygon: this.onPolygonDraw
    })
  }

  async onCircleDraw ({ radius, center }) {
    // Fetch prelimimary data using the NearbyPlaces API
    const dataNearby = await fetchNearbyPlaces({
      location: center,
      radius,
      service: this.service
    })

    // Store unique home addresses (note: no country, state or zip code)
    this.unique_addresses = buildUniqueAddresses(dataNearby)
    console.log(this.unique_addresses)

    console.log('---NEARBY SEARCH RESPONSE')
    console.log(dataNearby)

    // Fetch place details (note: contains detailed place information)
    const details = await fetchPlaceDetails(dataNearby.map(x => x.place_id))
    console.log('---FULL PLACE DETAILS')
    console.log(details)

    /* eslint-disable no-undef */
    // Marker for each home address
    dataNearby.forEach((address) => {
      return new google.maps.Marker({
        position: address.geometry.location,
        map: this.gmap,
        title: 'Hello, world!'
      })
    })

    // Center marker
    return new google.maps.Marker({
      position: center,
      map: this.gmap,
      title: 'Hello, world!'
    })
  }

  onPolygonDraw (polygon) {
    console.log(polygon)
    console.log('---path', polygon.getPath())
    const area = google.maps.geometry.spherical.computeArea(polygon.getPath())
    const currentRoofArea = area * 10.7639

    console.log('--area', area, currentRoofArea)
  }
}

export default GoogleShape
