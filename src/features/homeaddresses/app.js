import HomeAddressesWebMap from './map'

const app = () => {
  return new HomeAddressesWebMap({
    mapId: 'map',
    gmapId: 'gmap',
    baseMapUrl: 'mapbox://styles/mapbox/satellite-v9'
  })
}

export default app
