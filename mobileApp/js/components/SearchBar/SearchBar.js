import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { GooglePlacesAutocomplete } from '../../lib/GooglePlacesAutocomplete/GooglePlacesAutocomplete'
import Icon from 'react-native-vector-icons/EvilIcons'
import * as Animatable from 'react-native-animatable'


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
	constructor(props) {
		super(props)
		this.state = { animating: false }
	}

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
				// paddingLeft: 10,
			},
			listView: {
				backgroundColor: 'white',
				maxHeight: noRows * 44
			},
			container: {
				flex: 1,
				display: this.props.shouldShowSearchInput || this.state.animating ? 'flex' : 'none',
			}
		}
	}

	getSearchIconStyle() {
		return {
			display: !this.props.shouldShowSearchInput && !this.state.animating ? 'flex' : 'none',
			alignSelf: 'center',
			height: 44,
			width: 44,
			backgroundColor: 'rgba(200, 200, 200, 0.7)',
			borderRadius: 22,
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.shouldShowSearchInput && !nextProps.shouldShowSearchInput) {
			this.setState({ animating: true })
			this.refs.searchInput.fadeOut(400).then(() => {
				this.setState({ animating: false })
				this.refs.searchIcon.fadeIn(400)
			})
		} else if (!this.props.shouldShowSearchInput && nextProps.shouldShowSearchInput) {
			this.setState({ animating: true })
			this.refs.searchInput.fadeIn(500).then(() => this.setState({ animating: false }))
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Animatable.View ref='searchInput'>
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
						renderRightButton={
							() =>
								<TouchableOpacity
									style={styles.iconContainer}
									onPress={() => {
										this.props.clearSearchInput()
										this.props.setShouldShowSearchInput(false)
									}}>
									<Icon name='close' size={25} />
								</TouchableOpacity>
						}
						renderLeftButton={
							() =>
								<TouchableOpacity
									style={styles.iconContainer}
									onPress={() => {
										// Trigger search
									}}>
									<Icon name='search' size={25} />
								</TouchableOpacity>
						} />
				</Animatable.View>
				<Animatable.View ref='searchIcon'>
					<TouchableOpacity
						style={[styles.iconContainer, this.getSearchIconStyle()]}
						onPress={() => {
							this.props.setShouldShowSearchInput(true)
						}}>
						<Icon name='search' size={25} />
					</TouchableOpacity>
				</Animatable.View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 30,
		width: '90%',
	},
	iconContainer: {
		flex: 0.15,
		alignItems: 'center',
		justifyContent: 'center',
	},
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
	shouldShowSearchInput: PropTypes.bool.isRequired,
	setShouldShowSearchInput: PropTypes.func.isRequired,
	clearSearchInput: PropTypes.func.isRequired,
}

export default SearchBar
