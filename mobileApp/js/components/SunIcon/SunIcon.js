import React from 'react'
import PropTypes from 'prop-types'
import { Animated, View, Easing } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import transformUtil from '../../helpers/transformUtil'

class SunIcon extends React.Component {
	constructor(props) {
		super(props)
		this.handleBaseLayout = this.handleBaseLayout.bind(this)
		this.state = {
			growTimer: new Animated.Value(0.5),
			rayTimer: new Animated.Value(0),
		}
		this.animationLength = 4000 / props.speed

		this.growStages = []

		this.growStages.push(Animated.timing(
			this.state.growTimer,
			{
				toValue: 1,
				duration: this.animationLength * 0.15,
				useNativeDriver: true,
				easing: Easing.bezier(0.2, 0.85, 0.4, 1.5)
			}
		))

		this.growStages.push(Animated.timing(
			this.state.growTimer,
			{
				toValue: 1,
				duration: this.animationLength * 0.65,
				useNativeDriver: true,
				easing: Easing.bezier(0.2, 0.85, 0.4, 1.5)
			}
		))

		this.growStages.push(Animated.timing(
			this.state.growTimer,
			{
				toValue: 0.5,
				duration: this.animationLength * 0.1,
				useNativeDriver: true,
				easing: Easing.bezier(0.2, 0.85, 0.4, 1.5)
			}
		))

		this.growStages.push(Animated.timing(
			this.state.growTimer,
			{
				toValue: 0.5,
				duration: this.animationLength * 0.1,
				useNativeDriver: true,
				easing: Easing.bezier(0.2, 0.85, 0.4, 1.5)
			}
		))

		this.state.rayOneScale = this.state.rayTimer.interpolate({
			inputRange:  [0, 0.1, 0.15, 0.8, 0.9, 1],
			outputRange: [0.5, 0.5, 1, 1, 0.5, 0.5],
		})

		this.state.rayTwoScale = this.state.rayTimer.interpolate({
			inputRange:  [0, 0.15, 0.2, 0.8, 0.9, 1],
			outputRange: [0.5, 0.5, 1, 1, 0.5, 0.5],
		})

		this.state.rayThreeScale = this.state.rayTimer.interpolate({
			inputRange:  [0, 0.2, 0.25, 0.8, 0.9, 1],
			outputRange: [0.5, 0.5, 1, 1, 0.5, 0.5],
		})

		this.state.rayFourScale = this.state.rayTimer.interpolate({
			inputRange:  [0, 0.25, 0.3, 0.8, 0.9, 1],
			outputRange: [0.5, 0.5, 1, 1, 0.5, 0.5],
		})

		this.state.rayFiveScale = this.state.rayTimer.interpolate({
			inputRange:  [0, 0.3, 0.35, 0.8, 0.9, 1],
			outputRange: [0.5, 0.5, 1, 1, 0.5, 0.5],
		})

		this.state.raySixScale = this.state.rayTimer.interpolate({
			inputRange:  [0, 0.35, 0.4, 0.8, 0.9, 1],
			outputRange: [0.5, 0.5, 1, 1, 0.5, 0.5],
		})

		this.state.raySevenScale = this.state.rayTimer.interpolate({
			inputRange:  [0, 0.4, 0.45, 0.8, 0.9, 1],
			outputRange: [0.5, 0.5, 1, 1, 0.5, 0.5],
		})

		this.state.rayEightScale = this.state.rayTimer.interpolate({
			inputRange:  [0, 0.45, 0.5, 0.8, 0.9, 1],
			outputRange: [0.5, 0.5, 1, 1, 0.5, 0.5],
		})
	}


	componentDidMount() {
		this.state.rayTimer.addListener(({ value }) => {
			this.flushRayTransforms(
				[
					this.rayOneRef,
					this.rayTwoRef,
					this.rayThreeRef,
					this.rayFourRef,
					this.rayFiveRef,
					this.raySixRef,
					this.raySevenRef,
					this.rayEightRef
				],
				[
					this.state.rayOneScale,
					this.state.rayTwoScale,
					this.state.rayThreeScale,
					this.state.rayFourScale,
					this.state.rayFiveScale,
					this.state.raySixScale,
					this.state.raySevenScale,
					this.state.rayEightScale
				]
			)
		})
		this.continueAnimation = true
		this.runAnimation()
	}

	componentWillUnmount() {
		this.continueAnimation = false
		this.state.rayTimer.removeAllListeners()
	}

	runAnimation() {
		this.state.growTimer.setValue(0.5)
		this.state.rayTimer.setValue(0)
		Animated.parallel([
			Animated.sequence(this.growStages),
			Animated.timing(
				this.state.rayTimer,
				{
					toValue: 1,
					duration: this.animationLength,
					useNativeDriver: true,
				},
			)
		]).start(
			() => { this.continueAnimation && this.runAnimation() }
		)
	}

