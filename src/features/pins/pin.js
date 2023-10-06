import { LeafletGoogleMap } from '../../lib/maps/leaflet'

import './assets/css/map-stylev9.9-lite.css'
import './assets/css/styleMapv2.5-lite.css'

class CustomIcon extends LeafletGoogleMap {
  constructor (params) {
    super(params)

    /* eslint-disable no-undef */
    this.bindMapClick()
    this.initIcon()

    const center = this.map.getCenter()
    const marker = L.marker(center, { icon: this.icon }).addTo(this.map)

    marker.addEventListener('click', (e) => {
      console.log('icon clicked')
    })
  }

  bindMapClick () {

  }

  initIcon () {
    this.icon = L.icon({
      iconUrl: './features/pins/assets/img/red-icon-128.png',
      iconSize: [128, 128],
      iconAnchor: [64, 64]
    })
  }
}

const app = () => {
  return new CustomIcon({
    mapId: 'map-line'
  })
}

export default app
