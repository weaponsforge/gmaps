// Create a custom marker with a custom clickable area
// Source: GPT 3.5

/* eslint-disable no-undef */
const CustomMarker = L.Path.extend({
  initialize: function (latlng, options) {
    L.Path.prototype.initialize.call(this, options)
    this._latlng = L.latLng(latlng)
  },

  options: {
    iconSize: [32, 32], // Set the size of your custom icon
    iconAnchor: [16, 32], // Set the anchor point to the middle of the bottom edge
    bottomThreshold: 0.7, // Adjust this value to determine the bottom portion
    clickable: true
  },

  projectLatlngs: function () {
    this._point = this._map.latLngToLayerPoint(this._latlng)
    this._updateBounds()
  },

  getBounds: function () {
    const size = L.point(this.options.iconSize).divideBy(2)
    const point = this._point
    return new L.Bounds(point.subtract(size), point.add(size))
  },

  _updateBounds: function () {
    this._pxBounds = this.getBounds()
  },

  _containsPoint: function (p) {
    const bottomThreshold = this.options.iconSize[1] * this.options.bottomThreshold
    const bounds = this.getBounds()
    return bounds.contains(p) && p.y >= bounds.min.y + bottomThreshold
  },

  _onClick: function (e) {
    if (this._containsPoint(e.layerPoint)) {
      // Your custom click event handler code here for the bottom part
      alert('Marker clicked at the bottom!')
    }
  },

  onAdd: function (map) {
    map.on('click', this._onClick, this)
    this._map = map
    this.projectLatlngs()
    this._updatePath()
    if (this._path) {
      this._addToPane(this._path)
    }
  },

  onRemove: function (map) {
    if (this._path) {
      this._removePath(this._path)
      this._path = null
    }
    map.off('click', this._onClick, this)
    this._map = null
  }
})

export default CustomMarker

// Create a marker using the custom marker class
// var marker = new CustomMarker([latitude, longitude], { iconUrl: 'path_to_custom_icon.png' }).addTo(map);
