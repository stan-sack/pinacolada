import React from 'react'
import PropTypes from 'prop-types'
import { Animated, View } from 'react-native'
// import { GooglePlacesAutocomplete } from '../../lib/GooglePlacesAutocomplete/GooglePlacesAutocomplete'
// import Icon from 'react-native-vector-icons/EvilIcons'
import Svg, { Path } from 'react-native-svg'
import transformUtil from '../../helpers/transformUtil'

class SnowIcon extends React.Component {
	constructor(props) {
		super(props)
		this.handleBaseLayout = this.handleBaseLayout.bind(this)
		this.state = {
			flakeOneTimer: new Animated.Value(0),
			flakeTwoTimer: new Animated.Value(0),
			flakeThreeTimer: new Animated.Value(0),
		}

		this.state.flakeOneRotation = this.state.flakeOneTimer.interpolate({
			inputRange: [0, 1, 2, 4],
			outputRange: [0, -30, 30, -30]
		})

		this.state.flakeOneY = this.state.flakeOneTimer.interpolate({
			inputRange: [0, 1, 2, 4, 5],
			outputRange: [-4, -0.8, 3, 7, -4]
		})

		this.state.flakeOneX = this.state.flakeOneTimer.interpolate({
			inputRange: [1, 2, 4],
			outputRange: [2, -2, 2]
		})

		this.flakeOneAnimationLength = 4000
		this.flakeTwoAnimationLength = 3800
		this.flakeThreeAnimationLength = 3900

		this.flakeOneStages = []
		this.flakeOneStages.push(Animated.timing(
			this.state.flakeOneTimer,
			{
				toValue: 1,
				duration: this.flakeOneAnimationLength * 0.2,
			},
		))

		this.flakeOneStages.push(Animated.timing(
			this.state.flakeOneTimer,
			{
				toValue: 2,
				duration: this.flakeOneAnimationLength * 0.2,
			},
		))

		this.flakeOneStages.push(Animated.timing(
			this.state.flakeOneTimer,
			{
				toValue: 3,
				duration: this.flakeOneAnimationLength * 0.1,
			},
		))

		this.flakeOneStages.push(Animated.timing(
			this.state.flakeOneTimer,
			{
				toValue: 4,
				duration: this.flakeOneAnimationLength * 0.1,
			},
		))

		this.flakeOneStages.push(Animated.timing(
			this.state.flakeOneTimer,
			{
				toValue: 5,
				duration: this.flakeOneAnimationLength * 0.4,
			},
		))

		this.flakeTwoStages = []
		this.flakeTwoStages.push(Animated.timing(
			this.state.flakeTwoTimer,
			{
				toValue: 1,
				duration: this.flakeTwoAnimationLength * 0.2,
			},
		))

		this.flakeTwoStages.push(Animated.timing(
			this.state.flakeTwoTimer,
			{
				toValue: 2,
				duration: this.flakeTwoAnimationLength * 0.2,
			},
		))

		this.flakeTwoStages.push(Animated.timing(
			this.state.flakeTwoTimer,
			{
				toValue: 3,
				duration: this.flakeTwoAnimationLength * 0.1,
			},
		))

		this.flakeTwoStages.push(Animated.timing(
			this.state.flakeTwoTimer,
			{
				toValue: 4,
				duration: this.flakeTwoAnimationLength * 0.1,
			},
		))

		this.flakeTwoStages.push(Animated.timing(
			this.state.flakeTwoTimer,
			{
				toValue: 5,
				duration: this.flakeTwoAnimationLength * 0.4,
			},
		))

		this.flakeThreeStages = []
		this.flakeThreeStages.push(Animated.timing(
			this.state.flakeThreeTimer,
			{
				toValue: 1,
				duration: this.flakeThreeAnimationLength * 0.2,
			},
		))

		this.flakeThreeStages.push(Animated.timing(
			this.state.flakeThreeTimer,
			{
				toValue: 2,
				duration: this.flakeThreeAnimationLength * 0.2,
			},
		))

		this.flakeThreeStages.push(Animated.timing(
			this.state.flakeThreeTimer,
			{
				toValue: 3,
				duration: this.flakeThreeAnimationLength * 0.1,
			},
		))

		this.flakeThreeStages.push(Animated.timing(
			this.state.flakeThreeTimer,
			{
				toValue: 4,
				duration: this.flakeThreeAnimationLength * 0.1,
			},
		))

		this.flakeThreeStages.push(Animated.timing(
			this.state.flakeThreeTimer,
			{
				toValue: 5,
				duration: this.flakeThreeAnimationLength * 0.4,
			},
		))
	}


	componentDidMount() {
		this.state.flakeOneTimer.addListener(({ value }) => {
			this.flushTransformOne(
				this.flakeOneRef, this.state.flakeOneX, this.state.flakeOneY, this.state.flakeOneRotation
			)
		})
		// this.state.flakeTwoTimer.addListener(({ value }) => {
		// 	this.flushTransform(this.flakeTwoRef, value)
		// })
		// this.state.flakeThreeTimer.addListener(({ value }) => {
		// 	this.flushTransform(this.flakeThreeRef, value)
		// })
		this.runflakeOne()
		// setTimeout(() => { this.runflakeTwo() }, 2500)
		// setTimeout(() => { this.runflakeThree() }, 1500)
	}

	runflakeOne() {
		this.state.flakeOneTimer.setValue(0)
		Animated.sequence(this.flakeOneStages).start(
			() => { this.runflakeOne() }
		)
	}

	runflakeTwo() {
		this.state.flakeTwoTimer.setValue(0)
		Animated.sequence(this.flakeTwoStages).start(
			() => { this.runflakeTwo() }
		)
	}

