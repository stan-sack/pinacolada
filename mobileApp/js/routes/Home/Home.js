
import React from "react";
import { Text, View, Button } from 'react-native'

const Home = props => (
    <View>
        <Text>{'This is dummy text'}</Text>
        <Button
            onPress={() => props.navigation.navigate('About')}
            title="Go to About page"
            />
    </View>
)

export default Home
