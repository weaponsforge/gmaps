import { MapDraw } from '../../lib/maps/drawing'

/**
 * Sub class for testing fetching all home addresses inside a Circle.
 * Requires the Google Maps API library.
 *
 * PLACES LIBRARY
 * https://developers.google.com/maps/documentation/javascript/places#place_search_requests
 *
 * MAPS JAVASCRIPT API (NODEJS)
 * https://developers.google.com/maps/documentation/javascript/overview#js_api_loader_package
 *
 * PLACES SEARCH
 * https://developers.google.com/maps/documentation/javascript/examples/place-search
 *
 * https://stackoverflow.com/questions/42180788/how-to-use-cors-to-implement-javascript-google-places-api-request/42182716#42182716
 */
class HomeAddressesWebMap extends MapDraw {
  gmap
  gmapId
  result

  /**
   * HomeAddressesWebMap constructor parameters
   * @typedef {Object} config
   * @param {String} config.gmapID - HTML DOM id where to render the Google Map.
   * @param {String} config.styleUrl - MapBox (basemap) style URL.
   * @param {String} config.accessToken - MapBox access token. This parameter is optional if MAPBOX_ACCESS_TOKEN env variable is defined.
   * @param {String} config.maxZoom - Maximum map zoom (0 - 24).
   */
  constructor (config) {
    super(config)

    this.gmapId = config?.gmapId ?? '-'
    this.initGoogleMaps(this.gmapId)
    this.fetchCallback = this.fetchCallback.bind(this)
  }

  /**
   * Initialize a google map object.
   * @param {String} gmapId - DOM element ID that will contain the google maps
   */
  initGoogleMaps (gmapId) {
    /* eslint-disable no-undef */
    console.log(`---initializing google maps, ID "#${gmapId}"`)
    const point = new google.maps.LatLng(process.env.MAP_LAT, process.env.MAP_LON)

    this.gmap = new google.maps.Map(document.getElementById(gmapId), {
      center: point,
      mapTypeId: 'satellite',
      zoom: 18
    })
  }

  /**
   * Overwrite the parent bindMapEvents: Fetch home addresses after drawing a Circle.
   */
  bindMapEvents () {
    const that = this

    this.map.on(L.Draw.Event.CREATED, async function (e) {
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

        // Display a Point marker in the center radius
        that.createMarker(layer.getLatLng()).addTo(that.map)

        console.log(`radius: ${radius}`)
        console.log(`center: ${center}`)

        that.fetchNearbyPlaces({
          location: layer.getLatLng(),
          radius
        })
      } else if (type === MapDraw.SHAPE_TYPES.POLYGON) {
        console.log('is polygon')
      }
    })
  }

  /**
   * Fetches home and establishments addresses using the Google Places NearbySearch API (for the backend).
   * Note: This method has CORS errors when called from the frontend.
   * @typedef {Object} params
   * @param {Object} params.location - Comma-separated latitude and longitude i.e., `latitude,longitude`
   * @param {String} params.radius - Circle area radius in miles.
   * @returns {Promise}
   */
  async fetchAddresses ({ location, radius }) {
    const nearbyfetchAddressesURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
    // const queryURL = `${nearbyfetchAddressesURL}?location=${location}&radius=${radius}&key=${process.env.GOOGLE_API_KEY}`

    const params = {
      location,
      radius,
      key: process.env.GOOGLE_API_KEY
    }

    return await axios.get(nearbyfetchAddressesURL, {
      params
    })

    /*
    $.getJSON(queryURL, function(data) {
      console.log(data)
    })
    */
  }

  /**
   * Fetch home and establishments addresses using the Google Places NearbySearch API (for the frontend).
   * It uses the Maps JavaScript API (initializting a google map) for compatibility running on the frontend.
   * @typedef {Object} params
   * @param {Object} params.location - Object containing latitude and longitude i.e., { lat, lng }
   * @param {Object} params.radius - Circle radius in miles from the center "location"
   */
  fetchNearbyPlaces ({ location, radius, callback }) {
    const point = new google.maps.LatLng(location.lat, location.lng)
    // const place = { lat: location.lat, lng: location.lng }

    this.gmap = new google.maps.Map(document.getElementById(this.gmapId), {
      center: point,
      zoom: 19,
      mapTypeId: 'satellite'
    })

    console.log('---fetching center', location)
    console.log('---radius', radius)
    console.log('---point', point)

    const request = {
      location,
      radius: Math.round(radius),
      locationBias: {
        radius,
        center: {
          lat: location.lat,
          lng: location.lng
        }
      }
    }

    const service = new google.maps.places.PlacesService(this.gmap)
    service.nearbySearch(request, this.fetchCallback)
  }

  fetchCallback (results, status, pagination) {
    const that = this
    that.result = results

    console.log('---fetch results', status)
    console.log('---pagination', pagination)
    console.log(results)
    console.log(results.map(x => `${x.vicinity}\n`).reduce((list, x, index) => {
      return `${list} ${x}`
    }, ''))

    // Create markers on each address in the Leaflet map
    results.forEach((item) => {
      that.createMarker({
        lat: item.geometry.location.lat(),
        lng: item.geometry.location.lng()
      }).addTo(that.map)
    })

    // Create markers on each address in the Google map
    results.forEach((item) => {
      /* eslint-disable no-new */
      new google.maps.Marker({
        map: that.gmap,
        position: item.geometry.location
      })
    })
  }
}

export default HomeAddressesWebMap
