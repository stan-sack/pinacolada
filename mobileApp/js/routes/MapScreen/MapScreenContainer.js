import { connect } from 'react-redux'
import { setUserLocation,
	updatePositionOfInterest,
	updateCurrentViewport,
	updateNoRowsToDisplay,
	setShouldShowListView,
	setShouldShowSearchInput
} from '../../modules/mapState/actionCreators'
import MapScreen from './MapScreen'

const mapDispatchToProps = {
	setUserLocation,
	updatePositionOfInterest,
	updateCurrentViewport,
	updateNoRowsToDisplay,
	setShouldShowListView,
	setShouldShowSearchInput
}

const mapStateToProps = state => ({
	userLocation: state.mapState.userLocation,
	positionOfInterest: state.mapState.positionOfInterest,
	currentViewport: state.mapState.currentViewport,
	noRowsToDisplay: state.mapState.noRowsToDisplay,
	shouldShowListView: state.mapState.shouldShowListView,
	shouldShowSearchInput: state.mapState.shouldShowSearchInput
})


export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)
