import React from 'react'
import PropTypes from 'prop-types'
import './SydneyMap.scss'
import { Map, TileLayer, ImageOverlay } from 'react-leaflet'

// const position = [-33.7, 151.21]
const bounds = [[-32.32, 149.49], [-34.52, 152.37]]
const SydneyMap = props => (
	<div>
		<Map
			bounds={bounds}
			maxZoom={5}
			maxBounds={bounds}
			maxBoundsViscosity={1.0}>
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
