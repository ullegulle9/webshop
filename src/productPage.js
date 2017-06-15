import React, {Component} from 'react';
import {actionAddItem, actionAddAmountToItem, actionChangeView, actionHistory} from './Actions/actions.js';
import {connect} from 'react-redux';
import './App.css';
import Cart from './cart.js';

class InfoPage extends Component{
	constructor(props){
		super(props);
		this.addToCart = this.addToCart.bind(this);
		this.backToProducts = this.backToProducts.bind(this);
		this.showCart = this.showCart.bind(this);
	}
	render(){
		const obj = this.props.prodObj;
		return <div className="center"><p>{obj.albumTitle} - {obj.artist} </p><button onClick={this.addToCart}>Lägg till i kundvagnen</button>
			
		<button onClick={this.showCart} >Visa kundvagnen</button>
			<button onClick={this.backToProducts} >Tillbaka till produktsidan</button>
		</div>
	}
	addToCart(ev){
		let cart = this.props.cart;
		let stock = this.props.products;
		let itemStock;
		let action;
		let newObj = this.props.prodObj
		stock.forEach(x => {
			if (x.albumTitle === newObj.albumTitle){
				itemStock = x.stock;
			}
		})
		if (this.findProductInCart(newObj) !== false){
			
			let index = this.findProductInCart(newObj);
			if (cart[index].amount < itemStock){
				action = actionAddAmountToItem(index, cart);
				this.props.dispatch(action);
				this.props.dispatch(actionHistory(action));
			} else {
				this.outOfStock();
			}
			
		} 
		
		else {
			action = actionAddItem(newObj, cart)
			this.props.dispatch(action);
			this.props.dispatch(actionHistory(action));
		}
	}
	findProductInCart(obj){
		let cart = this.props.cart;
		for (let o = 0; o < cart.length; o++){
			if (cart[o].albumTitle === obj.albumTitle){
				return o;
			} 
		}
		return false;
	}
	
	backToProducts(ev){
		let action;
		if(this.props.loggedIn){
			action = actionChangeView('LOGGEDIN')
			this.props.dispatch(action);
			
		} else{
			action = actionChangeView('PRODUCT_PAGE');
			this.props.dispatch(action);
		}
			
	}
	
	showCart(ev){
		let action = actionChangeView('CART_PAGE');
		this.props.dispatch(action);
	}
	
	outOfStock(){
		alert('Inte tillräckligt många produkter på lager');
	}
}



function mapStateToProps(state) {
	return {
		view: state.view,
		cart: state.cart,
		products: state.products,
		clicked: state.clicked,
		loggedIn: state.loggedIn
	}
}
	
export default connect(mapStateToProps)(InfoPage);