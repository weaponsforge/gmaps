import HomeAddressesWebMap from './features/homeaddresses/map'

window.mymap = null

const start = () => {
  window.mymap = new HomeAddressesWebMap({
    mapId: 'map',
    gmapId: 'gmap',
    baseMapUrl: 'mapbox://styles/mapbox/satellite-v9'
  })
}

start()
