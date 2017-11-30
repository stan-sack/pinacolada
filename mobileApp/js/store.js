import { createStore, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'
import getRootReducer from './modules'

const initialState = {}

export default function getStore(navReducer) {
	const store = createStore(
		getRootReducer(navReducer),
		initialState,
		applyMiddleware(thunk),
	)

	return store
}
