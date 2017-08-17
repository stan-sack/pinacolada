import { getNewestImageUri } from 'helpers/s3helper'
// ------------------------------------
// Constants
// ------------------------------------
export const SET_NEWEST_IMAGE = 'SET_NEWEST_IMAGE'
// export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'
// ------------------------------------
// Actions
// ------------------------------------
// export function fetchBucketContents (bucket) {
//     return {
//         type    : FETCH_BUCKET_CONTENTS,
//         payload : bucket
//     }
// }

/*  This is a thunk, meaning it is a function that immediately
returns a function for lazy evaluation. It is incredibly useful for
creating async actions, especially when combined with redux-thunk! */

export const setNewestImageUri = () => {
    return dispatch => {
        console.log('called2')
        getNewestImageUri().then((imageUri) => {
            console.log(imageUri)
            dispatch({
                type    : SET_NEWEST_IMAGE,
                payload : imageUri
            })
        })
    }
}

export const actions = {
    setNewestImageUri,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [SET_NEWEST_IMAGE]    : (state, action) => action.payload,
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []
export default function homeReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
