/**
 * Captures the screenshot of a DOM element using the html2canvas lib.
 * @param {String} domId - HTML DOM element ID
 */
const screenshotCanvas = (domId) => {
  const mapContainer = document.getElementById(domId)

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

export {
  screenshotCanvas
}
