import React from 'react'
import PropTypes from 'prop-types'
import { Animated, View, Easing } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import transformUtil from '../../helpers/transformUtil'

class WindCloudIcon extends React.Component {
	constructor(props) {
		super(props)
		this.handleBaseLayout = this.handleBaseLayout.bind(this)

		this.state = {
			cloudTranslateY: new Animated.Value(0.35 / 25.5 * this.props.size),
			cloudPushTimer: new Animated.Value(0),
			windTimer: new Animated.Value(0),
		}
		this.cloudBobLength = 2000 / props.speed
		this.cloudPushLength = 4000 / props.speed
		this.windLength = 4000 / props.speed

		this.bobStages = []
		this.bobStages.push(Animated.timing(
			this.state.cloudTranslateY,
			{
				toValue: -0.35 / 25.5 * this.props.size,
				duration: this.cloudBobLength * 0.5,
				useNativeDriver: true,
				easing: Easing.bezier(0, 0, 0.5, 1.5)
			},
		))

		this.bobStages.push(Animated.timing(
			this.state.cloudTranslateY,
			{
				toValue: 0.35 / 25.5 * this.props.size,
				duration: this.cloudBobLength * 0.5,
				useNativeDriver: true,
				easing: Easing.bezier(0, 0, 0.5, 1.5)
			},
		))

		this.state.cloudTranslateX = this.state.cloudPushTimer.interpolate({
			inputRange:  [0, 0.02, 0.6, 0.8, 1],
			outputRange: [-0.25 * this.props.size, 0, 0, -0.25 * this.props.size, -0.25 * this.props.size],
		})

		this.state.cloudScale = this.state.cloudPushTimer.interpolate({
			inputRange:  [0, 0.02, 0.6, 0.8, 1],
			outputRange: [1.2, 1, 1, 1.2, 1.2],
		})

		this.state.windVal = this.state.windTimer.interpolate({
			inputRange:  [0, 0.02, 0.6, 0.7, 1],
			outputRange: [0, 1, 1, 0, 0],
		})
	}


	componentDidMount() {
		this.state.cloudPushTimer.addListener(({ value }) => {
			this.flushTransform(this.cloudRef, this.state.cloudScale, this.state.cloudTranslateX,
				this.state.cloudTranslateY)
		})

		this.state.cloudTranslateY.addListener(({ value }) => {
			this.flushTransform(this.cloudRef, this.state.cloudScale, this.state.cloudTranslateX,
				this.state.cloudTranslateY)
		})

		this.state.windTimer.addListener(({ value }) => {
			this.flushWindTransform([this.windOneRef, this.windTwoRef, this.windThreeRef],
				this.state.windVal)
		})

		this.continueAnimation = true
		this.runAnimation()
	}

	componentWillUnmount() {
		this.continueAnimation = false
		this.state.cloudPushTimer.removeAllListeners()
		this.state.cloudTranslateY.removeAllListeners()
		this.state.windTimer.removeAllListeners()
	}

	runAnimation() {
		this.state.cloudTranslateY.setValue(0.35 / 25.5 * this.props.size)
		this.state.cloudPushTimer.setValue(0)
		this.state.windTimer.setValue(0)

		Animated.parallel([
			Animated.sequence([...this.bobStages, ...this.bobStages]),
			Animated.timing(
				this.state.cloudPushTimer,
				{
					toValue: 1,
					duration: this.cloudPushLength,
					useNativeDriver: true,
				},
			),
			Animated.timing(
				this.state.windTimer,
				{
					toValue: 1,
					duration: this.windLength,
					useNativeDriver: true,
				},
			)
		]).start(
			() => { this.continueAnimation && this.runAnimation() }
		)
	}

