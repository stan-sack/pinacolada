import { connect } from 'react-redux'
import { setUserLocation, updatePositionOfInterest, updateCurrentViewport, updateNoRowsToDisplay, setShouldShowListView } from '../../modules/mapState/actionCreators'
import MapScreen from './MapScreen'

const mapDispatchToProps = {
	setUserLocation,
	updatePositionOfInterest,
	updateCurrentViewport,
	updateNoRowsToDisplay,
	setShouldShowListView
}

const mapStateToProps = state => ({
	userLocation: state.mapState.userLocation,
	positionOfInterest: state.mapState.positionOfInterest,
	currentViewport: state.mapState.currentViewport,
	noRowsToDisplay: state.mapState.noRowsToDisplay,
	shouldShowListView: state.mapState.shouldShowListView
})


export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)
