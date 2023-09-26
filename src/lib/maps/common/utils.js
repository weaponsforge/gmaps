/**
 * Common web mapping utilities
 */
class MapUtils {
  /**
   * Builds an Openstreetmap API query URL with the bounding box (max bounds) of a polygon.
   * @typedef {Object} params
   * @param {Object} maxBounds - Contains the maximum westernmost and easternmost (Lat, Lng) bounds of a polygon.
   * @param {Number} maxBounds.left - Longitude of the left (westernmost) side of the bounding box.
   * @param {Number} maxBounds.bottom - Latitude of the bottom (southernmost) side of the bounding box.
   * @param {Number} maxBounds.right - Longitude of the right (easternmost) side of the bounding box.
   * @param {Number} maxBounds.top - Longitude of the right (easternmost) side of the bounding box.
   * @returns
   */
  buildOSMQuery ({ maxBounds, apiVersion = '0.6', showUrl = true }) {
    const { left, bottom, right, top } = maxBounds
    const osmURL = `https://openstreetmap.org/api/${apiVersion}/map?bbox=${left},${bottom},${right},${top}`

    if (showUrl) {
      prompt('Openstreetmap API URL', osmURL)
    }

    return osmURL
  }
}

export default MapUtils
