import { connect } from 'react-redux'
// import {  } from '../../modules/rainfallChart/actionCreators'
import RainfallChart from './RainfallChart'

const mapDispatchToProps = {

}

const mapStateToProps = state => ({
	data: state.rainfallChartState.data
})


export default connect(mapStateToProps, mapDispatchToProps)(RainfallChart)
