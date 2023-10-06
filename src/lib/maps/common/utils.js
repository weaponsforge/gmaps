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

  /**
   * Captures the screenshot of a DOM element using the html2canvas lib.
   * @param {String} domId - HTML DOM element ID
   * @param {Function} callback - Callback method before taking the screenshot
   */
  screenshot (domId, callback) {
    const mapContainer = document.getElementById(domId)

    if (mapContainer === undefined) {
      return
    }

    if (callback !== undefined) {
      callback()
    }

    /* eslint-disable no-undef */
    html2canvas(mapContainer, { useCORS: true }).then((canvas) => {
      canvas.toBlob((blob) => {
        const fileURL = URL.createObjectURL(blob)
        const link = document.createElement('a')

        link.href = fileURL
        link.setAttribute('download', 'file.png')
        document.body.appendChild(link)

        link.click()
        document.body.removeChild(link)
      })
    })
  }
}

export default MapUtils
