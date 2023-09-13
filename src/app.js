import { GoogleMap } from './map-google'

const start = () => {
  const map = new GoogleMap({
    mapId: 'googlemap-basic'
  })

  return map
}

start()
