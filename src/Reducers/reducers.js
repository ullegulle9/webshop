import { CHANGE_VIEW, VIEW_PRODUCT, ADD_ITEM, ADD_AMOUNT, UPDATE_AMOUNT, LOGIN, LOGOUT, DELETE_ITEM, ADD_PRODUCT, EDIT_PRODUCT, HISTORY, DELETE_PRODUCT, DELETE_HISTORY, GO_BACK, GO_BACK_CART } from '../Actions/actions.js';

function rootReducer(state, action) {
	let newState;
	let newCart;
	switch(action.type){
		case CHANGE_VIEW:
			return {
				...state,
				view: action.view
			};
		case VIEW_PRODUCT:
			return {
				...state,
				clicked: action.itemId
			};
		case ADD_ITEM:
			
			return {
				...state,
				cart: [...state.cart, action.item] 
			};
		case ADD_AMOUNT:
			newState = Object.assign({}, state);
			newCart = Object.assign({}, state.cart);
			//newState.cart = newCart;
			newCart[action.index].amount += 1;
			return newState;
		case UPDATE_AMOUNT:
			newState = {...state, cart: [...state.cart]}
			newState.cart[action.index] = {...newState.cart[action.index], amount: Number(action.newAmount)}
			return newState;
		case DELETE_ITEM:
			newState = Object.assign({}, state);
			newCart = Object.assign({}, state.cart);
			let updatedCart = [];
			for (let o in newCart){
				if (Number(o) !== Number(action.index)){
					updatedCart.push(newCart[o]);
				}
			}
			newState.cart = updatedCart;
			
			return newState;
		case ADD_PRODUCT:
		    return {
				...state,
				products: [...state.products, action.item] 
			};
		case EDIT_PRODUCT:
			
			newState = {...state, products: [...state.products]}
			newState.products[action.index] = action.item;
			return newState;
		case DELETE_PRODUCT:
			newState = Object.assign({}, state);
			let newProds = Object.assign({}, state.products);
			let updatedProds = [];
			for (let o in newProds){
				if (Number(o) !== Number(action.index)){
					updatedProds.push(newProds[o]);
				}
			}
			newState.products = updatedProds;
			return newState;
		case LOGIN:
			return {
				...state,
				loggedIn: true
			};
		case LOGOUT:
			return {
				...state,
				loggedIn: false
			};
		case HISTORY:
			return {
				...state,
				history: [...state.history, action.action]
			};
		case DELETE_HISTORY:
			newState = Object.assign({}, state);
			let newHis = Object.assign({}, state.history);
			let updatedHis = [];
			for (let i in newHis){
				if (Number(i) === action.index){
					break;
				}
				updatedHis.push(newHis[i]);
				
			}
			newState.history = updatedHis;
			return newState;
		case GO_BACK: 
			return {
				...state,
				products: action.state
			}
		case GO_BACK_CART:
			return {
				...state,
				cart: action.state
			}
		default:
			return state;
	}
}



export default rootReducer;