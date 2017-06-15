import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import {actionUpdateAmount, actionChangeView, actionDeleteItem, actionHistory} from './Actions/actions.js';

class Cart extends Component{
	constructor(props){
		super(props);
		this.state = {
			total: 0
		};
		this.handleCartChange = this.handleCartChange.bind(this);
		this.calculateTotal = this.calculateTotal.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
		this.toProducts = this.toProducts.bind(this);
	}
	render(){
		let total = this.calculateTotal();
		return <div>
			<table>
				<thead>
					<tr>
						<th>Album</th>
						<th>Artist</th>
						<th>Antal</th>
						<th>Pris</th>
					</tr>
				</thead>
				
					<ListCart cart={this.props.cart}
						handleChange={this.handleCartChange}
						click={this.deleteItem} />
				<tfoot>
					<tr>
						<td>Totalt: {total}:-</td>
					</tr>
				</tfoot>
			</table>
			<button onClick={this.toProducts}>Handla mer</button>
		</div>
	}
	componentDidMount(){
		this.calculateTotal();
	}
	
	handleCartChange(ev){
		let index = Number(ev.target.getAttribute('data-index'));
		let newAmount = ev.target.value;
		let action = actionUpdateAmount(index, newAmount, this.props.cart);
		this.props.dispatch(action);
		this.props.dispatch(actionHistory(action));
		//this.calculateTotal();
	}
	calculateTotal(){
		let total = 0;
		for (let i = 0; i < this.props.cart.length; i++){
			let sum = this.props.cart[i].price * this.props.cart[i].amount;
			total += sum;
		}
		return total;
	}
	
	deleteItem(ev){
		let index = ev.target.getAttribute('data-index');
		let action = actionDeleteItem(index, this.props.cart);
		this.props.dispatch(action);
		this.props.dispatch(actionHistory(action));
	}
	
	toProducts(ev){
		let action;
		if (this.props.loggedIn){
			action = actionChangeView('LOGGEDIN');
			this.props.dispatch(action);
		} else
			action = actionChangeView('PRODUCT_PAGE')
		this.props.dispatch(action);
	}
}

function ListCart(props){
	let key = 0;
	const list = props.cart.map( x => {
		let selectHtml = [0,1,2,3,4,5].map(el => {
			
			let html;
			if (el == x.amount){
				html = <option selected value={x.amount} key={x.amount} >{x.amount}</option>
			} else {
				html = <option value={el} key={el} >{el}</option>
			}
			return html
		})
		return <tr key={key++}>
			<td>{x.albumTitle}</td>
			<td>{x.artist}</td>
			<td>
				<select onChange={props.handleChange} data-index={key - 1} >{selectHtml}
				</select>
			</td>
			<td>{x.price * x.amount}:-</td>
			<td><img className="deleteIcon" data-index={key - 1} onClick={props.click} src="https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_delete_48px-128.png"></img></td>
		</tr>
	});			
		
	return <tbody>{list}</tbody>
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
	
export default connect(mapStateToProps)(Cart);