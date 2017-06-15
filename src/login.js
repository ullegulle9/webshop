import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import {actionLogin, actionChangeView, actionHistory} from './Actions/actions.js';

class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
			userInp: '',
			pwInp: ''
		}
		this.userInpChange = this.userInpChange.bind(this);
		this.userPwChange = this.userPwChange.bind(this);
		this.loginClick = this.loginClick.bind(this);
	}
	render(){
		return <div>
			<input type="text" placeholder="användare" onChange={this.userInpChange} ></input>
			<input type="password" placeholder="lösenord" onChange={this.userPwChange} ></input>
			<button onClick={this.loginClick} >Logga in</button>
		</div>
	}
	
	userInpChange(ev){
		this.setState({
			userInp: ev.target.value
		});
	}
	
	userPwChange(ev){
		this.setState({
			pwInp: ev.target.value
		});
	}
	
	loginClick(ev){
		console.log(this.state.userInp);
		console.log(this.props.adminPw);
		if (this.state.userInp === this.props.adminUserName && this.state.pwInp === this.props.adminPw){
			this.props.dispatch(actionLogin());
			this.props.dispatch(actionChangeView('LOGGEDIN'));	
		}
		else {
			alert('Fel lösenord eller användarnamn!');
		}
	}
}

function mapStateToProps(state) {
	return {
		view: state.view,
		cart: state.cart,
		products: state.products,
		clicked: state.clicked,
		loggedIn: state.loggedIn,
		adminUserName: state.adminUserName,
		adminPw: state.adminPw
	}
}
	
export default connect(mapStateToProps)(Login);