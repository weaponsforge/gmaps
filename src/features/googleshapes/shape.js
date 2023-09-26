import { GoogleMapDraw } from '../../lib/maps/google'
import {
  fetchNearbyPlaces,
  fetchPlaceDetails,
  buildUniqueAddresses
} from '../homeaddresses/lib/services'

function PinSymbol (color) {
  return {
    path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
    fillColor: color,
    fillOpacity: 1,
    strokeColor: '#000',
    strokeWeight: 2,
    scale: 1
  }
}

/**
 * Subclass that renders a Google Map with drawing tools using the Google Maps APIs.
 * This class have drawing event callbacks for Circles, Rectangles and Polygons.
 */
class GoogleShape extends GoogleMapDraw {
  unique_addresses = []
  currentShape = null
  currentShapeType = null

  // https://developers.google.com/maps/documentation/javascript/events
  MAP_EVENTS = {
    ROTATION: 'heading_changed',
    TILT: 'tilt_changed',
    RESIZE: 'resize'
  }

  constructor (params) {
    super(params)

    this.onCircleDraw = this.onCircleDraw.bind(this)
    this.onPolygonDraw = this.onPolygonDraw.bind(this)

    this.bindDrawEvents({
      cbCircle: this.onCircleDraw,
      cbPolygon: this.onPolygonDraw
    })

    // Testing: update polygon paths on map tilt
    this.gmap.addListener(this.MAP_EVENTS.TILT, () => {
      console.log('---TILT changed')

      if ((this.currentShape !== null)
        && (this.currentShapeType === GoogleMapDraw.DRAWING_MODES.POLYGON)) {
        const tiltFactor = 0.1
        const currentTilt = this.gmap.getTilt()
        const adjustment = 1 + (currentTilt * tiltFactor)
        const originalPath = this.currentShape.getPath()
        const newPath = []

        originalPath.forEach((coord) => {
          const adjustedLat = coord.lat() * adjustment
          const adjustedLng = coord.lng() * adjustment
          /* eslint-disable no-undef */
          const adjustedCoord = new google.maps.LatLng(adjustedLat, adjustedLng)
          newPath.push(adjustedCoord)
        })

        console.log('---updating tilt...')
        console.log(`---map tilt: ${this.gmap.getTilt()}`)
        console.log(`---tilt factor: ${tiltFactor}`)
        console.log(`---adjustment: ${adjustment}`)
        console.log('---original coords: ', originalPath.getArray().map(x => ({ lat: x.lat(), lng: x.lng() })))
        console.log('---new coords', newPath.map(x => ({ lat: x.lat(), lng: x.lng() })))

        this.currentShape.setPath(newPath)
      }
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
        map: this.gmap
      })
    })

    // Center marker
    return new google.maps.Marker({
      position: center,
      map: this.gmap,
      icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    })
  }

  onPolygonDraw (polygon) {
    this.currentShape = polygon
    this.currentShapeType = GoogleMapDraw.DRAWING_MODES.POLYGON

    console.log(polygon)
    console.log('---path', polygon.getPath())
    const currentRoofArea = polygon.area * 10.7639

    console.log('--area', polygon.area, currentRoofArea)

    polygon.vertices.forEach((coord) => {
      // Draw markers
      return new google.maps.Marker({
        position: coord,
        map: this.gmap,
        icon: PinSymbol('#58FF33')
        // icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
      })
    })

    // Draw a center marker
    return new google.maps.Marker({
      position: polygon.center,
      map: this.gmap
    })
  }
}

export default GoogleShape
