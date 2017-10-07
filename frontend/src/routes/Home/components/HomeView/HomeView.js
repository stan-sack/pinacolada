import React from 'react'
// import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'
import PropTypes from 'prop-types'
import SydneyMap from '../SydneyMap'

// const getPredictorTime = (props) => {
//
// }

export const HomeView = (props) => (
	<div>
		<button onClick={props.setNewestImageUri}>Click here to fetch latest image</button><br /><br />
		<img src={props.imageUri} />
		<SydneyMap />

	</div>
)

HomeView.propTypes = {
	setNewestImageUri: PropTypes.func.isRequired,
	imageUri: PropTypes.string,
}

export default HomeView
