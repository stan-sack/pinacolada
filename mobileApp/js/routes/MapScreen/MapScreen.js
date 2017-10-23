import React from 'react'
import PropTypes from 'prop-types'
import { View, Dimensions, StyleSheet, Text } from 'react-native'
import MapView, { PROVIDER_GOOGLE, UrlTile } from 'react-native-maps'
import SearchBar from '../../components/SearchBar'
import { TILE_FOLDER_URL } from '../../config/aws'

const { width, height } = Dimensions.get('window')

const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 1
const LATITUDE = -33.8688
const LONGITUDE = 151.2093
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class MapScreen extends React.Component {
    componentWillMount() {
        // this.props.setNewestImageUri()
        this.watchId = navigator.geolocation.watchPosition(
            position => this.props.setCurrentPosition(position.coords),
            error => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 50 }
        )
    }
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId)
    }
    render() {
        return (
            <View style={ styles.container }>
                <MapView.Animated
                    provider={ PROVIDER_GOOGLE }
                    style={ styles.map }
                    region={new MapView.AnimatedRegion({
                        latitude: LATITUDE,
                        longitude: LONGITUDE,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    })}>
                    <UrlTile
                        zIndex={5}
                        urlTemplate={ `${TILE_FOLDER_URL}/{z}/{x}/{y}.png` } />
                    {
                        this.props.currentPosition.latitude &&
                        <MapView.Marker
                            coordinate={{
                                latitude: this.props.currentPosition.latitude,
                                longitude: this.props.currentPosition.longitude
                            }}
                            />
                    }
                </MapView.Animated>
                <SearchBar />
            </View>
        )
    }
}

MapScreen.propTypes = {
    currentPosition: PropTypes.object,
    setCurrentPosition: PropTypes.func.isRequired
};


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
