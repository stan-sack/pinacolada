import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import getRootReducer from "./modules";

export default function getStore(navReducer) {
    const store = createStore(
        getRootReducer(navReducer),
        applyMiddleware(thunk)
    );

    return store;
}
