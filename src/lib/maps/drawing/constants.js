const leafletDrawOptions = {
  position: 'topleft',
  collapsed: false,
  draw: {
    circle: {
      shapeOptions: {
        color: 'black'
      }
    },
    polyline: false,
    polygon: {
      allowIntersection: false,
      drawError: {
        color: '#e1e100',
        message: '<strong>Error:</strong> Polygon edges cannot cross!'
      },
      shapeOptions: {
        color: 'black'
      }
    },
    rectangle: false,
    marker: false,
    circlemarker: false
  }
}

export {
  leafletDrawOptions
}
