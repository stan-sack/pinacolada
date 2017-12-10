import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import PropTypes from 'prop-types'
import { StackNavigator, addNavigationHelpers } from 'react-navigation'
import Routes from './routes'
import getStore from './store'

import EStyleSheet from 'react-native-extended-stylesheet'
EStyleSheet.build({})

const AppNavigator = StackNavigator(Routes, {
	navigationOptions: ({ navigation }) => ({
		title: navigation.state.routeName,
		header: false
	}),
})

const navReducer = (state, action) => {
	const newState = AppNavigator.router.getStateForAction(action, state)
	return newState || state
}

@connect(state => ({
	nav: state.nav
}))
class AppWithNavigationState extends Component {
	render() {
		return (
			<AppNavigator
				navigation={addNavigationHelpers({
					dispatch: this.props.dispatch,
					state: this.props.nav
				})}
			/>
		)
	}
}

const store = getStore(navReducer)

export default function App() {
	return (
		<Provider store={store}>
			<AppWithNavigationState />
		</Provider>
	)
}

AppWithNavigationState.propTypes = {
	dispatch: PropTypes.func,
	nav: PropTypes.object
}
