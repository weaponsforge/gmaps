import Polygons from './polygons'
import MarkersPolygon from './markers'

const DRAW_TYPE = {
  POLYGONS: 'polygons',
  MARKERS: 'markers'
}

/* pins */
const app = (type = 'polygons') => {
  if (type === 'polygons') {
    console.log('--drawing leaflet.draw polygons')

    return new Polygons({
      lat: 42.73766129548526,
      lng: -73.76168500632049,
      zoom: 21,
      mapId: 'map-line',
      allowModes: [
        Polygons.SHAPE_TYPES.POLYGON
      ],
      drawOptions: {
        position: 'topleft',
        draw: {
          polyline: false,
          polygon: false,
          marker: false,
          circle: false,
          rectangle: false,
          circlemarker: false
        }
      }
    })
  } else {
    console.log('--drawing custom polygon using leaflet markers/polygons')

    return new MarkersPolygon({
      lat: 42.73766129548526,
      lng: -73.76168500632049,
      zoom: 21,
      mapId: 'map-line'
    })
  }
}

export {
  app,
  DRAW_TYPE
}
