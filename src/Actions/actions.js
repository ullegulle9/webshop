const CHANGE_VIEW = 'CHANGE_VIEW',
	  ADD_ITEM = 'ADD_ITEM',
	  VIEW_PRODUCT = 'VIEW_PRODUCT',
	  ADD_AMOUNT = 'ADD_AMOUNT',
	  UPDATE_AMOUNT = 'UPDATE_AMOUNT',
	  DELETE_ITEM = 'DELETE_ITEM',
	  LOGIN = 'ADMIN_LOGIN',
	  LOGOUT = 'LOGOUT',
	  ADD_PRODUCT = 'ADD_PRODUCT',
	  EDIT_PRODUCT = 'EDIT_PRODUCT',
	  HISTORY = 'HISTORY',
	  DELETE_PRODUCT = 'DELETE_PRODUCT',
	  DELETE_HISTORY = 'DELETE_HISTORY',
	  GO_BACK = 'GO_BACK',
	  GO_BACK_CART = 'GO_BACK_CART';
	  

function actionChangeView(view){
	return {
		type: CHANGE_VIEW,
		view,
	}
}

function actionAddItem(itemObj, preState){
	return {
		type: ADD_ITEM,
		item: {
			artist: itemObj.artist,
			albumTitle: itemObj.albumTitle,
			price: itemObj.price,
			url: itemObj.url,
			amount: 1
		},
		preState
	}
}

function actionViewProduct(id){
	return {
		type: VIEW_PRODUCT,
		itemId: id
	}
}

function actionAddAmountToItem(index, preState){
	return {
		type: ADD_AMOUNT,
		index,
		preState
	}
}

function actionUpdateAmount(index, amount, preState){
	return {
		type: UPDATE_AMOUNT,
		index,
		newAmount: amount,
		preState
	}
}
function actionDeleteItem(index, preState){
	return {
		type: DELETE_ITEM,
		index,
		preState
	}
}

function actionLogin(){
	return {
		type: LOGIN
	}
}

function actionLogout(){
	return {
		type: LOGOUT
	}
}

function actionAddProduct(itemObj, preState){
	return {
		type: ADD_PRODUCT,
		item: {
			artist: itemObj.artist,
			albumTitle: itemObj.albumTitle,
			price: itemObj.price,
			url: itemObj.url,
			stock: itemObj.stock
		},
		preState
	}
}

function actionEditProduct(itemObj, index, preState){
	return {
		type: EDIT_PRODUCT,
		item: {
			artist: itemObj.artist,
			albumTitle: itemObj.albumTitle,
			price: itemObj.price,
			url: itemObj.url,
			stock: itemObj.stock
		},
		index,
		preState
	}
}

function actionDeleteProduct(index, preState){
	return {
		type: DELETE_PRODUCT,
		index,
		preState
	}
}

function actionHistory(action) {
	return {
		type: HISTORY,
		action,
	}
}

function actionDeleteHistory(index){
	return {
		type: DELETE_HISTORY,
		index
	}
}

function actionGoBack(state){
	return {
		type: GO_BACK,
		state
	}
}

function actionGoBackCart(state){
	return {
		type: GO_BACK_CART,
		state
	}
}

export { actionChangeView, actionAddItem, CHANGE_VIEW, VIEW_PRODUCT, actionViewProduct, ADD_ITEM, ADD_AMOUNT, actionAddAmountToItem, actionLogin, LOGIN, actionLogout, LOGOUT, actionUpdateAmount, UPDATE_AMOUNT, actionDeleteItem, DELETE_ITEM, actionAddProduct, ADD_PRODUCT, EDIT_PRODUCT, actionEditProduct, actionHistory, HISTORY, DELETE_PRODUCT, actionDeleteProduct , actionDeleteHistory, DELETE_HISTORY, actionGoBack, GO_BACK, GO_BACK_CART, actionGoBackCart};

