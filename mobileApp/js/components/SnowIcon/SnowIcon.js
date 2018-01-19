import React from 'react'
import PropTypes from 'prop-types'
import { Animated, View } from 'react-native'
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
			outputRange: [-4 / 50 * props.size, -0.8 / 50 * props.size, 3 / 50 * props.size, 7 / 50 *
			props.size, -4 / 50 * props.size]
		})

		this.state.flakeOneX = this.state.flakeOneTimer.interpolate({
			inputRange: [0, 1, 2, 4],
			outputRange: [0, 2 / 50 * props.size, -2 / 50 * props.size, 2 / 50 * props.size]
		})

		this.state.flakeTwoRotation = this.state.flakeTwoTimer.interpolate({
			inputRange: [0, 1, 2, 4],
			outputRange: [0, -30, 30, -30]
		})

		this.state.flakeTwoY = this.state.flakeTwoTimer.interpolate({
			inputRange: [0, 1, 2, 4, 5],
			outputRange: [-8 / 50 * props.size, -5 / 50 * props.size, 0, 2 / 50 * props.size, -8 / 50 * props.size]
		})

		this.state.flakeTwoX = this.state.flakeTwoTimer.interpolate({
			inputRange: [0, 1, 2, 4],
			outputRange: [0, 2.5 / 50 * props.size, -2.5 / 50 * props.size, 2.5 / 50 * props.size]
		})

		this.state.flakeThreeRotation = this.state.flakeThreeTimer.interpolate({
			inputRange: [0, 1, 2, 4],
			outputRange: [0, -30, 30, -30]
		})

		this.state.flakeThreeY = this.state.flakeThreeTimer.interpolate({
			inputRange: [0, 1, 2, 4, 5],
			outputRange: [-10 / 50 * props.size, -5 / 50 * props.size, -2 / 50 * props.size, 2 / 50 *
			props.size, -10 / 50 * props.size]
		})

		this.state.flakeThreeX = this.state.flakeThreeTimer.interpolate({
			inputRange: [0, 1, 2, 4],
			outputRange: [0, -2 / 50 * props.size, 2 / 50 * props.size, -2 / 50 * props.size]
		})

		this.flakeOneAnimationLength = 4000 / props.speed
		this.flakeTwoAnimationLength = 3800 / props.speed
		this.flakeThreeAnimationLength = 3900 / props.speed

		this.flakeOneStages = []
		this.flakeOneStages.push(Animated.timing(
			this.state.flakeOneTimer,
			{
				toValue: 1,
				duration: this.flakeOneAnimationLength * 0.2,
				useNativeDriver: true,
			},
		))

		this.flakeOneStages.push(Animated.timing(
			this.state.flakeOneTimer,
			{
				toValue: 2,
				duration: this.flakeOneAnimationLength * 0.2,
				useNativeDriver: true,
			},
		))

		this.flakeOneStages.push(Animated.timing(
			this.state.flakeOneTimer,
			{
				toValue: 3,
				duration: this.flakeOneAnimationLength * 0.1,
				useNativeDriver: true,
			},
		))

		this.flakeOneStages.push(Animated.timing(
			this.state.flakeOneTimer,
			{
				toValue: 4,
				duration: this.flakeOneAnimationLength * 0.1,
				useNativeDriver: true,
			},
		))

		this.flakeOneStages.push(Animated.timing(
			this.state.flakeOneTimer,
			{
				toValue: 5,
				duration: this.flakeOneAnimationLength * 0.4,
				useNativeDriver: true,
			},
		))

		this.flakeTwoStages = []
		this.flakeTwoStages.push(Animated.timing(
			this.state.flakeTwoTimer,
			{
				toValue: 1,
				duration: this.flakeTwoAnimationLength * 0.2,
				useNativeDriver: true,
			},
		))

		this.flakeTwoStages.push(Animated.timing(
			this.state.flakeTwoTimer,
			{
				toValue: 2,
				duration: this.flakeTwoAnimationLength * 0.2,
				useNativeDriver: true,
			},
		))

		this.flakeTwoStages.push(Animated.timing(
			this.state.flakeTwoTimer,
			{
				toValue: 3,
				duration: this.flakeTwoAnimationLength * 0.1,
				useNativeDriver: true,
			},
		))

		this.flakeTwoStages.push(Animated.timing(
			this.state.flakeTwoTimer,
			{
				toValue: 4,
				duration: this.flakeTwoAnimationLength * 0.1,
				useNativeDriver: true,
			},
		))

		this.flakeTwoStages.push(Animated.timing(
			this.state.flakeTwoTimer,
			{
				toValue: 5,
				duration: this.flakeTwoAnimationLength * 0.4,
				useNativeDriver: true,
			},
		))

		this.flakeThreeStages = []
		this.flakeThreeStages.push(Animated.timing(
			this.state.flakeThreeTimer,
			{
				toValue: 1,
				duration: this.flakeThreeAnimationLength * 0.2,
				useNativeDriver: true,
			},
		))

		this.flakeThreeStages.push(Animated.timing(
			this.state.flakeThreeTimer,
			{
				toValue: 2,
				duration: this.flakeThreeAnimationLength * 0.2,
				useNativeDriver: true,
			},
		))

		this.flakeThreeStages.push(Animated.timing(
			this.state.flakeThreeTimer,
			{
				toValue: 3,
				duration: this.flakeThreeAnimationLength * 0.1,
				useNativeDriver: true,
			},
		))

		this.flakeThreeStages.push(Animated.timing(
			this.state.flakeThreeTimer,
			{
				toValue: 4,
				duration: this.flakeThreeAnimationLength * 0.1,
				useNativeDriver: true,
			},
		))

		this.flakeThreeStages.push(Animated.timing(
			this.state.flakeThreeTimer,
			{
				toValue: 5,
				duration: this.flakeThreeAnimationLength * 0.4,
				useNativeDriver: true,
			},
		))
	}


	componentDidMount() {
		this.state.flakeOneTimer.addListener(({ value }) => {
			this.flushTransformOne(
				this.flakeOneRef, this.state.flakeOneX, this.state.flakeOneY, this.state.flakeOneRotation
			)
		})

		this.state.flakeTwoTimer.addListener(({ value }) => {
			this.flushTransformTwo(
				this.flakeTwoRef, this.state.flakeTwoX, this.state.flakeTwoY, this.state.flakeTwoRotation
			)
		})

		this.state.flakeThreeTimer.addListener(({ value }) => {
			this.flushTransformThree(
				this.flakeThreeRef, this.state.flakeThreeX, this.state.flakeThreeY, this.state.flakeThreeRotation
			)
		})

		this.continueAnimating = true

		this.runflakeOne()
		setTimeout(() => { this.runflakeTwo() }, 2500)
		setTimeout(() => { this.runflakeThree() }, 1500)
	}

	componentWillUnmount() {
		this.continueAnimating = false
		this.state.flakeOneTimer.removeAllListeners()
		this.state.flakeTwoTimer.removeAllListeners()
		this.state.flakeThreeTimer.removeAllListeners()
	}

	runflakeOne() {
		this.state.flakeOneTimer.setValue(0)
		Animated.sequence(this.flakeOneStages).start(
			() => { this.continueAnimating && this.runflakeOne() }
		)
	}

	runflakeTwo() {
		this.state.flakeTwoTimer.setValue(0)
		Animated.sequence(this.flakeTwoStages).start(
			() => { this.continueAnimating && this.runflakeTwo() }
		)
	}

	runflakeThree() {
		this.state.flakeThreeTimer.setValue(0)
		Animated.sequence(this.flakeThreeStages).start(
			() => { this.continueAnimating && this.runflakeThree() }
		)
	}

	handleBaseLayout(e) {
		const layout = e.nativeEvent.layout


		this.setState({
			centreX: layout.height / 2,
			centreY: layout.height / 2,
		})
	}

	flushTransformOne(ref, x, y, rotation) {
		if (!this.state.centreX) {
			return
		}

		let matrix = transformUtil.rotateZ(rotation.__getValue())
		// let matrix = transformUtil.rotateZ(0, 0, 0, -9, -36)

		transformUtil.transformMutateReturn(
			matrix, { x: -(16 / 25.5) * this.state.centreX, y: (11 / 25.5) * this.state.centreY, z: 0 }
		)

		let xVal = x.__getValue()
		let yVal = y.__getValue()

		transformUtil.transform(
			matrix, { x: xVal, y: yVal, z: 0 }
		)

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

	flushTransformTwo(ref, x, y, rotation) {
		if (!this.state.centreX) {
			return
		}

		let matrix = transformUtil.rotateZ(rotation.__getValue())
		// let matrix = transformUtil.rotateZ(0, 0, 0, -9, -36)

		transformUtil.transformMutateReturn(
			matrix, { x: -(0 / 25.5) * this.state.centreX, y: (16 / 25.5) * this.state.centreY, z: 0 }
		)

		let xVal = x.__getValue()
		let yVal = y.__getValue()

		transformUtil.transform(
			matrix, { x: xVal, y: yVal, z: 0 }
		)

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

	flushTransformThree(ref, x, y, rotation) {
		if (!this.state.centreX) {
			return
		}

		let matrix = transformUtil.rotateZ(rotation.__getValue())
		// let matrix = transformUtil.rotateZ(0, 0, 0, -9, -36)

		transformUtil.transformMutateReturn(
			matrix, { x: (17 / 25.5) * this.state.centreX, y: (13 / 25.5) * this.state.centreY, z: 0 }
		)

		let xVal = x.__getValue()
		let yVal = y.__getValue()

		transformUtil.transform(
			matrix, { x: xVal, y: yVal, z: 0 }
		)

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
			<View style={{ height: this.props.size, width: this.props.size }}>
				<View style={{ position: 'absolute' }}>
					<Svg
						viewBox={'0 0 512 512'}
						height={this.props.size}
						width={this.props.size}>
						<Path
							fill={this.props.colour}
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
					renderToHardwareTextureAndroid
					shouldRasterizeIOS
					onLayout={this.handleBaseLayout}
					ref={(ref) => { this.flakeOneRef = ref }}
					style={{
						position: 'absolute',
						opacity: this.state.flakeOneTimer.interpolate({
							inputRange:  [0, 1, 3, 4, 5],
							outputRange: [0, 1, 1, 0, 0],
						}),
					}}>
					<Svg
						viewBox={'0 0 512 512'}
						height={this.props.size}
						width={this.props.size}>
						<Path
							fill={this.props.colour}
							d={
								'M131.8,349.9c-1.5-5.6-7.3-8.9-12.9-7.4l-11.9,3.2c-1.1-1.5-2.2-3-3.6-4.4c-1.4-1.4-\
								2.9-2.6-4.5-3.6l3.2-11.9c1.5-5.6-1.8-11.4-7.4-12.9c-5.6-1.5-11.4,1.8-12.9,7.4l-3.2,\
								12.1c-3.8,0.3-7.5,1.2-10.9,2.9l-8.8-8.8c-4.1-4.1-10.8-4.1-14.8,0c-4.1,4.1-4.1,10.8,\
								0,14.9l8.8,8.8c-1.6,3.5-2.6,7.2-2.9,11l-12,3.2c-5.6,1.5-9,7.2-7.5,12.9c1.5,5.6,7.3,\
								8.9,12.9,7.4l11.9-3.2c1.1,1.6,2.2,3.1,3.7,4.5c1.4,1.4,2.9,2.6,4.4,3.6l-3.2,\
								11.9c-1.5,5.6,1.8,11.4,7.4,12.9c5.6,1.5,11.3-1.8,12.8-7.4l3.2-12c3.8-0.3,7.5-1.3,\
								11-2.9l8.8,8.8c4.1,4.1,10.7,4,14.8,0c4.1-4.1,4.1-10.7,0-14.8l-8.8-8.8c1.7-3.5,\
								2.7-7.2,2.9-11l12.1-3.2C130,361.3,133.3,355.6,131.8,349.9z M88.6,371c-4.1,4.1-10.8,\
								4.1-14.9,0c-4.1-4.1-4.1-10.8,0-14.8c4.1-4.1,10.8-4.1,14.9,0S92.6,366.9,88.6,371z'
							}
						/>
					</Svg>
				</Animated.View>
				<Animated.View
					renderToHardwareTextureAndroid
					shouldRasterizeIOS
					onLayout={this.handleBaseLayout}
					ref={(ref) => { this.flakeTwoRef = ref }}
					style={{
						position: 'absolute',
						opacity: this.state.flakeTwoTimer.interpolate({
							inputRange:  [0, 1, 3, 4, 5],
							outputRange: [0, 1, 1, 0, 0],
						}),
					}}>
					<Svg
						viewBox={'0 0 512 512'}
						height={this.props.size}
						width={this.props.size}>
						<Path
							fill={this.props.colour}
							d={
								'M304.8,437.6l-12.6-7.2c0.4-2.2,0.7-4.4,0.7-6.7c0-2.3-0.3-4.5-0.7-6.7l12.6-7.2c5.9-3.4,\
								7.9-11,4.5-16.8c-3.4-5.9-10.9-7.9-16.8-4.5l-12.7,7.3c-3.4-2.9-7.2-5.2-11.5-6.7v-\
								14.6c0-6.8-5.5-12.3-12.3-12.3s-12.3,5.5-12.3,12.3V389c-4.3,1.5-8.1,3.8-11.5,\
								6.7l-12.7-7.3c-5.9-3.4-13.5-1.4-16.9,4.5c-3.4,5.9-1.4,13.4,4.5,16.8l12.5,7.2c-0.4,\
								2.2-0.7,4.4-0.7,6.7c0,2.3,0.3,4.5,0.7,6.7l-12.5,7.2c-5.9,3.4-7.9,11-4.5,16.9s10.9,\
								7.9,16.8,4.5l12.7-7.3c3.4,2.9,7.2,5.1,11.5,6.7V473c0,6.8,5.5,12.3,12.3,12.3s12.3-5.5,\
								12.3-12.3v-14.6c4.3-1.5,8.2-3.8,11.5-6.7l12.7,7.3c5.9,3.4,13.4,1.4,16.8-4.5C312.8,\
								448.6,310.7,441.1,304.8,437.6z M256,436c-6.8,0-12.3-5.5-12.3-12.3c0-6.8,5.5-12.3,\
								12.3-12.3s12.3,5.5,12.3,12.3C268.3,430.5,262.8,436,256,436z'
							}
						/>
					</Svg>
				</Animated.View>
				<Animated.View
					renderToHardwareTextureAndroid
					shouldRasterizeIOS
					onLayout={this.handleBaseLayout}
					ref={(ref) => { this.flakeThreeRef = ref }}
					style={{
						position: 'absolute',
						opacity: this.state.flakeThreeTimer.interpolate({
							inputRange:  [0, 1, 3, 4, 5],
							outputRange: [0, 1, 1, 0, 0],
						}),
					}}>
					<Svg
						viewBox={'0 0 512 512'}
						height={this.props.size}
						width={this.props.size}>
						<Path
							fill={this.props.colour}
							d={
								'M474.2,396.2l-12.1-3.2c-0.3-3.8-1.2-7.5-2.9-11l8.8-8.8c4.1-4.1,4.1-10.8,\
								0-14.9c-4.1-4.1-10.7-4.1-14.8,0l-8.8,8.8c-3.5-1.6-7.1-2.6-11-2.9l-3.2-12.1c-\
								1.5-5.6-7.2-8.9-12.9-7.4c-5.6,1.5-8.9,7.3-7.4,12.9l3.2,11.9c-1.6,1.1-3.1,2.3-4.5,\
								3.7c-1.4,1.4-2.5,2.9-3.6,4.5l-11.9-3.2c-5.6-1.5-11.4,1.9-12.9,7.4c-1.5,5.6,1.9,\
								11.4,7.4,12.9l12,3.2c0.3,3.8,1.3,7.5,3,11l-8.8,8.8c-4.1,4.1-4.1,10.7,0,14.8c4.1,\
								4.1,10.7,4.1,14.8,0l8.8-8.8c3.5,1.7,7.2,2.7,11,3l3.2,12c1.5,5.6,7.2,8.9,12.9,\
								7.4c5.6-1.5,9-7.2,7.5-12.9l-3.2-11.9c1.5-1.1,3-2.2,4.5-3.6c1.4-1.4,2.5-2.9,\
								3.6-4.5l11.9,3.2c5.6,1.5,11.4-1.9,12.9-7.4C483.1,403.5,479.8,397.8,474.2,\
								396.2z M438.3,402.9c-4.1,4.1-10.8,4.1-14.9,0c-4.1-4.1-4.1-10.7,0-14.9c4.1-4.1,\
								10.8-4.1,14.9,0C442.4,392.2,442.4,398.9,438.3,402.9z'
							}
						/>
					</Svg>
				</Animated.View>

			</View>
		)
	}
}

SnowIcon.propTypes = {
	size: PropTypes.number,
	speed: PropTypes.number,
	colour: PropTypes.string
}

SnowIcon.defaultProps = {
	size: 50,
	speed: 1,
	colour: 'black'
}

const SnowIconAnimated = Animated.createAnimatedComponent(SnowIcon)

export default SnowIconAnimated
