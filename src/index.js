// LeafletJS
import '../node_modules/leaflet/dist/leaflet.css'
import 'leaflet'
import 'mapbox-gl-leaflet'

// Global
import './app.css'

// Map App
import './map/map.css'
import WebMapBox from './map-mapbox/map-mapbox'

// App entry point

// LeafletJS-MapBox web map (using mapbox plugin)
new WebMapBox({
  mapId: 'map',
  baseMapUrl: 'mapbox://styles/mapbox/satellite-v9',
})

console.log("App started.")