	flushTransform(ref, scale, translateX, translateY) {
		if (!this.state.centreX) {
			return
		}

		let matrix = transformUtil.scale(scale.__getValue(), scale.__getValue(), 1)

		transformUtil.transformMutateReturn(
			matrix, { x: (-12 / 25.5) * this.state.centreX, y: 0, z: 0 }
		)

		let xVal = translateX.__getValue()
		let yVal = translateY.__getValue()

		transformUtil.transform(
			matrix, { x: xVal, y: yVal, z: 0 }
		)


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

	flushWindTransform(refs, scaleX) {
		if (!this.state.centreX) {
			return
		}

		let matrices = refs.map(() => transformUtil.scale(scaleX.__getValue(), 1, 1))

		transformUtil.transformMutateReturn(
			matrices[0], { x: -this.state.centreX, y: (11 / 25.5) * this.state.centreY, z: 0 }
		)

		transformUtil.transformMutateReturn(
			matrices[1], { x: -this.state.centreX, y: (4.5 / 25.5) * this.state.centreY, z: 0 }
		)

		transformUtil.transformMutateReturn(
			matrices[2], { x: -this.state.centreX, y: (-2 / 25.5) * this.state.centreY, z: 0 }
		)

		refs.map((ref, i) => ref.setNativeProps({
			style: {
				transform: [
					{
						matrix: matrices[i],
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
					ref={(ref) => { this.cloudRef = ref }}
					onLayout={this.handleBaseLayout}
					style={{
						position: 'absolute',
					}}>
					<Svg viewBox={'0 0 512 512'} height={this.props.size} width={this.props.size}>
						<Path
							fill={this.props.colour}
							d={'M417,166.1c-24-24.5-57.1-38.8-91.7-38.8c-34.6,0-67.7,14.2-91.7,38.8c-52.8,\
							2.5-95,46.2-95,99.6c0,55,44.7,99.7,99.7,99.7c5.8,0,11.6-0.5,17.3-1.5c20.7,13.5,\
							44.9,20.9,69.7,20.9c24.9,0,49.1-7.3,69.8-20.9c5.7,1,11.5,1.5,17.3,1.5c54.9,0,\
							99.6-44.7,99.6-99.7C512,212.3,469.8,168.5,417,166.1z M412.4,333.3c-8.3,\
							0-16.4-1.5-24-4.4c-17.5,15.2-39.8,23.8-63.1,23.8c-23.2,0-45.5-8.5-63-23.8c-7.6,\
							2.9-15.8,4.4-24,4.4c-37.3,0-67.7-30.4-67.7-67.7c0-37.3,30.4-67.7,67.7-67.7c3.2,\
							0,6.4,0.2,9.5,0.7c18.1-24.6,46.5-39.4,77.5-39.4c30.9,0,59.4,14.8,77.5,39.4c3.1-0.5,\
							6.3-0.7,9.6-0.7c37.3,0,67.6,30.4,67.6,67.7C480,303,449.7,333.3,412.4,333.3z'} />
					</Svg>
				</Animated.View>

				<Animated.View
					renderToHardwareTextureAndroid
					shouldRasterizeIOS
					ref={(ref) => { this.windOneRef = ref }}
					style={{
						position: 'absolute',
						opacity: this.state.windVal
					}}>
					<Svg viewBox={'0 0 512 512'} height={this.props.size} width={this.props.size}>
						<Path
							fill={this.props.colour}
							d={'M16,256h64c8.8,0,16-7.2,16-16s-7.2-16-16-16H16c-8.8,0-16,7.2-16,16S7.2,256,16,256z'} />
					</Svg>
				</Animated.View>

				<Animated.View
					renderToHardwareTextureAndroid
					shouldRasterizeIOS
					ref={(ref) => { this.windTwoRef = ref }}
					style={{
						position: 'absolute',
						opacity: this.state.windVal
					}}>
					<Svg viewBox={'0 0 512 512'} height={this.props.size} width={this.props.size}>
						<Path
							fill={this.props.colour}
							d={'M16,320h94c8.8,0,16-7.2,16-16s-7.2-16-16-16H16c-8.8,0-16,7.2-16,16S7.2,320,16,320z'} />
					</Svg>
				</Animated.View>

				<Animated.View
					renderToHardwareTextureAndroid
					shouldRasterizeIOS
					ref={(ref) => { this.windThreeRef = ref }}
					style={{
						position: 'absolute',
						opacity: this.state.windVal,
					}}>
					<Svg viewBox={'0 0 512 512'} height={this.props.size} width={this.props.size}>
						<Path
							fill={this.props.colour}
							d={'M144,352H16c-8.8,0-16,7.2-16,16s7.2,16,16,16h128c8.8,0,16-7.2,16-16S152.8,352,\
							144,352z'} />
					</Svg>
				</Animated.View>
			</View>
		)
	}
}

WindCloudIcon.propTypes = {
	size: PropTypes.number,
	speed: PropTypes.number,
	colour: PropTypes.string
}

WindCloudIcon.defaultProps = {
	size: 50,
	speed: 1,
	colour: 'black'
}

const WindCloudIconAnimated = Animated.createAnimatedComponent(WindCloudIcon)

export default WindCloudIconAnimated
