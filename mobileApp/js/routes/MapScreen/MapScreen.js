import React from 'react'
import { View, Dimensions, StyleSheet, Text } from 'react-native'
import MapView, { PROVIDER_GOOGLE, UrlTile } from 'react-native-maps'
import { TILE_FOLDER_URL } from '../../config/aws'

const { width, height } = Dimensions.get('window')

const ASPECT_RATIO = width / height
const LATITUDE = -33.8688
const LONGITUDE = 151.2093
const LATITUDE_DELTA = 1
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class MapScreen extends React.Component {
    componentWillMount() {
        // this.props.setNewestImageUri()
    }
    render() {
        return (
            <View>
                <Text>{this.props.newestImageUri}</Text>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={ styles.container }
                    initialRegion={{
                        latitude: LATITUDE,
                        longitude: LONGITUDE,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}>
                    <UrlTile
                        zIndex={5}
                        urlTemplate={ `${TILE_FOLDER_URL}/{z}/{x}/{y}.png` } />
                </MapView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    }
})

export default MapScreen
