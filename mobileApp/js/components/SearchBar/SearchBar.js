import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Icon from 'react-native-vector-icons/EvilIcons'

const getUserLocation = (userLocation) => {
	console.log('re-rendering')
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

const SearchBar = (props) => {
	return (
		<GooglePlacesAutocomplete
			textInputProps={{
				ref: (input) => { console.log(input); props.setRef(input) },
				onFocus: () => props.updateShowGeoSearchList(true),
				// onBlur: () => {this.setState},
				onChangeText: text => {
					console.log(text)
					if (text === '') {
						console.log('blurring')
						console.log(this)
					}
				},
			}}
			placeholder='Search'
			minLength={2}
			autoFocus={false}
			returnKeyType='search'
			listViewDisplayed={'auto'}
			fetchDetails
			renderDescription={row => row.description}
			onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
				console.log('called search')
				console.log(data)
				console.log(details)
				props.updatePositionOfInterest(details.geometry)
			}}
			getDefaultValue={() => ''}
			query={{
				// available options: https://developers.google.com/places/web-service/autocomplete
				key: 'AIzaSyAvKxnypL99Q72vL9uCQeobpZ5GXUrMorE',
				language: 'en', // language of the results
			}}

			styles={{
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
				},
				container: {
					flex: 0.3
				}
			}}
			nearbyPlacesAPI='GooglePlacesSearch'
			GoogleReverseGeocodingQuery={{
				key: 'AIzaSyCo4mdlERksiA6y7OOtztUZ_MHV8l4mc2w',
			}}
			GooglePlacesSearchQuery={{
				rankby: 'distance',
			}}
			debounce={200}
			predefinedPlaces={getUserLocation(props.userLocation)}
			predefinedPlacesAlwaysVisible={false}
			renderLeftButton={
				() => <View style={styles.searchIconContainer}><Icon name='search' size={25} /></View>
			} />
	)
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
})

SearchBar.propTypes = {
	updatePositionOfInterest: PropTypes.func.isRequired,
	userLocation: PropTypes.object,
	setRef: PropTypes.func.isRequired,
	updateShowGeoSearchList: PropTypes.func.isRequired,
	shouldShowGeoSearchList: PropTypes.bool
}

export default SearchBar
