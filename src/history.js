import React from 'react';

function History(props) {
	const list = props.history.map( (x, index) => {
			return <li key={index} data-index={index} >{x.type} <span className="edit" onClick={props.click} >Gå tillbaka hit</span></li> ;
	})
		
	return <div><h1>History</h1> <ul className="historyList">{list}</ul><br/>
	<button onClick={props.back} >Tillbaka</button>
	</div>;
}

export default History;