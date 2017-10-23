import { connect } from 'react-redux'
import { setNewestImageUri, setCurrentPosition } from '../../modules/mapState/actionCreators'

import MapScreen from './MapScreen'

const mapDispatchToProps = {
    setNewestImageUri,
    setCurrentPosition
}

const mapStateToProps = (state) => ({
    newestImageUri: state.mapState.newestImageUri,
    currentPosition: state.mapState.currentPosition 
})


export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)
