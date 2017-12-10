import React from 'react'
import PropTypes from 'prop-types'
import { View, Dimensions, Text } from 'react-native'
import { VictoryLine, VictoryVoronoiContainer, VictoryScatter, VictoryGroup } from 'victory-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import WeatherIcons from '../WeatherIcons'



const RainfallChart = props => (
	<View style={styles.container}>

		<VictoryLine
			height={140}
			width={Dimensions.get('window').width * 0.8}

			interpolation='natural'
			containerComponent={
				<VictoryVoronoiContainer
					labels={(d) => "y: " + d.y} />
			}
			data={[
				{ x: 1, y: 2 },
				{ x: 2, y: 3 },
				{ x: 3, y: 5 },
				{ x: 4, y: 4 },
				{ x: 5, y: 7 }
			]}
		/>
		{
			<WeatherIcons name="wi-night-alt-snow" size={40} color="#66ff66" />
		}
	</View>
)

const styles = EStyleSheet.create({
	container: {
		marginBottom: '7%',
		borderWidth: 0.5,
		borderColor: 'red',
		backgroundColor: 'white',
		opacity: 0.5
	}
})

RainfallChart.propTypes = {
	data: PropTypes.array
}

export default RainfallChart
