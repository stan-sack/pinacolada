import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import MapView, { PROVIDER_GOOGLE, UrlTile } from 'react-native-maps'
import SearchBar from '../../components/SearchBar'
import RainfallChart from '../../components/RainfallChart'
import AnimatedMarker from '../../components/AnimatedMarker'
import { TILE_FOLDER_URL } from '../../config/aws'
// import Icon from 'react-native-vector-icons/FontAwesome'
import mapStyle from '../../assets/mapStyle'
import { PermissionsAndroid } from 'react-native';


class MapScreen extends React.Component {
	constructor(props) {
		super(props)
		this.setSearchBarRef = this.setSearchBarRef.bind(this)
		this.clearSearchInput = this.clearSearchInput.bind(this)
	}

	componentWillMount() {
		this.requestCameraPermission().then(() => {
			navigator.geolocation.getCurrentPosition(
				position => this.props.setUserLocation(position.coords),
				error => console.log(error),
				{ enableHighAccuracy: true, timeout: 60000, maximumAge: 1000 },
			)

			this.watchId = navigator.geolocation.watchPosition(
				position => this.props.setUserLocation(position.coords),
				error => console.log(error),
				{
					enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10,
				},
			)
		})
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.shouldShowSearchInput) {
			this.searchBarRef.focus()
		}
	}

	async requestCameraPermission() {
		try {
			await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				{
					'title': 'Pina Colada location access',
					'message': 'Allow Pina Colada to access your location for the best possible whether forecast.'
				}
			)
		} catch (err) {
			console.warn(err)
		}
	}

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchId)
	}

	setSearchBarRef(ref) {
		this.searchBarRef = ref
	}

	clearSearchInput() {
		this.searchBarRef.setNativeProps({ text: '' })
	}

	render() {
		return (
			<View style={mapStyles.container}>
				<StatusBar
					translucent
					backgroundColor='rgba(0, 0, 0, 0.2)'
					/>
				<MapView.Animated
					onPanDrag={() => {
						this.searchBarRef.blur()
						this.props.setShouldShowSearchInput(false)
						this.props.setShouldShowListView(false)
						// this.props.updateShowGeoSearchList(false)
					}}
					onPress={() => {
						this.searchBarRef.blur()
						this.props.setShouldShowSearchInput(false)
						this.props.setShouldShowListView(false)
						// this.props.updateShowGeoSearchList(false)
					}}
					onLongPress={() => {
						this.searchBarRef.blur()
						this.props.setShouldShowSearchInput(false)
						this.props.setShouldShowListView(false)
						// this.props.updateShowGeoSearchList(false)
					}}
					onMarkerSelect={() => {
						this.searchBarRef.blur()
						this.props.setShouldShowSearchInput(false)
						this.props.setShouldShowListView(false)
						// this.props.updateShowGeoSearchList(false)
					}}
					customMapStyle={mapStyle}
					provider={PROVIDER_GOOGLE}
					style={mapStyles.map}
					region={new MapView.AnimatedRegion({
						latitude: this.props.currentViewport.lat,
						longitude: this.props.currentViewport.lng,
						latitudeDelta: this.props.currentViewport.latDelta,
						longitudeDelta: this.props.currentViewport.lngDelta,
					})} >
					<UrlTile
						zIndex={5}
						urlTemplate={`${TILE_FOLDER_URL}/{z}/{x}/{y}.png`} />
					{
						// this.props.userLocation &&
						// <MapView.Marker
						// 	coordinate={{
						// 		latitude: this.props.positionInFocus.location.lat,
						// 		longitude: this.props.positionInFocus.location.lng ||
						// 		this.props.positionInFocus.location.lon
						// 	}} />
					}
					{this.props.userLocation && <AnimatedMarker position={this.props.userLocation} />}
				</MapView.Animated>
				<SearchBar
					shouldShowListView={this.props.shouldShowListView}
					setShouldShowListView={this.props.setShouldShowListView}
					updateNoRowsToDisplay={this.props.updateNoRowsToDisplay}
					noRowsToDisplay={this.props.noRowsToDisplay}
					setTextInputRef={this.setSearchBarRef}
					textInputRef={this.searchBarRef}
					userLocation={this.props.userLocation}
					updatePositionOfInterest={this.props.updatePositionOfInterest}
					shouldShowSearchInput={this.props.shouldShowSearchInput}
					setShouldShowSearchInput={this.props.setShouldShowSearchInput}
					clearSearchInput={this.clearSearchInput} />
				<RainfallChart />
			</View>
		)
	}
}

MapScreen.propTypes = {
	userLocation: PropTypes.object,
	setUserLocation: PropTypes.func.isRequired,
	// positionOfInterest: PropTypes.object,
	updatePositionOfInterest: PropTypes.func.isRequired,
	// updateCurrentViewport: PropTypes.func.isRequired,
	updateNoRowsToDisplay: PropTypes.func.isRequired,
	noRowsToDisplay: PropTypes.number.isRequired,
	currentViewport: PropTypes.object,
	shouldShowListView: PropTypes.bool.isRequired,
	setShouldShowListView: PropTypes.func.isRequired,
	shouldShowSearchInput: PropTypes.bool.isRequired,
	setShouldShowSearchInput: PropTypes.func.isRequired
}


const mapStyles = StyleSheet.create({
	container: {
		borderWidth: 0.8,
		borderColor: 'green',
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		// width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	map: {
		position: 'absolute',
		left: 0,
		top: 0,
		bottom: 0,
		right: 0,
		// justifyContent: 'flex-end',
		// alignItems: 'center',
		// width: Dimensions.get('window').width,
		// height: Dimensions.get('window').height,
	},
})

// const styles = EStyleSheet.create({
// 	searchBar: {
// 		position: 'absolute',
// 		left: 0,
// 		right: 0,
// 	}
// })

export default MapScreen