	runflakeThree() {
		this.state.flakeThreeTimer.setValue(0)
		Animated.sequence(this.flakeThreeStages).start(
			() => { this.runflakeThree() }
		)
	}

	handleBaseLayout(e) {

		const layout = e.nativeEvent.layout


		this.setState({
			centreX: layout.height / 2,
			centreY: layout.height / 2,
		})

		console.log(this.state)
	}

	flushTransformOne(ref, x, y, rotation) {
		// let rotation = timer.__getValue().interpolate({
		// 	inputRange: [0, 1, 2, 4],
		// 	outputRange: [0, -30, 30, -30]
		// })
		//
		// let y = timer.interpolate({
		// 	inputRange: [0, 1, 2, 4, 5],
		// 	outputRange: [-4, -0.8, 3, 7, -4]
		// })
		//
		// let x = timer.interpolate({
		// 	inputRange: [1, 2, 4],
		// 	outputRange: [2, -2, 2]
		// })
		//
		if (!this.state.centreX) {
			return
		}

		let matrix = transformUtil.rotateZ(rotation.__getValue())
		// let matrix = transformUtil.rotateZ(0, 0, 0, -9, -36)
		// let xVal = x.__getValue() + 50
		// let yVal = y.__getValue() + 50
		console.log(this.state.centreX, this.state.centreY)
		transformUtil.origin(matrix, { x: -(16/25.5) * this.state.centreX, y: (11/25.5) * this.state.centreY, z: 0 })
		console.log(matrix)
		//
		ref.setNativeProps({
			style: {
				transform: [
					{
						matrix,
					},
				],
			},
		})
	}

	render() {
		return (
			<View style={{ height: this.props.size, width: this.props.size, borderWidth: 0.5, borderColor: 'purple' }}>
				<View style={{ position: 'absolute' }}>
					<Svg viewBox={'0 0 512 512'} height={this.props.size} width={this.props.size}>
						<Path
							d={
								'M512,176c0-61.8-50.2-112-112-112c-5.3,0-10.6,0.4-15.8,\
								1.1C354.3,24.4,307.2,0,256,0s-98.3,24.4-128.2,\
								65.1c-5.2-0.8-10.5-1.1-15.8-1.1C50.2,64,0,114.2,0,176s50.2,\
								112,112,112c13.7,0,27.1-2.5,39.7-7.3c29,25.2,65.8,39.3,104.3,\
								39.3c38.5,0,75.3-14.1,104.3-39.3c12.6,4.8,26,7.3,39.7,7.3C461.8,\
								288,512,237.8,512,176z M354.1,241.3C330.6,269.6,295.6,288,\
								256,288c-39.6,0-74.6-18.4-98.1-46.7c-13,9.2-28.8,14.7-45.9,\
								14.7c-44.2,0-80-35.8-80-80s35.8-80,80-80c10.8,0,21.1,2.2,\
								30.4,6.1C163.7,60.7,206.3,32,256,32s92.3,28.7,113.5,70.1c9.4-3.9,\
								19.7-6.1,30.5-6.1c44.2,0,80,35.8,80,80s-35.8,80-80,\
								80C382.9,256,367.1,250.5,354.1,241.3z'
							}
							/>
					</Svg>
				</View>
				<Animated.View
					onLayout={this.handleBaseLayout}
					ref={(ref) => { this.flakeOneRef = ref }}
					style={{
						borderWidth: 0.5,
						borderColor: 'cyan',
						position: 'absolute',
						opacity: this.state.flakeOneTimer.interpolate({
							inputRange:  [0, 1, 3, 4, 5],
							outputRange: [0, 1, 1, 0, 0],
						}),
						// transform: {
						// 	matrix: this.matrix
						// }
					}}>
					<Svg viewBox={'0 0 512 512'} height={this.props.size} width={this.props.size}>
						<Path
							d={
								'M131.8,349.9c-1.5-5.6-7.3-8.9-12.9-7.4l-11.9,3.2c-1.1-1.5-2.2-3-3.6-4.4c-1.4-1.4-2.9-2.6-4.5-3.6l3.2-11.9c1.5-5.6-1.8-11.4-7.4-12.9c-5.6-1.5-11.4,1.8-12.9,7.4l-3.2,12.1c-3.8,0.3-7.5,1.2-10.9,2.9l-8.8-8.8c-4.1-4.1-10.8-4.1-14.8,0c-4.1,4.1-4.1,10.8,0,14.9l8.8,8.8c-1.6,3.5-2.6,7.2-2.9,11l-12,3.2c-5.6,1.5-9,7.2-7.5,12.9c1.5,5.6,7.3,8.9,12.9,7.4l11.9-3.2c1.1,1.6,2.2,3.1,3.7,4.5c1.4,1.4,2.9,2.6,4.4,3.6l-3.2,11.9c-1.5,5.6,1.8,11.4,7.4,12.9c5.6,1.5,11.3-1.8,12.8-7.4l3.2-12c3.8-0.3,7.5-1.3,11-2.9l8.8,8.8c4.1,4.1,10.7,4,14.8,0c4.1-4.1,4.1-10.7,0-14.8l-8.8-8.8c1.7-3.5,2.7-7.2,2.9-11l12.1-3.2C130,361.3,133.3,355.6,131.8,349.9z M88.6,371c-4.1,4.1-10.8,4.1-14.9,0c-4.1-4.1-4.1-10.8,0-14.8c4.1-4.1,10.8-4.1,14.9,0S92.6,366.9,88.6,371z'
							}
							/>
					</Svg>
				</Animated.View>

			</View>
		)
	}
}

SnowIcon.propTypes = {
	size: PropTypes.number.isRequired
}

const SnowIconAnimated = Animated.createAnimatedComponent(SnowIcon)

export default SnowIconAnimated
