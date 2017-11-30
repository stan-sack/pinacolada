import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, Button } from 'react-native'

const Home = props => (
	<View>
		<Text>This is dummy text</Text>
		<Button
			onPress={() => props.navigation.navigate('MapScreen')}
			title='Go to Map page'
		/>
	</View>
)

Home.propTypes = {
	navigation: PropTypes.func
}

export default Home
