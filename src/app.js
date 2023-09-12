import MapDraw from './map-draw/map-draw.js'

const start = () => {
  const map = new MapDraw({
    mapId: 'map',
    gmapId: 'gmap',
    baseMapUrl: 'mapbox://styles/mapbox/satellite-v9'
  })

  return map
}

start()
