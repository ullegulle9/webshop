import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import { actionChangeView, actionAddProduct, actionEditProduct, actionHistory, actionDeleteProduct} from './Actions/actions.js';

class AdminStock extends Component{
	constructor(props){
		super(props);
		this.state = {
			Artist: '',
			Title: '',
			Pris: null,
			url: '',
			stock: null,
			editIndex: null
		};
		this.artChange = this.artChange.bind(this);
		this.titleChange = this.titleChange.bind(this);
		this.priceChange = this.priceChange.bind(this);
		this.urlChange = this.urlChange.bind(this);
		this.stockChange = this.stockChange.bind(this);
		this.addProduct = this.addProduct.bind(this);
		this.backToProducts = this.backToProducts.bind(this);
		this.editClick = this.editClick.bind(this);
		this.editProduct = this.editProduct.bind(this);
		this.deleteProduct = this.deleteProduct.bind(this);
	}
	render(){
		let view;
		if(this.state.editIndex === null){
			view = <div className="center">
			<table>
				<thead>
					<tr>
						<th></th>
						<th>Album</th>
						<th>Artist</th>
						<th>Pris</th>
						<th>Stock</th>
						<th>Url</th>
					</tr>
				</thead>
				
					<ListProducts prods={this.props.products}
						change={this.handleProdsChange}
						click={this.editClick}
						deleteClick={this.deleteProduct}/>
			</table>
			
			<div>
				<input type="text" placeholder="Artist" onChange={this.artChange}></input>
				<input type="text" placeholder="Titel" onChange={this.titleChange}></input>
				<input type="text" placeholder="Pris" onChange={this.priceChange}></input>
				<input type="text" placeholder="url" onChange={this.urlChange}></input>
				<input type="text" placeholder="stock" onChange={this.stockChange}></input>
				<button onClick={this.addProduct} >Lägg till produkt</button>
				<br/>
				<button onClick={this.backToProducts}>Tillbaka till startsidan</button>
			</div>
		</div>
		} else {
			view = <div className="center">
			<table>
				<thead>
					<tr>
						<th></th>
						<th>Album</th>
						<th>Artist</th>
						<th>Pris</th>
						<th>Stock</th>
						<th>Url</th>
					</tr>
				</thead>
				
					<ListProducts prods={this.props.products}
						change={this.handleProdsChange}
						click={this.editClick}
						deleteClick={this.deleteProduct} />
			</table>
			
			<div>
				<input type="text" placeholder="Artist" onChange={this.artChange}></input>
				<input type="text" placeholder="Titel" onChange={this.titleChange}></input>
				<input type="text" placeholder="Pris" onChange={this.priceChange}></input>
				<input type="text" placeholder="url" onChange={this.urlChange}></input>
				<input type="text" placeholder="stock" onChange={this.stockChange}></input>
				<button onClick={this.editProduct} >Genomför ändring</button>
				<br/>
				<button onClick={this.backToProducts}>Tillbaka till startsidan</button>
			</div>
		</div>
		}
		return view
	}/*
	componentDidMount(){
		this.calculateTotal();
	}
	*/
	handleProdsChange(ev){
		let index = Number(ev.target.getAttribute('data-index'));
		let newAmount = ev.target.value;
	}
	
	editClick(ev){
		let index = ev.currentTarget.parentElement.getAttribute('data-index');
		this.setState({
			editIndex: index
		});
	}
	
	artChange(ev){
		this.setState({
			Artist: ev.target.value
		});
	}
	
	titleChange(ev){
		this.setState({
			Title: ev.target.value
		});
		
	}
	
	priceChange(ev){
		this.setState({
			Pris: ev.target.value
		});
	}
	
	urlChange(ev){
		this.setState({
			url: ev.target.value
		});
	}
	
	stockChange(ev){
		this.setState({
			stock: ev.target.value
		});
	}
	
	addProduct(ev){
		let obj = {
			artist: this.state.Artist,
			albumTitle: this.state.Title,
			price: this.state.Pris,
			url: this.state.url,
			stock: this.state.stock
		}
		let action = actionAddProduct(obj, this.props.products);
		this.props.dispatch(action);
		this.props.dispatch(actionHistory(action));
	}
	
	backToProducts(ev){
		let action;
		if (this.props.loggedIn){
			action = actionChangeView('LOGGEDIN');
			this.props.dispatch(action);
		} else {
			action = actionChangeView('PRODUCT_PAGE');
			this.props.dispatch(action);
		}
	}
	
	editProduct(ev){
		let obj = {
			artist: this.state.Artist,
			albumTitle: this.state.Title,
			price: this.state.Pris,
			url: this.state.url,
			stock: this.state.stock
		}
		let index = this.state.editIndex;
		let action = actionEditProduct(obj, index, this.props.products)
		this.props.dispatch(action);
		this.props.dispatch(actionHistory(action));
	}
	deleteProduct(ev){
		let index = Number(ev.target.getAttribute('data-index'));
		let action = actionDeleteProduct(index, this.props.products);
		this.props.dispatch(action);
		this.props.dispatch(actionHistory(action));
	}
	
}

function ListProducts(props){
	let key = 0;
	const list = props.prods.map( x => {
		return <tr key={key++} data-index={key -1}>
			<td>{key}</td>
			<td>{x.albumTitle}</td>
			<td>{x.artist}</td>
			<td>{x.price}</td>
			<td>{x.stock}</td>
			<td className="urlBox">{x.url}</td>
			<td onClick={props.click}><p className="edit">Edit</p></td>
			<td><img className="deleteIcon" data-index={key - 1} onClick={props.deleteClick} src="https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_delete_48px-128.png"></img></td>
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

/*;*/
	
export default connect(mapStateToProps)(AdminStock);