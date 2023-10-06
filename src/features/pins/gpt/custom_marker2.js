// Source: GPT 3.5
// Needs L.divIcon

/* eslint-disable no-undef */
const CustomMarker2 = L.Marker.extend({
  options: {
    iconAnchor: [64, 128], // Set the anchor point to the middle of the bottom edge
    bottomThreshold: 0.7 // Adjust this value as needed
  },

  _onClick: function (e) {
    const clickedPoint = this._map.latLngToContainerPoint(e.latlng)
    const markerPosition = this._map.latLngToContainerPoint(this.getLatLng())
    const iconSize = this.options.icon.options.iconSize
    console.log(iconSize)

    const bottomThreshold = iconSize[1] * this.options.bottomThreshold

    // Check if the click falls within the bottom portion of the marker
    if (
      clickedPoint.x >= markerPosition.x - iconSize[0] / 2 &&
          clickedPoint.x <= markerPosition.x + iconSize[0] / 2 &&
          clickedPoint.y >= markerPosition.y - bottomThreshold
    ) {
      L.Marker.prototype._onClick.call(this, e)
    }
  }
})

export default CustomMarker2
