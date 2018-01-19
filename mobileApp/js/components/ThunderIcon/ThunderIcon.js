import React from 'react'
import PropTypes from 'prop-types'
import { Animated, View } from 'react-native'
// import { GooglePlacesAutocomplete } from '../../lib/GooglePlacesAutocomplete/GooglePlacesAutocomplete'
// import Icon from 'react-native-vector-icons/EvilIcons'
import Svg, { Path, Polygon } from 'react-native-svg'

class ThunderIcon extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			timer: new Animated.Value(0),
		}
		this.animationLength = 2000 / props.speed
		this.stages = []
		this.stages.push(Animated.timing(
			this.state.timer,
			{
				toValue: 1,
				duration: this.animationLength * 0.05,
				useNativeDriver: true,
			},
		))

		this.stages.push(Animated.timing(
			this.state.timer,
			{
				toValue: 2,
				duration: this.animationLength * 0.1,
				useNativeDriver: true,
			},
		))

		this.stages.push(Animated.timing(
			this.state.timer,
			{
				toValue: 3,
				duration: this.animationLength * 0.05,
				useNativeDriver: true,
			},
		))

		this.stages.push(Animated.timing(
			this.state.timer,
			{
				toValue: 4,
				duration: this.animationLength * 0.05,
				useNativeDriver: true,
			},
		))

		this.stages.push(Animated.timing(
			this.state.timer,
			{
				toValue: 5,
				duration: this.animationLength * 0.25,
				useNativeDriver: true,
			},
		))

		this.stages.push(Animated.timing(
			this.state.timer,
			{
				toValue: 6,
				duration: this.animationLength * 0.3,
				useNativeDriver: true,
			},
		))

		this.stages.push(Animated.timing(
			this.state.timer,
			{
				toValue: 7,
				duration: this.animationLength * 0.2,
				useNativeDriver: true,
			},
		))
	}


	componentDidMount() {
		this.continueAnimation = true
		this.runAnimation()
	}

	componentWillUnmount() {
		this.continueAnimation = false
	}

	runAnimation() {
		this.state.timer.setValue(0)
		Animated.sequence(this.stages).start(
			() => { this.continueAnimation && this.runAnimation() }
		)
	}

	render() {
		return (
			<View style={{ height: this.props.size, width: this.props.size }}>
				<View style={{ position: 'absolute' }}>
					<Svg viewBox={'0 0 512 512'} height={this.props.size} width={this.props.size}>
						<Path
							fill={this.props.colour}
							d={
								'M400,64c-5.3,0-10.6,0.4-15.8,1.1C354.3,24.4,307.2,0,256,\
								0s-98.3,24.4-128.2,65.1c-5.2-0.8-10.5-1.1-15.8-1.1C50.2,64,\
								0,114.2,0,176s50.2,112,112,112c13.7,0,27.1-2.5,39.7-7.3c12.3,\
								10.7,26.2,19,40.9,25.4l24.9-24.9c-23.5-7.6-44.2-21.3-59.6-39.9c-13,\
								9.2-28.8,14.7-45.9,14.7c-44.2,0-80-35.8-80-80s35.8-80,80-80c10.8,0,21.1,2.2,30.4,6.1\
								C163.7,60.7,206.3,32,256,32s92.3,28.7,113.5,70.1c9.4-3.9,19.7-6.1,\
								30.5-6.1c44.2,0,80,35.8,80,80s-35.8,80-80,80c-17.1,0-32.9-5.5-45.9-14.7c-10.4,\
								12.5-23.3,22.7-37.6,30.6L303,312.2c20.9-6.6,40.5-16.9,57.3-31.6c12.6,4.8,26,7.3,\
								39.7,7.3c61.8,0,112-50.2,112-112S461.8,64,400,64z'} />
					</Svg>
				</View>
				<Animated.View
					renderToHardwareTextureAndroid
					shouldRasterizeIOS
					style={{
						position: 'absolute',
						opacity: this.state.timer.interpolate({
							inputRange:  [0, 1, 2, 3, 4, 5, 6, 7],
							outputRange: [0, 1, 0, 0, 1, 1, 0, 0],
						}),
						transform:[
							{
								translateX: this.state.timer.interpolate({
									inputRange:  [0, 5, 6, 7],
									outputRange: [2 / 50 * this.props.size, -0.25 / 50 * this.props.size, -0.25 / 50 *
									this.props.size, 2 / 50 * this.props.size],
								})
							},
							{
								translateY: this.state.timer.interpolate({
									inputRange:  [0, 5, 6, 7],
									outputRange: [-4 / 50 * this.props.size, 0.25 / 50 * this.props.size, 0.25 / 50 *
									this.props.size, -4 / 50 * this.props.size],
								})
							},
							{
								scaleY: 0.95,
							},
							{
								scaleX: 1.1,
							}
						]
					}}>
					<Svg viewBox={'0 0 512 512'} height={this.props.size} width={this.props.size}>
						<Polygon
							fill={this.props.colour}
							class={'bolt'}
							points={'192,352 224,384 192,480 288,384 256,352 288,256 '} />
					</Svg>
				</Animated.View>
			</View>
		)
	}
}

ThunderIcon.propTypes = {
	size: PropTypes.number,
	speed: PropTypes.number,
	colour: PropTypes.string
}

ThunderIcon.defaultProps = {
	size: 50,
	speed: 1,
	colour: 'black'
}

const ThunderIconAnimated = Animated.createAnimatedComponent(ThunderIcon)

export default ThunderIconAnimated
