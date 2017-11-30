import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import MapView, { PROVIDER_GOOGLE, UrlTile } from 'react-native-maps'
import SearchBar from '../../components/SearchBar'
import AnimatedMarker from '../../components/AnimatedMarker'
import { TILE_FOLDER_URL } from '../../config/aws'
// import Icon from 'react-native-vector-icons/FontAwesome'
import mapStyle from '../../assets/mapStyle'

class MapScreen extends React.Component {
	constructor(props) {
		super(props)
		this.setSearchBarRef = this.setSearchBarRef.bind(this)
	}

	componentWillMount() {
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
	}

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchId)
	}

	setSearchBarRef(ref) {
		this.searchBarRef = ref
	}

	render() {
		console.log(this.props)
		return (
			<View style={styles.container}>
				<MapView.Animated
					onPanDrag={() => {
						this.searchBarRef.blur()
						this.props.updateShowGeoSearchList(false)
					}}
					onPress={() => {
						this.searchBarRef.blur()
						this.props.updateShowGeoSearchList(false)
					}}
					onLongPress={() => {
						this.searchBarRef.blur()
						this.props.updateShowGeoSearchList(false)
					}}
					onMarkerSelect={() => {
						this.searchBarRef.blur()
						this.props.updateShowGeoSearchList(false)
					}}
					customMapStyle={mapStyle}
					provider={PROVIDER_GOOGLE}
					style={styles.map}
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
				<View style={{ ...StyleSheet.absoluteFillObject }}>
					<SearchBar
						updateShowGeoSearchList={this.props.updateShowGeoSearchList}
						shouldShowGeoSearchList={this.props.shouldShowGeoSearchList}
						setRef={this.setSearchBarRef}
						userLocation={this.props.userLocation}
						updatePositionOfInterest={this.props.updatePositionOfInterest} />

				</View>
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
	currentViewport: PropTypes.object,
	updateShowGeoSearchList: PropTypes.func.isRequired,
	shouldShowGeoSearchList: PropTypes.bool.isRequired
}


const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	bubble: {
		top: 0,
		backgroundColor: 'rgba(255,255,255,0.7)',
		paddingHorizontal: 18,
		paddingVertical: 12,
		borderRadius: 20,
	},
	latlng: {
		width: 200,
		alignItems: 'stretch',
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
})

export default MapScreen
