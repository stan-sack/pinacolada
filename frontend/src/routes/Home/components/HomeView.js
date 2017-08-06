import React from 'react'
// import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'

const getPredictorTime = (props) => {
    
}

export const HomeView = () => (
  <div>
    <h4>The weather at {getPredictorTime} looks like this:</h4>
    <img alt='Predicted weather' className='weatherImage' src={props.latestPredictionImage} />
  </div>
)

export default HomeView
