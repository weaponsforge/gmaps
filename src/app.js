import maps from './features/compare_maps/maps'

window.maps = null

const start = () => {
  window.maps = maps()
}

start()
