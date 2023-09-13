import { GoogleMap } from './map-google'

const start = () => {
  const map = new GoogleMap({
    mapId: 'googlemap-basic'
  })

  const buttonBasic = document.getElementById('screenshot-basic')

  buttonBasic.addEventListener('click', (e) => {
    console.log('click me')
    console.log(map)
    map.screenshot()
  })

  return map
}

window.gmap = start()
