import React from 'react'
import PropTypes from 'prop-types'
import { Animated, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import MapView from 'react-native-maps'

const AnimatedMapMarker = Animated.createAnimatedComponent(MapView.Marker)
const AnimatedIcon = Animated.createAnimatedComponent(Icon)
class AnimatedMarker extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			markerBackgroundOpacity: new Animated.Value(0),
			markerBackgroundSize: new Animated.Value(1), // Initial value for opacity: 0
		}
	}


	componentDidMount() {
		this.runAnimation()
	}


	runAnimation() {
		this.state.markerBackgroundOpacity.setValue(0)
		this.state.markerBackgroundSize.setValue(1)
		Animated.parallel([
			Animated.timing(
				this.state.markerBackgroundSize,
				{
					toValue: 60,
					duration: 2000,
					delay: 500,
				},
			),
			Animated.sequence([
				Animated.timing(
					this.state.markerBackgroundOpacity,
					{
						toValue: 1,
						duration: 1000,
						delay: 200,
						// easing: Easing.inOut
					},
				),
				Animated.timing(
					this.state.markerBackgroundOpacity,
					{
						toValue: 0,
						duration: 1000,
						// easing: Easing.inOut
					},
				),
			]),
		])
			.start(() => {
				this.runAnimation()
			})
	}

	render() {
		return (
			<View>
				<AnimatedMapMarker
					anchor={{ x: 0.5, y: 0.5 }}
					style={{ opacity: this.state.markerBackgroundOpacity, zIndex: 50 }}
					coordinate={this.props.position}
				>
					<AnimatedIcon
						name='circle'
						color='#4F8EF7'
						style={{ fontSize: this.state.markerBackgroundSize, zIndex: 50 }} />
				</AnimatedMapMarker>
				<MapView.Marker anchor={{ x: 0.5, y: 0.5 }} coordinate={this.props.position} style={{ zIndex: 51 }}>
					<Icon name='circle' size={15} color='#4F8EF7' style={{ zIndex: 51 }} />
				</MapView.Marker>
				<MapView.Marker anchor={{ x: 0.5, y: 0.5 }} coordinate={this.props.position} style={{ zIndex: 52 }}>
					<Icon name='circle-o' size={15} color='white' style={{ zIndex: 52 }} />
				</MapView.Marker>
			</View>
		)
	}
}

// const styles = StyleSheet.create({})

AnimatedMarker.propTypes = {
	position: PropTypes.object,
}

export default AnimatedMarker
