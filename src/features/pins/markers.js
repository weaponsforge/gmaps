import { LeafletGoogleMapDraw } from '../../lib/maps/leaflet'

// Draws points and polygons using the basic L.polygon class
class MarkersPolygon extends LeafletGoogleMapDraw {
  markers = []
  polygon
  icon

  constructor (params) {
    super(params)
    this.initIcon()
    this.bindMapClickEvents()
  }

  /**
   * Binds click events from the map.
   * Renders a Polygon if there are 3 or more Leaflet markers.
   */
  bindMapClickEvents () {
    this.map.on('click', (e) => {
      /* eslint-disable no-undef */
      const marker = L.marker(e.latlng, { icon: this.icon }).addTo(this.map)
      this.markers.push(marker)

      if (this.markers.length > 1) {
        if (this.polygon) {
          this.map.removeLayer(this.polygon)
        }

        const polyLatLngs = this.markers.map((point) => point.getLatLng())
        this.polygon = L.polygon(polyLatLngs).addTo(this.map)
      }
    })
  }

  initIcon () {
    this.icon = L.icon({
      iconUrl: './features/pins/assets/img/tool-market.png',
      iconSize: [18, 33],
      iconAnchor: [9, 33]
    })
  }
}

export default MarkersPolygon
