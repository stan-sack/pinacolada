import { Dimensions } from 'react-native'

export const getAspectRatio = () => {
	const { width, height } = Dimensions.get('window')
	const aspectRatio = width / height
	return aspectRatio
}
