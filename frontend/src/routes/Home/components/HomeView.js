import React from 'react'
// import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'
import PropTypes from 'prop-types'

// const getPredictorTime = (props) => {
//
// }

export const HomeView = (props) => (
    <div>
        <button onClick={props.setNewestImageUri}>Click here to fetch latest image</button><br /><br />
        <img src={props.imageUri} />
    </div>
)

HomeView.propTypes = {
    setNewestImageUri: PropTypes.func.isRequired,
    imageUri: PropTypes.string,
}

export default HomeView

// <h4>The weather at {getPredictorTime} looks like this:</h4>
// <img alt='Predicted weather' className='weatherImage' src={props.latestPredictionImage} />
