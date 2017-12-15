import React from 'react'
import PropTypes from 'prop-types'
import { Animated, View, Easing } from 'react-native'
// import { GooglePlacesAutocomplete } from '../../lib/GooglePlacesAutocomplete/GooglePlacesAutocomplete'
// import Icon from 'react-native-vector-icons/EvilIcons'
import Svg, { Path } from 'react-native-svg'

class RainIcon extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			dropOneTimer: new Animated.Value(0),
			dropTwoTimer: new Animated.Value(0),
			dropThreeTimer: new Animated.Value(0),
		}

		this.dropOneAnimationLength = 2000
		this.dropTwoAnimationLength = 1900
		this.dropThreeAnimationLength = 1800

		this.dropOneStages = []
		this.dropOneStages.push(Animated.timing(
			this.state.dropOneTimer,
			{
				toValue: 1,
				duration: this.dropOneAnimationLength * 0.1,
			},
		))

		this.dropOneStages.push(Animated.timing(
			this.state.dropOneTimer,
			{
				toValue: 2,
				duration: this.dropOneAnimationLength * 0.2,
			},
		))

		this.dropOneStages.push(Animated.timing(
			this.state.dropOneTimer,
			{
				toValue: 3,
				duration: this.dropOneAnimationLength * 0.3,
			},
		))

		this.dropOneStages.push(Animated.timing(
			this.state.dropOneTimer,
			{
				toValue: 4,
				duration: this.dropOneAnimationLength * 0.4,
			},
		))

		this.dropTwoStages = []
		this.dropTwoStages.push(Animated.timing(
			this.state.dropTwoTimer,
			{
				toValue: 1,
				duration: this.dropTwoAnimationLength * 0.1,
			},
		))

		this.dropTwoStages.push(Animated.timing(
			this.state.dropTwoTimer,
			{
				toValue: 2,
				duration: this.dropTwoAnimationLength * 0.2,
			},
		))

		this.dropTwoStages.push(Animated.timing(
			this.state.dropTwoTimer,
			{
				toValue: 3,
				duration: this.dropTwoAnimationLength * 0.3,
			},
		))

		this.dropTwoStages.push(Animated.timing(
			this.state.dropTwoTimer,
			{
				toValue: 4,
				duration: this.dropTwoAnimationLength * 0.4,
			},
		))

		this.dropThreeStages = []
		this.dropThreeStages.push(Animated.timing(
			this.state.dropThreeTimer,
			{
				toValue: 1,
				duration: this.dropThreeAnimationLength * 0.1,
			},
		))

		this.dropThreeStages.push(Animated.timing(
			this.state.dropThreeTimer,
			{
				toValue: 2,
				duration: this.dropThreeAnimationLength * 0.2,
			},
		))

		this.dropThreeStages.push(Animated.timing(
			this.state.dropThreeTimer,
			{
				toValue: 3,
				duration: this.dropThreeAnimationLength * 0.3,
			},
		))

		this.dropThreeStages.push(Animated.timing(
			this.state.dropThreeTimer,
			{
				toValue: 4,
				duration: this.dropThreeAnimationLength * 0.4,
			},
		))
	}


	componentDidMount() {
		this.runDropOne()
		setTimeout(() => { this.runDropTwo() }, 800)
		setTimeout(() => { this.runDropThree() }, 500)
	}

	runDropOne() {
		this.state.dropOneTimer.setValue(0)
		Animated.sequence(this.dropOneStages).start(
			() => { this.runDropOne() }
		)
	}

	runDropTwo() {
		this.state.dropTwoTimer.setValue(0)
		Animated.sequence(this.dropTwoStages).start(
			() => { this.runDropTwo() }
		)
	}

	runDropThree() {
		this.state.dropThreeTimer.setValue(0)
		Animated.sequence(this.dropThreeStages).start(
			() => { this.runDropThree() }
		)
	}

	render() {
		return (
			<View style={{ height: this.props.size, width: this.props.size }}>
				<View style={{ position: 'absolute' }}>
					<Svg viewBox={'0 0 512 512'} height={this.props.size} width={this.props.size}>
						<Path
							d={
								'M400,64c-5.3,0-10.6,0.4-15.8,1.1C354.3,24.4,307.2,\
								0,256,0s-98.3,24.4-128.2,65.1c-5.2-0.8-10.5-1.1-15.8-1.1C50.2,\
								64,0,114.2,0,176s50.2,112,112,112c13.7,0,27.1-2.5,39.7-7.3c29,25.2,\
								65.8,39.3,104.3,39.3c38.5,0,75.3-14.1,104.3-39.3c12.6,4.8,26,7.3,39.7,\
								7.3c61.8,0,112-50.2,112-112S461.8,64,400,64z M400,256c-17.1,\
								0-32.9-5.5-45.9-14.7C330.6,269.6,295.6,288,256,288c-39.6,\
								0-74.6-18.4-98.1-46.7c-13,9.2-28.8,14.7-45.9,14.7c-44.2,0-80-35.8-80-80s35.8-80,\
								80-80c10.8,0,21.1,2.2,30.4,6.1C163.7,60.7,206.3,32,256,32s92.3,28.7,\
								113.5,70.1c9.4-3.9,19.7-6.1,30.5-6.1c44.2,0,80,35.8,80,80S444.2,256,400,256z'
							}
						/>
					</Svg>
				</View>
				<Animated.View
					style={{
						position: 'absolute',
						opacity: this.state.dropOneTimer.interpolate({
							inputRange:  [0, 1, 2, 3, 4],
							outputRange: [0, 1, 1, 0, 0],
						}),
						transform:[
							{
								translateY: this.state.dropOneTimer.interpolate({
									inputRange:  [0, 1, 3, 4],
									outputRange: [-4, -3, 8, -4],
								})
							}
						]
					}}>
					<Svg viewBox={'0 0 512 512'} height={this.props.size} width={this.props.size}>
						<Path
							d={'M96,384c0,17.7,14.3,32,32,32s32-14.3,32-32s-32-64-32-64S96,366.3,96,384z'} />
					</Svg>
				</Animated.View>
				<Animated.View
					style={{
						position: 'absolute',
						opacity: this.state.dropTwoTimer.interpolate({
							inputRange:  [0, 1, 2, 3, 4],
							outputRange: [0, 1, 1, 0, 0],
						}),
						transform:[
							{
								translateY: this.state.dropTwoTimer.interpolate({
									inputRange:  [0, 1, 3, 4],
									outputRange: [-8.5, -7, 0.5, -8.5],
								})
							}
						]
					}}>
					<Svg viewBox={'0 0 512 512'} height={this.props.size} width={this.props.size}>
						<Path
							d={'M225,480c0,17.7,14.3,32,32,32s32-14.3,32-32s-32-64-32-64S225,462.3,225,480z'} />
					</Svg>
				</Animated.View>
				<Animated.View
					style={{
						position: 'absolute',
						opacity: this.state.dropThreeTimer.interpolate({
							inputRange:  [0, 1, 2, 3, 4],
							outputRange: [0, 1, 1, 0, 0],
						}),
						transform:[
							{
								translateY: this.state.dropThreeTimer.interpolate({
									inputRange:  [0, 1, 3, 4],
									outputRange: [-8.5, -7, 4, -8.5],
								})
							}
						]
					}}>
					<Svg viewBox={'0 0 512 512'} height={this.props.size} width={this.props.size}>
						<Path
							d={'M352,448c0,17.7,14.3,32,32,32s32-14.3,32-32s-32-64-32-64S352,430.3,352,448z'} />
					</Svg>
				</Animated.View>
			</View>
		)
	}
}

RainIcon.propTypes = {
	size: PropTypes.number.isRequired
}

const RainIconAnimated = Animated.createAnimatedComponent(RainIcon)

export default RainIconAnimated