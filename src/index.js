import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux'; 
import rootReducer from './Reducers/reducers.js';



const initialState = {
	
	view: 'PRODUCT_PAGE',
	cart: [{
			artist: 'Wild Beasts',
			albumTitle: 'Smother',
			price: 50,
			url: 'https://upload.wikimedia.org/wikipedia/en/0/00/Smother_cover.jpg',
			amount: 1
		}],
	products: [
		{
			artist: 'Wild Beasts',
			albumTitle: 'Smother',
			price: 50,
			url: 'https://upload.wikimedia.org/wikipedia/en/0/00/Smother_cover.jpg',
			stock: 5
		},
		{
			artist: 'Radiohead',
			albumTitle: 'OK Computer',
			price: 50,
			url: 'https://upload.wikimedia.org/wikipedia/en/a/a1/Radiohead.okcomputer.albumart.jpg',
			stock: 5
		},
		{
			artist: 'Cloud Nothings',
			albumTitle: 'Attack on Memory',
			price: 50,
			url: 'https://upload.wikimedia.org/wikipedia/en/7/71/Cloud_Nothings_Attack_on_Memory_album_cover.jpg',
			stock: 5
		},
		{
			artist: 'The Clash',
			albumTitle: 'London Calling',
			price: 50,
			url: 'https://upload.wikimedia.org/wikipedia/en/0/00/TheClashLondonCallingalbumcover.jpg',
			stock: 5
		}
	],
	clicked: '',
	loggedIn: false,
	adminUserName: 'admin',
	adminPw: 'password',
	history: []
};



const store = createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('root')
);



registerServiceWorker();
