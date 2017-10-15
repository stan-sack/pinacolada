
import React from "react";
import { Text, View, Button } from 'react-native'

const Home = props => (
    <View>
        <Text>{'This is dummy text'}</Text>
        <Button
            onPress={() => props.navigation.navigate('MapScreen')}
            title="Go to Map page"
            />
    </View>
)

export default Home
