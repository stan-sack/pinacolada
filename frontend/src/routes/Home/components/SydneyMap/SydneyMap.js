import React from 'react'
// import PropTypes from 'prop-types'
import './SydneyMap.scss'
import { Map, TileLayer } from 'react-leaflet'

// const position = [-33.7, 151.21]
const bounds = [[-34.28, 150.50], [-33.13, 151.9]]
const SydneyMap = props => (
	<div>
		<Map bound={bounds}>
			<TileLayer
				url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}@2x.png' />
		</Map>
	</div>
)

SydneyMap.propTypes = {}

export default SydneyMap
