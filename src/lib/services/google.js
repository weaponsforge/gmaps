/**
  * Creates a new Google Map and returns a Google Places Service object
  * @param {Object} location - Object containing latitude and longitude i.e., { lat, lng }
  * @param {Object} gmapId - HTML DOM id of the element containing the Google Map.
  * @returns {Object} PlacesService
  */
const createPlacesService = ({ location, gmapId }) => {
  /* eslint-disable no-undef */
  const point = new google.maps.LatLng(location.lat, location.lng)

  const gmap = new google.maps.Map(document.getElementById(gmapId), {
    center: point,
    zoom: 19,
    mapTypeId: 'satellite'
  })

  return new google.maps.places.PlacesService(gmap)
}

/**
  * Fetch home and establishments addresses using the Google Places NearbySearch API (for the frontend).
  * It uses the Maps JavaScript API (initializting a google map) for compatibility running on the frontend.
  * @typedef {Object} params
  * @param {Object} params.location - Object containing latitude and longitude i.e., { lat, lng }
  * @param {Object} params.radius - Circle radius in miles from the center "location"
  * @param {String} params.service - Google Places service object initialized from a Google Map.
  * @returns {Promise} Promise that resolves into an Object[] array of home addresses.
  */
const fetchNearbyPlaces = async ({ location, radius, service }) => {
  let addresses = []

  console.log('---fetching center', location)
  console.log(`---radius: ${radius} meters`)

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

  return await new Promise((resolve, reject) => {
    service.nearbySearch(request, (results, status, pagination) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK || !results) {
        reject(new Error('Search status error'))
      } else {
        setTimeout(() => {
          addresses = [...addresses, ...results]
          console.log(`---fetched ${results.length} sub-addresses`)

          console.log(results.map(x => `${x.vicinity}\n`).reduce((list, x, index) => {
            return `${list} ${x}`
          }, ''))
          console.log('\n\n')

          if (pagination.hasNextPage) {
            console.log('---fetching next page')
            pagination.nextPage()
          } else {
            console.log(`---finished fetching ${addresses.length} addresses`)
            resolve(addresses)
          }
        }, 3000)
      }
    })
  })
}

export {
  createPlacesService,
  fetchNearbyPlaces
}