	flushRayTransforms(refs, scales) {
		if (!this.state.centreX) {
			return
		}

		let matrixes = scales.map(scale => transformUtil.scale(scale.__getValue(), scale.__getValue(), 1))

		transformUtil.transformMutateReturn(
			matrixes[0], { x: -(14.5 / 25.5) * this.state.centreX, y: 0, z: 0 }
		)

		transformUtil.transformMutateReturn(
			matrixes[1], { x: -(10.253 / 25.5) * this.state.centreX, y: -(10.253 / 25.5) * this.state.centreY, z: 0 }
		)

		transformUtil.transformMutateReturn(
			matrixes[2], { x: 0, y: -(14.5 / 25.5) * this.state.centreY, z: 0 }
		)

		transformUtil.transformMutateReturn(
			matrixes[3], { x: (10.253 / 25.5) * this.state.centreX, y: -(10.253 / 25.5) * this.state.centreY, z: 0 }
		)

		transformUtil.transformMutateReturn(
			matrixes[4], { x: (14.5 / 25.5) * this.state.centreX, y: 0 * this.state.centreY, z: 0 }
		)

		transformUtil.transformMutateReturn(
			matrixes[5], { x: (10.253 / 25.5) * this.state.centreX, y: (10.253 / 25.5) * this.state.centreY, z: 0 }
		)

		transformUtil.transformMutateReturn(
			matrixes[6], { x: 0, y: (14.5 / 25.5) * this.state.centreY, z: 0 }
		)

		transformUtil.transformMutateReturn(
			matrixes[7], { x: -(10.253 / 25.5) * this.state.centreX, y: (10.253 / 25.5) * this.state.centreY, z: 0 }
		)

		refs.map((ref, i) => ref.setNativeProps({
			style: {
				transform: [
					{
						matrix: matrixes[i],
					},
				],
			},
		}))
	}

	handleBaseLayout(e) {
		const layout = e.nativeEvent.layout


		this.setState({
			centreX: layout.height / 2,
			centreY: layout.height / 2,
		})
	}

