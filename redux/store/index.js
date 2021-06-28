import { createStore, applyMiddleware , combineReducers } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import category from "../reducers/category";
import user_info from "../reducers/user_info";
import thunk from 'redux-thunk';

const reducer = combineReducers({
    category,
    user_info
});

// const store = createStore(reducer , composeWithDevTools(applyMiddleware(thunk)));
const store = createStore(reducer , applyMiddleware(thunk));

export default store;
