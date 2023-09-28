import axios from 'axios'

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
  console.log('---fetching center', location)
  console.log(`---radius: ${radius} meters`)

  const loc = location.toString().substr(1, location.toString().length - 2).split(',')
  console.log(loc)

  const addressapi = `http://localhost:4000/addresses?radius=${Math.round(radius)}&lat=${loc[0]}&lng=${loc[1]}`

  return await new Promise((resolve, reject) => {
    fetch(addressapi)
      .then((response) => response.json())
      .then((data) => {
        // Process the retrieved OSM data here
        console.log(data)
        resolve(data)
      })
      .catch((error) => {
        console.error('Error:', error)
        reject(new Error(err.message))
      })
  })
}

/**
 * Fetch the Google Place Details of a list of place_ids
 * @param {String[]} placeIds
 */
const fetchPlaceData = async (placeIds) => {
  const geoCodeURL = 'https://maps.googleapis.com/maps/api/geocode/json'

  const queryPlaces = placeIds.reduce((list, item) => {
    const params = {
      place_id: item,
      key: process.env.GOOGLE_API_KEY
    }

    return [...list, axios.get(geoCodeURL, { params })]
  }, [])

  return await Promise.all(queryPlaces)
}

/**
 * Builds a home address text using the Google Places Details response keys for
 * street number, street name, city, state and zip code
 * @param {Object[]} addressComponents
 * @returns {String} Home address text
 */
const buildAddressDetails = (addressComponents) => {
  const keys = [
    // street number
    { code: 'street_number', label: 'short_name', sufix: ' ' },
    // street name
    { code: 'route', label: 'long_name', sufix: ', ' },
    // city
    { code: 'locality', label: 'long_name', sufix: ', ' },
    // state
    { code: 'administrative_area_level_1', label: 'short_name', sufix: ' ' },
    // zip code
    { code: 'postal_code', label: 'short_name', sufix: '' }]

  return keys.reduce((list, key) => {
    let found = false
    let index = -1

    for (let i = 0; i < addressComponents.length; i += 1) {
      if (addressComponents[i].types.includes(key.code)) {
        found = true
        index = i
        break
      }
    }

    if (found) {
      list += addressComponents[index][key.label] + key.sufix
    }

    return list
  }, '')
}

/**
 * Builds a home address text using hard-coded address_components[] array indices.
 * @param {Object[]} addressComponents
 * @returns {String} Home address text
 */
const buildAddressFromHardCodeArray = (addressComponents) => {
  const streetNumber = addressComponents[0]?.short_name ?? ''
  const streetName = addressComponents[1]?.long_name ?? ''
  const city = addressComponents[2]?.long_name ?? ''
  const state = addressComponents[4]?.short_name ?? ''
  const zipCode = addressComponents[6]?.short_name ?? ''

  return `${streetNumber} ${streetName}, ${city}, ${state} ${zipCode}`
}

/**
 * Builds a list of unique home addresses with the address name and vicinity from a NearbySearch response
 * @param {Object[]} addresses
 * @returns {String[]}
 */
const buildUniqueAddresses = (addresses) => {
  return addresses.map(x => `${x.name} ${x.vicinity}`)
}

/**
 * Returns full (formatted) home addresses from a Google Place Details query using "place_ids".
 * @param {String[]} placeIds - List of Google Places "place_id" values
 * @returns {String[]} Home addresses
 */
const fetchPlaceDetails = async (placeIds) => {
  try {
    const response = await fetchPlaceData(placeIds)
    console.log('DONE', response?.data ?? [])

    return response.map(item => {
      const record = item.data.results[0]
      const addressComponents = record?.address_components ?? []

      console.log('-formatted:', record.formatted_address)

      return (addressComponents.length > 0)
        ? buildAddressDetails(addressComponents) // buildAddressFromHardCodeArray(addressComponents)
        : record?.formatted_address ?? '-'
    })
  } catch (err) {
    throw new Error(err.message)
  }
}

export {
  createPlacesService,
  fetchNearbyPlaces,
  fetchPlaceDetails,
  buildAddressFromHardCodeArray,
  buildAddressDetails,
  buildUniqueAddresses
}
