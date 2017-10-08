import React from 'react'
import PropTypes from 'prop-types'
import './SydneyMap.scss'
import { Map, TileLayer, ImageOverlay } from 'react-leaflet'

const position = [-33.7, 151.21]
const bounds = [[-34.28, 150.50], [-33.13, 151.9]]
const SydneyMap = props => (
	<div>
		<Map center={position} zoom={4}>
			{
				props.overlayImageSrc &&
				<ImageOverlay url={props.overlayImageSrc} bounds={bounds} />
			}
			<TileLayer
				url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}@2x.png' />
		</Map>
	</div>
)

SydneyMap.propTypes = {
	overlayImageSrc: PropTypes.string.isRequired
}

export default SydneyMap