	render() {
		return (
			<View style={{ height: this.props.size, width: this.props.size }}>
				<Animated.View
					renderToHardwareTextureAndroid
					shouldRasterizeIOS
					style={{
						position: 'absolute',
						transform: [{
							scale: this.state.growTimer
						}],
						opacity: this.state.growTimer.interpolate({
							inputRange:  [0.5, 1],
							outputRange: [0, 1],
						}),
					}}>
					<Svg viewBox={'0 0 512 512'} height={this.props.size} width={this.props.size}>
						<Path
							fill={this.props.colour}
							d={'M256,144c-61.8,0-112,50.2-112,112s50.2,112,112,112s112-50.2,112-112S317.8,144,\
							256,144z M256,336c-44.2,0-80-35.8-80-80s35.8-80,80-80s80,35.8,80,80S300.2,336,256,336z'} />
					</Svg>
				</Animated.View>

				<Animated.View
					renderToHardwareTextureAndroid
					shouldRasterizeIOS
					ref={(ref) => { this.rayOneRef = ref }}
					onLayout={this.handleBaseLayout}
					style={{
						position: 'absolute',
						opacity: this.state.rayTimer.interpolate({
							inputRange:  [0, 0.1, 0.15, 0.8, 0.9, 1],
							outputRange: [0, 0, 1, 1, 0, 0],
						}),
					}}>
					<Svg viewBox={'0 0 512 512'} height={this.props.size} width={this.props.size}>
						<Path
							fill={this.props.colour}
							d={'M112,256c0-8.8-7.2-16-16-16H64c-8.8,0-16,7.2-16,16s7.2,16,16,16h32C104.8,272,\
							112,264.8,112,256z'} />
					</Svg>
				</Animated.View>

				<Animated.View
					renderToHardwareTextureAndroid
					shouldRasterizeIOS
					ref={(ref) => { this.rayTwoRef = ref }}
					onLayout={this.handleBaseLayout}
					style={{
						position: 'absolute',
						opacity: this.state.rayTimer.interpolate({
							inputRange:  [0, 0.15, 0.2, 0.8, 0.9, 1],
							outputRange: [0, 0, 1, 1, 0, 0],
						}),
					}}>
					<Svg viewBox={'0 0 512 512'} height={this.props.size} width={this.props.size}>
						<Path
							fill={this.props.colour}
							d={'M131.5,154.2c6.3,6.2,16.4,6.2,22.6,0c6.3-6.2,6.3-16.4,\
							0-22.6l-22.6-22.6c-6.2-6.2-16.4-6.2-22.6,0c-6.2,6.2-6.2,16.4,0,22.6L131.5,154.2z'} />
					</Svg>
				</Animated.View>

				<Animated.View
					renderToHardwareTextureAndroid
					shouldRasterizeIOS
					ref={(ref) => { this.rayThreeRef = ref }}
					onLayout={this.handleBaseLayout}
					style={{
						position: 'absolute',
						opacity: this.state.rayTimer.interpolate({
							inputRange:  [0, 0.2, 0.25, 0.8, 0.9, 1],
							outputRange: [0, 0, 1, 1, 0, 0],
						}),
					}}>
					<Svg viewBox={'0 0 512 512'} height={this.props.size} width={this.props.size}>
						<Path
							fill={this.props.colour}
							d={'M256,112c8.8,0,16-7.2,16-16V64c0-8.8-7.2-16-16-16s-16,7.2-16,16v32C240,104.8,\
							247.2,112,256,112z'} />
					</Svg>
				</Animated.View>

				<Animated.View
					renderToHardwareTextureAndroid
					shouldRasterizeIOS
					ref={(ref) => { this.rayFourRef = ref }}
					onLayout={this.handleBaseLayout}
					style={{
						position: 'absolute',
						opacity: this.state.rayTimer.interpolate({
							inputRange:  [0, 0.25, 0.3, 0.8, 0.9, 1],
							outputRange: [0, 0, 1, 1, 0, 0],
						}),
					}}>
					<Svg viewBox={'0 0 512 512'} height={this.props.size} width={this.props.size}>
						<Path
							fill={this.props.colour}
							d={'M380.4,154.2l22.6-22.6c6.2-6.2,6.2-16.4,0-22.6s-16.4-6.2-22.6,0l-22.6,22.6c-6.2,\
							6.2-6.2,16.4,0,22.6C364.1,160.4,374.2,160.4,380.4,154.2z'} />
					</Svg>
				</Animated.View>


				<Animated.View
					renderToHardwareTextureAndroid
					shouldRasterizeIOS
					ref={(ref) => { this.rayFiveRef = ref }}
					onLayout={this.handleBaseLayout}
					style={{
						position: 'absolute',
						opacity: this.state.rayTimer.interpolate({
							inputRange:  [0, 0.3, 0.35, 0.8, 0.9, 1],
							outputRange: [0, 0, 1, 1, 0, 0],
						}),
					}}>
					<Svg viewBox={'0 0 512 512'} height={this.props.size} width={this.props.size}>
						<Path
							fill={this.props.colour}
							d={'M448,240h-32c-8.8,0-16,7.2-16,16s7.2,16,16,16h32c8.8,0,16-7.2,16-16S456.8,240,\
							448,240z'} />
					</Svg>
				</Animated.View>

				<Animated.View
					renderToHardwareTextureAndroid
					shouldRasterizeIOS
					ref={(ref) => { this.raySixRef = ref }}
					onLayout={this.handleBaseLayout}
					style={{
						position: 'absolute',
						opacity: this.state.rayTimer.interpolate({
							inputRange:  [0, 0.35, 0.4, 0.8, 0.9, 1],
							outputRange: [0, 0, 1, 1, 0, 0],
						}),
					}}>
					<Svg viewBox={'0 0 512 512'} height={this.props.size} width={this.props.size}>
						<Path
							fill={this.props.colour}
							d={'M380.5,357.8c-6.3-6.2-16.4-6.2-22.6,0c-6.3,6.2-6.3,16.4,0,22.6l22.6,22.6c6.2,6.2,\
							16.4,6.2,22.6,0s6.2-16.4,0-22.6L380.5,357.8z'} />
					</Svg>
				</Animated.View>

				<Animated.View
					renderToHardwareTextureAndroid
					shouldRasterizeIOS
					ref={(ref) => { this.raySevenRef = ref }}
					onLayout={this.handleBaseLayout}
					style={{
						position: 'absolute',
						opacity: this.state.rayTimer.interpolate({
							inputRange:  [0, 0.4, 0.45, 0.8, 0.9, 1],
							outputRange: [0, 0, 1, 1, 0, 0],
						}),
					}}>
					<Svg viewBox={'0 0 512 512'} height={this.props.size} width={this.props.size}>
						<Path
							fill={this.props.colour}
							d={'M256,400c-8.8,0-16,7.2-16,16v32c0,8.8,7.2,16,16,16s16-7.2,16-16v-32C272,407.2,\
							264.8,400,256,400z'} />
					</Svg>
				</Animated.View>

				<Animated.View
					renderToHardwareTextureAndroid
					shouldRasterizeIOS
					ref={(ref) => { this.rayEightRef = ref }}
					onLayout={this.handleBaseLayout}
					style={{
						position: 'absolute',
						opacity: this.state.rayTimer.interpolate({
							inputRange:  [0, 0.45, 0.5, 0.8, 0.9, 1],
							outputRange: [0, 0, 1, 1, 0, 0],
						}),
					}}>
					<Svg viewBox={'0 0 512 512'} height={this.props.size} width={this.props.size}>
						<Path
							fill={this.props.colour}
							d={'M131.6,357.8l-22.6,22.6c-6.2,6.2-6.2,16.4,0,22.6s16.4,6.2,22.6,\
							0l22.6-22.6c6.2-6.3,6.2-16.4,0-22.6C147.9,351.6,137.8,351.6,131.6,357.8z'} />
					</Svg>
				</Animated.View>
			</View>
		)
	}
}

SunIcon.propTypes = {
	size: PropTypes.number,
	speed: PropTypes.number,
	colour: PropTypes.string
}

SunIcon.defaultProps = {
	size: 50,
	speed: 1,
	colour: 'black'
}

const SunIconAnimated = Animated.createAnimatedComponent(SunIcon)

export default SunIconAnimated
