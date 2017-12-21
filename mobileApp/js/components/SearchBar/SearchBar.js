import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Dimensions } from 'react-native'
import { GooglePlacesAutocomplete } from '../../lib/GooglePlacesAutocomplete/GooglePlacesAutocomplete'
import Icon from 'react-native-vector-icons/EvilIcons'

const getUserLocation = (userLocation) => {
	if (userLocation !== undefined) {
		return [{
			description: 'Current location',
			geometry: {
				location: { lat: userLocation.latitude, lng: userLocation.longitude },
				// viewport: {
				// 	northeast: {
				// 		lat: userLocation.latitude + REGION_SIZE / 2,
				// 		lng: userLocation.longitude + getAspectRatio() * REGION_SIZE / 2
				// 	},
				// 	southwest: {
				// 		lat: userLocation.latitude - REGION_SIZE / 2,
				// 		lng: userLocation.longitude - getAspectRatio() * REGION_SIZE / 2
				// 	}
				// }
			},
		}]
	}
}

class SearchBar extends React.Component {
	getStyle(noRows) {
		return {
			textInputContainer: {
				width: '100%',
			},
			description: {
				fontWeight: 'bold',
			},
			predefinedPlacesDescription: {
				color: '#1faadb',
			},
			textInput: {
				// textAlign: 'center'
			},
			listView: {
				backgroundColor: 'white',
				maxHeight: noRows * 44
			},
			container: {
				flex: 1,
				paddingTop: '8%',
				width: '90%'
			}
		}
	}
	render() {
		return (
			<GooglePlacesAutocomplete
				textInputProps={{
					ref: (input) => { this.props.setTextInputRef(input) },
					onBlur: () => { this.props.setShouldShowListView(false) },
					onFocus: () => { this.props.setShouldShowListView(true) },
					onChangeText: text => {
						if (text === '') {
							// this.props.textInputRef.blur()
						}
					},
				}}
				placeholder='Search'
				minLength={2}
				autoFocus={false}
				returnKeyType='search'
				listViewDisplayed={this.props.shouldShowListView}
				fetchDetails
				renderDescription={row => row.description}
				onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
					this.props.updatePositionOfInterest(details.geometry)
				}}
				getDefaultValue={() => ''}
				query={{
					// available options: https://developers.google.com/places/web-service/autocomplete
					key: 'AIzaSyAvKxnypL99Q72vL9uCQeobpZ5GXUrMorE',
					language: 'en', // language of the results
				}}

				styles={this.getStyle(this.props.noRowsToDisplay)}
				nearbyPlacesAPI='GooglePlacesSearch'
				GoogleReverseGeocodingQuery={{
					key: 'AIzaSyCo4mdlERksiA6y7OOtztUZ_MHV8l4mc2w',
				}}
				GooglePlacesSearchQuery={{
					rankby: 'distance',
				}}
				onUpdate={(length) => { this.props.updateNoRowsToDisplay(Math.min(length, 4)) }}
				debounce={200}
				predefinedPlaces={getUserLocation(this.props.userLocation)}
				predefinedPlacesAlwaysVisible={false}
				renderLeftButton={
					() => <View style={styles.searchIconContainer}><Icon name='search' size={25} /></View>
				} />
		)
	}
}

const styles = StyleSheet.create({
	searchIconContainer: {
		flex: 0.15,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	searchIcon: {
		margin: 'auto',
	},
	wrapper: {
		position: 'absolute',
		left: 0,
		right: 0,
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
		justifyContent: 'flex-end',
		alignItems: 'center',
	}
})

SearchBar.propTypes = {
	updatePositionOfInterest: PropTypes.func.isRequired,
	userLocation: PropTypes.object,
	noRowsToDisplay: PropTypes.number.isRequired,
	updateNoRowsToDisplay: PropTypes.func.isRequired,
	setTextInputRef: PropTypes.func.isRequired,
	// textInputRef: PropTypes.object,
	shouldShowListView: PropTypes.bool.isRequired,
	setShouldShowListView: PropTypes.func.isRequired,
}

export default SearchBar
