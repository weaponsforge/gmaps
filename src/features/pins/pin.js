import { LeafletGoogleMapDraw } from '../../lib/maps/leaflet'

import './assets/css/map-stylev9.9-lite-edit.css'
// import './assets/css/styleMapv2.5-lite.css'
import './assets/css/basic-leaflet.css'

class CustomIcon extends LeafletGoogleMapDraw {
  // Leaflet custom icon https://leafletjs.com/examples/custom-icons/
  icon

  // Leaflet divIcon https://leafletjs.com/reference.html#divicon
  divIcon

  // Custom Leaflet.draw polygon handler
  polygonDrawer

  constructor (params) {
    super(params)

    /* eslint-disable no-undef */
    this.bindMapClick()
    this.initIcon()
    this.initDivIcon()
    // this.initPolygonDrawer()

    const center = this.map.getCenter()
    const marker = L.marker(center, { icon: this.icon }).addTo(this.map)

    marker.addEventListener('click', (e) => {
      console.log('icon clicked')

      // Get the pixel coordinates of the click event relative to the marker's icon
      const iconSize = this.icon.options.iconSize
      const clickedPoint = this.map.latLngToContainerPoint(e.latlng)
      const markerPosition = this.map.latLngToContainerPoint(marker.getLatLng())
      const relativeClickPoint = clickedPoint.subtract(markerPosition)

      // Define the threshold for the bottom area (adjust as needed)
      const bottomThreshold = iconSize[1] * 0.7

      console.log(clickedPoint, iconSize)

      // Check if the click falls within the bottom portion of the marker
      if (relativeClickPoint.y > bottomThreshold) {
        // Your custom click event handler code here for the bottom part
        console.log('Marker clicked at the bottom!')
      }
    })
  }

  initPolygonDrawer () {
    /* eslint-disable no-undef */
    this.polygonDrawer = new L.Draw.Polygon(this.map)
    L.drawLocal.draw.handlers.polygon.tooltip.start = 'Click to add points at the corners of your roof'
    L.drawLocal.draw.handlers.polygon.tooltip.cont = 'Continue adding points'
    L.drawLocal.draw.handlers.polygon.tooltip.end = 'Click on the first point to finish drawing'
    this.polygonDrawer.enable()
  }

  /**
   * Creates a Leaflet icon
   */
  initIcon () {
    this.icon = L.icon({
      iconUrl: './features/pins/assets/img/red-icon-128.png',
      iconSize: [128, 128],
      iconAnchor: [64, 64]
    })
  }

  /**
   * Creates a Leaflet DIV icon
   */
  initDivIcon () {
    this.divIcon = L.divIcon({
      className: 'custom-marker',
      html: '<div class="marker-content"></div>',
      iconSize: [128, 128], // Set the size of your custom icon
      iconAnchor: [64, 128] // Set the anchor point to the middle of the bottom edge
    })
  }
}

const app = () => {
  return new CustomIcon({
    mapId: 'map-line',
    drawOptions: {
      position: 'topleft',
      draw: {
        polyline: false,
        polygon: true,
        marker: false,
        circle: false,
        rectangle: false,
        circlemarker: false
      }
    }
  })
}

export default app
