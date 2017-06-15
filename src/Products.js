import React, {Component} from 'react';
import {actionChangeView, actionViewProduct, actionLogout, actionHistory, actionDeleteProduct, actionDeleteHistory, actionGoBack, actionGoBackCart} from './Actions/actions.js';
import {connect} from 'react-redux';
import './App.css';
import InfoPage from './productPage.js';
import Cart from './cart.js';
import Login from './login.js';
import AdminStock from './adminStock.js';
import History from './history.js';

class MyProducts extends Component{
	constructor(props){
		super(props);
		this.showProduct = this.showProduct.bind(this);
		this.showCart = this.showCart.bind(this);
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.showStock = this.showStock.bind(this);
		this.showHistory = this.showHistory.bind(this);
		this.editHistory = this.editHistory.bind(this);
		this.historyBackEv = this.historyBackEv.bind(this);
	}
	render(){
		let view;
		if(this.props.view === 'PRODUCT_PAGE'){
			view = <div className="center">
					<h1>e-skivor</h1>
					<div>
						
					<button onClick={this.showCart} className="cartBtn">Visa kundvagnen</button></div><br/><br/><br/>
					<div>
					<ListView items={this.props.products}
				   click={this.showProduct}/>
						</div>
					<button onClick={this.login} >Admin</button>
					</div>
		} else if (this.props.view === 'ALBUM_PAGE'){
			this.props.products.forEach(i => {
				if (i.albumTitle === this.props.clicked){
					view = <InfoPage prodObj={i} />
				}
			});
		} else if (this.props.view === 'CART_PAGE'){
			view = <Cart />
		} else if (this.props.view === 'LOGIN'){
			view = <Login />
		} else if (this.props.view === 'LOGGEDIN'){
			view = <div className="center">
					<h1>skivsidan</h1>
					<div>
						<button className="logoutBtn" onClick={this.logout} >Logga ut</button>
					<button onClick={this.showCart} className="cartBtn">Visa kundvagnen</button></div><br/><br/><br/>
					<ListView items={this.props.products}
				   click={this.showProduct}/>
					
					<button onClick={this.showHistory}>Historik</button>
					<button onClick={this.showStock} >Uppdatera lager</button>
					</div>
		} else if (this.props.view === 'ADMIN_STOCK'){
			view = <AdminStock />
		} else if ( this.props.view === 'HISTORY' ) {
			view = <History history={this.props.history} 
					   click={this.editHistory}
					   back={this.historyBackEv} />
		}
		return view;
	}
	showProduct(ev){
		let action = actionChangeView('ALBUM_PAGE');
		this.props.dispatch(action);
		
		action = actionViewProduct(ev.currentTarget.id);
		this.props.dispatch(action);
	}
	
	showCart(ev){
		let action = actionChangeView('CART_PAGE');
		this.props.dispatch(action);
	}
	
	login(ev){
		let action = actionChangeView('LOGIN');
		this.props.dispatch(action);
	}
	
	logout(ev){
		let action = actionChangeView('PRODUCT_PAGE');
		this.props.dispatch(actionLogout());
	}
	showStock(ev){
		let action = actionChangeView('ADMIN_STOCK');
		this.props.dispatch(action);
	}
	
	showHistory(ev){
		let action = actionChangeView('HISTORY');
		this.props.dispatch(action);
	}
	editHistory(ev){
		let index = Number(ev.target.parentElement.getAttribute('data-index'));
		let historyObj = this.props.history[index];
		let type = this.props.history[index].type;
		
		if (type === 'ADD_PRODUCT' || type === 'EDIT_PRODUCT' || type === 'DELETE_PRODUCT'){
			this.props.dispatch(actionGoBack(historyObj.preState));
			this.props.dispatch(actionDeleteHistory(index));
		} else
			
			this.props.dispatch(actionGoBackCart(historyObj.preState));
			this.props.dispatch(actionDeleteHistory(index));
		
		
	}
	
	historyBackEv(ev){
		let action = actionChangeView('LOGGEDIN');
		this.props.dispatch(action);
	}
	
}





function ListView(props) {
	const list = props.items.map( x => <div className='albumBox' key={x.albumTitle} id={x.albumTitle} onClick={props.click}>
 <img src={x.url} className="albumImg"></img><br/>
 {x.artist} - {x.albumTitle} <br/> Pris: {x.price}:- </div>)
	return <ul>{list}</ul>								
}

								 
function mapStateToProps(state) {
	return {
		view: state.view,
		cart: state.cart,
		products: state.products,
		clicked: state.clicked,
		loggedIn: state.loggedIn,
		adminUserName: state.adminUserName,
		adminPw: state.adminPw,
		history: state.history
	}
}
	
export default connect(mapStateToProps)(MyProducts);
