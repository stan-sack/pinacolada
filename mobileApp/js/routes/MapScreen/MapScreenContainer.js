import { connect } from 'react-redux'
import { setUserLocation, updatePositionOfInterest, updateCurrentViewport,
	updateShowGeoSearchList } from '../../modules/mapState/actionCreators'
import MapScreen from './MapScreen'

const mapDispatchToProps = {
	setUserLocation,
	updatePositionOfInterest,
	updateCurrentViewport,
	updateShowGeoSearchList
}

const mapStateToProps = state => ({
	userLocation: state.mapState.userLocation,
	positionOfInterest: state.mapState.positionOfInterest,
	currentViewport: state.mapState.currentViewport,
	shouldShowGeoSearchList: state.mapState.shouldShowGeoSearchList
})


export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)
