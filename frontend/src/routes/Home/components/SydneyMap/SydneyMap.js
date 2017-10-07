import React from 'react'
// import PropTypes from 'prop-types'
import './SydneyMap.scss'
import { Map, TileLayer } from 'react-leaflet'

const position = [-33.43, 151.13]
const SydneyMap = props => (
	<div>
		<Map center={position} zoom={5}>
			<TileLayer
				url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}@2x.png' />
		</Map>
	</div>
)

SydneyMap.propTypes = {}

export default SydneyMap
