import { LeafletGoogleMapDraw } from '../../lib/maps/leaflet'

// Draws Polygons using the Leaflet.draw plugin
class Polygons extends LeafletGoogleMapDraw {
  polygonDrawer
  lineDrawer

  constructor (params) {
    super(params)

    this.initPolygonDrawer()
    // this.initLineDrawer()
  }

  initPolygonDrawer () {
    /* eslint-disable no-undef */
    this.polygonDrawer = new L.Draw.Polygon(this.map)
    L.drawLocal.draw.handlers.polygon.tooltip.start = 'Click to add points at the corners of your roof'
    L.drawLocal.draw.handlers.polygon.tooltip.cont = 'Continue adding points'
    L.drawLocal.draw.handlers.polygon.tooltip.end = 'Click on the first point to finish drawing'
    this.polygonDrawer.enable()
  }

  initLineDrawer () {
    this.lineDrawer = new L.Draw.Polyline(this.map, {
      metric: false,
      feet: true
    })

    this.lineDrawer.enable()
  }
}

export default Polygons
