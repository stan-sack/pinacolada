import React from 'react'
import PropTypes from 'prop-types'
import { Animated, View, Easing } from 'react-native'
// import { GooglePlacesAutocomplete } from '../../lib/GooglePlacesAutocomplete/GooglePlacesAutocomplete'
// import Icon from 'react-native-vector-icons/EvilIcons'
import Svg, { Path } from 'react-native-svg'

class SunCloudIcon extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			growTimer: new Animated.Value(0),
			rayTimer: new Animated.Value(0),
			// dropTwoTimer: new Animated.Value(0),
			// dropThreeTimer: new Animated.Value(0),
		}
        //
		this.animationLength = 4000 / props.speed
		// this.dropTwoAnimationLength = 1900 / props.speed
		// this.dropThreeAnimationLength = 1800 / props.speed
        //
		this.animation = Animated.parallel([
			Animated.timing(
				this.state.growTimer,
				{
					toValue: 1,
					duration: this.animationLength,
					useNativeDriver: true,
					// easing: Easing.bezier(0.2, 0.85, 0.4, 1.5)
				},
			),
			Animated.timing(
				this.state.rayTimer,
				{
					toValue: 1,
					duration: this.animationLength,
					useNativeDriver: true,
				},
			)
		])
        //
		// this.dropOneStages.push(Animated.timing(
		// 	this.state.dropOneTimer,
		// 	{
		// 		toValue: 2,
		// 		duration: this.dropOneAnimationLength * 0.2,
		// 		useNativeDriver: true,
		// 	},
		// ))
        //
		// this.dropOneStages.push(Animated.timing(
		// 	this.state.dropOneTimer,
		// 	{
		// 		toValue: 3,
		// 		duration: this.dropOneAnimationLength * 0.3,
		// 		useNativeDriver: true,
		// 	},
		// ))
        //
		// this.dropOneStages.push(Animated.timing(
		// 	this.state.dropOneTimer,
		// 	{
		// 		toValue: 4,
		// 		duration: this.dropOneAnimationLength * 0.4,
		// 		useNativeDriver: true,
		// 	},
		// ))
        //
		// this.dropTwoStages = []
		// this.dropTwoStages.push(Animated.timing(
		// 	this.state.dropTwoTimer,
		// 	{
		// 		toValue: 1,
		// 		duration: this.dropTwoAnimationLength * 0.1,
		// 		useNativeDriver: true,
		// 	},
		// ))
        //
		// this.dropTwoStages.push(Animated.timing(
		// 	this.state.dropTwoTimer,
		// 	{
		// 		toValue: 2,
		// 		duration: this.dropTwoAnimationLength * 0.2,
		// 		useNativeDriver: true,
		// 	},
		// ))
        //
		// this.dropTwoStages.push(Animated.timing(
		// 	this.state.dropTwoTimer,
		// 	{
		// 		toValue: 3,
		// 		duration: this.dropTwoAnimationLength * 0.3,
		// 		useNativeDriver: true,
		// 	},
		// ))
        //
		// this.dropTwoStages.push(Animated.timing(
		// 	this.state.dropTwoTimer,
		// 	{
		// 		toValue: 4,
		// 		duration: this.dropTwoAnimationLength * 0.4,
		// 		useNativeDriver: true,
		// 	},
		// ))
        //
		// this.dropThreeStages = []
		// this.dropThreeStages.push(Animated.timing(
		// 	this.state.dropThreeTimer,
		// 	{
		// 		toValue: 1,
		// 		duration: this.dropThreeAnimationLength * 0.1,
		// 		useNativeDriver: true,
		// 	},
		// ))
        //
		// this.dropThreeStages.push(Animated.timing(
		// 	this.state.dropThreeTimer,
		// 	{
		// 		toValue: 2,
		// 		duration: this.dropThreeAnimationLength * 0.2,
		// 		useNativeDriver: true,
		// 	},
		// ))
        //
		// this.dropThreeStages.push(Animated.timing(
		// 	this.state.dropThreeTimer,
		// 	{
		// 		toValue: 3,
		// 		duration: this.dropThreeAnimationLength * 0.3,
		// 		useNativeDriver: true,
		// 	},
		// ))
        //
		// this.dropThreeStages.push(Animated.timing(
		// 	this.state.dropThreeTimer,
		// 	{
		// 		toValue: 4,
		// 		duration: this.dropThreeAnimationLength * 0.4,
		// 		useNativeDriver: true,
		// 	},
		// ))
	}


	componentDidMount() {
		this.continueAnimation = true
		this.runAnimation()
		// setTimeout(() => { this.runDropTwo() }, 800)
		// setTimeout(() => { this.runDropThree() }, 500)
	}

	componentWillUnmount() {
		this.continueAnimation = false
	}

	runAnimation() {
		this.state.growTimer.setValue(0)
		this.state.rayTimer.setValue(0)
		this.animation.start(
			() => { this.continueAnimation && this.runAnimation() }
		)
	}
    //
	// runDropTwo() {
	// 	this.state.dropTwoTimer.setValue(0)
	// 	Animated.sequence(this.dropTwoStages).start(
	// 		() => { this.continueAnimation && this.runDropTwo() }
	// 	)
	// }
    //
	// runDropThree() {
	// 	this.state.dropThreeTimer.setValue(0)
	// 	Animated.sequence(this.dropThreeStages).start(
	// 		() => { this.continueAnimation && this.runDropThree() }
	// 	)
	// }

	render() {
		return (
			<View style={{ height: this.props.size, width: this.props.size }}>
				<View style={{ position: 'absolute' }}>
					<Svg viewBox={'0 0 512 512'} height={this.props.size} width={this.props.size}>
						<Path
							d={
								'M400,256c-5.3,0-10.6,0.4-15.8,1.1c-16.8-22.8-39-40.5-64.2-51.7c-10.5-4.6-21.5-8.1-32.9-10.4c-10.1-2-20.5-3.1-31.1-3.1c-45.8,0-88.4,19.6-118.2,52.9c-3.5,3.9-6.9,8-10,12.3c-5.2-0.8-10.5-1.1-15.8-1.1c-1.5,0-3,0-4.4,0.1C47.9,258.4,0,307.7,0,368c0,61.8,50.2,112,112,112c13.7,0,27.1-2.5,39.7-7.3c29,25.2,65.8,39.3,104.3,39.3c38.5,0,75.3-14.1,104.3-39.3c12.6,4.8,26,7.3,39.7,7.3c61.8,0,112-50.2,112-112S461.8,256,400,256z M400,448c-17.1,0-32.9-5.5-45.9-14.7C330.6,461.6,295.6,480,256,480c-39.6,0-74.6-18.4-98.1-46.7c-13,9.2-28.8,14.7-45.9,14.7c-44.2,0-80-35.8-80-80s35.8-80,80-80c7.8,0,15.4,1.2,22.5,3.3c2.7,0.8,5.4,1.7,8,2.8c4.5-8.7,9.9-16.9,16.2-24.4C182,241.9,216.8,224,256,224c10.1,0,20,1.2,29.4,3.5c10.6,2.5,20.7,6.4,30.1,11.4c23.2,12.4,42.1,31.8,54.1,55.2c9.4-3.9,19.7-6.1,30.5-6.1c44.2,0,80,35.8,80,80S444.2,448,400,448z'
							}
						/>
					</Svg>
				</View>
				<Animated.View
					renderToHardwareTextureAndroid
					shouldRasterizeIOS
					style={{
						position: 'absolute',
						opacity: this.state.growTimer.interpolate({
							inputRange:  [0, 0.15, 0.8, 0.9, 1],
							outputRange: [0, 1, 1, 0, 0],
						}),
						transform:[
							{
								scale: this.state.growTimer.interpolate({
									inputRange:  [0, 0.15, 0.8, 0.9, 1],
									outputRange: [0.5, 1, 1, 0.5, 0.5],
								})
							}
						]
					}}>
					<Svg viewBox={'0 0 512 512'} height={this.props.size} width={this.props.size}>
						<Path
							d={'M127.8,259.1c3.1-4.3,6.5-8.4,10-12.3c-6-11.2-9.4-24-9.4-37.7c0-44.1,35.7-79.8,79.8-79.8c40,0,73.1,29.4,78.9,67.7c11.4,2.3,22.4,5.7,32.9,10.4c-0.4-29.2-12-56.6-32.7-77.3C266.1,109,238,97.4,208.2,97.4c-29.9,0-57.9,11.6-79.1,32.8c-21.1,21.1-32.8,49.2-32.8,79.1c0,17.2,3.9,33.9,11.2,48.9c1.5-0.1,3-0.1,4.4-0.1C117.3,258,122.6,258.4,127.8,259.1z'} />
					</Svg>
				</Animated.View>
				<Animated.View
					renderToHardwareTextureAndroid
					shouldRasterizeIOS
					style={{
						position: 'absolute',
						opacity: this.state.rayTimer.interpolate({
							inputRange:  [0, 0.15, 0.2, 0.7, 0.8, 1],
							outputRange: [0, 0, 1, 1, 0, 0],
						}),
						transform:[
							{
								scale: this.state.rayTimer.interpolate({
									inputRange:  [0, 0.15, 0.2, 0.7, 0.8, 1],
									outputRange: [0.5, 0.5, 1, 1, 0.5, 0.5],
								})
							}
						]
					}}>
					<Svg viewBox={'0 0 512 512'} height={this.props.size} width={this.props.size}>
						<Path
							d={'M16,224h32c8.8,0,16-7.2,16-16s-7.2-16-16-16H16c-8.8,0-16,7.2-16,16S7.2,224,16,224z'} />
					</Svg>
				</Animated.View>
				<Animated.View
					renderToHardwareTextureAndroid
					shouldRasterizeIOS
					style={{
						position: 'absolute',
						opacity: this.state.rayTimer.interpolate({
							inputRange:  [0, 0.2, 0.25, 0.7, 0.8, 1],
							outputRange: [0, 0, 1, 1, 0, 0],
						}),
						transform:[
							{
								scale: this.state.rayTimer.interpolate({
									inputRange:  [0, 0.2, 0.25, 0.7, 0.8, 1],
									outputRange: [0.5, 0.5, 1, 1, 0.5, 0.5],
								})
							}
						]
					}}>
					<Svg viewBox={'0 0 512 512'} height={this.props.size} width={this.props.size}>
						<Path
							d={'M83.5,106.2c6.3,6.2,16.4,6.2,22.6,0c6.3-6.2,6.3-16.4,0-22.6L83.5,60.9c-6.2-6.2-16.4-6.2-22.6,0c-6.2,6.2-6.2,16.4,0,22.6L83.5,106.2z'} />
					</Svg>
				</Animated.View>
				<Animated.View
					renderToHardwareTextureAndroid
					shouldRasterizeIOS
					style={{
						position: 'absolute',
						opacity: this.state.rayTimer.interpolate({
							inputRange:  [0, 0.25, 0.3, 0.7, 0.8, 1],
							outputRange: [0, 0, 1, 1, 0, 0],
						}),
						transform:[
							{
								scale: this.state.rayTimer.interpolate({
									inputRange:  [0, 0.25, 0.3, 0.7, 0.8, 1],
									outputRange: [0.5, 0.5, 1, 1, 0.5, 0.5],
								})
							}
						]
					}}>
					<Svg viewBox={'0 0 512 512'} height={this.props.size} width={this.props.size}>
						<Path
							d={'M208,64c8.8,0,16-7.2,16-16V16c0-8.8-7.2-16-16-16s-16,7.2-16,16v32C192,56.8,199.2,64,208,64z'} />
					</Svg>
				</Animated.View>
				<Animated.View
					renderToHardwareTextureAndroid
					shouldRasterizeIOS
					style={{
						position: 'absolute',
						opacity: this.state.rayTimer.interpolate({
							inputRange:  [0, 0.3, 0.35, 0.7, 0.8, 1],
							outputRange: [0, 0, 1, 1, 0, 0],
						}),
						transform:[
							{
								scale: this.state.rayTimer.interpolate({
									inputRange:  [0, 0.3, 0.35, 0.7, 0.8, 1],
									outputRange: [0.5, 0.5, 1, 1, 0.5, 0.5],
								})
							}
						]
					}}>
					<Svg viewBox={'0 0 512 512'} height={this.props.size} width={this.props.size}>
						<Path
							d={'M332.4,106.2l22.6-22.6c6.2-6.2,6.2-16.4,0-22.6c-6.2-6.2-16.4-6.2-22.6,0l-22.6,22.6c-6.2,6.2-6.2,16.4,0,22.6S326.2,112.4,332.4,106.2z'} />
					</Svg>
				</Animated.View>
				<Animated.View
					renderToHardwareTextureAndroid
					shouldRasterizeIOS
					style={{
						position: 'absolute',
						opacity: this.state.rayTimer.interpolate({
							inputRange:  [0, 0.35, 0.4, 0.7, 0.8, 1],
							outputRange: [0, 0, 1, 1, 0, 0],
						}),
						transform:[
							{
								scale: this.state.rayTimer.interpolate({
									inputRange:  [0, 0.35, 0.4, 0.7, 0.8, 1],
									outputRange: [0.5, 0.5, 1, 1, 0.5, 0.5],
								})
							}
						]
					}}>
					<Svg viewBox={'0 0 512 512'} height={this.props.size} width={this.props.size}>
						<Path
							d={'M352,208c0,8.8,7.2,16,16,16h32c8.8,0,16-7.2,16-16s-7.2-16-16-16h-32C359.2,192,352,199.2,352,208z'} />
					</Svg>
				</Animated.View>

			</View>
		)
	}
}

SunCloudIcon.propTypes = {
	size: PropTypes.number.isRequired,
	speed: PropTypes.number.isRequired
}

const SunCloudIconAnimated = Animated.createAnimatedComponent(SunCloudIcon)

export default SunCloudIconAnimated
