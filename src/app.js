import MapDraw from './map-draw/map-draw.js'

window.mymap = null

const start = () => {
  window.mymap = new MapDraw({
    mapId: 'map',
    gmapId: 'gmap',
    baseMapUrl: 'mapbox://styles/mapbox/satellite-v9'
  })
}

start()
