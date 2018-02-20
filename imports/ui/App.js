// App.js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Trackers } from '../api/trackers.js';

import Tracker  from './tracker.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';

import Quarry  from './Quarry.js';
import DisplayQuarry from './DisplayQuarry.js';



class App extends Component {
	constructor(props){
		super(props);
		this.state={activeQuarry: null};
	}

	handleQuarryClick(e){
		console.log(e.target.id);
	}

	handleSubmit(event){
		event.preventDefault();
		const name = ReactDOM.findDOMNode(this.refs.name).value.trim();
		const ble_num = ReactDOM.findDOMNode(this.refs.ble_num).value.trim();
		
		Trackers.insert({name, createdAt: new Date(), ble_serial: ble_num, userID: Meteor.userId()});

		ReactDOM.findDOMNode(this.refs.name).value = '';
		ReactDOM.findDOMNode(this.refs.ble_num).value = '';
	}

	renderTrackers() {
		return this.props.trackers.map((t) =>
			(<Tracker key={t._id} tracker={t} />));
	}

	renderQuarries(){
		return this.props.trackers.map((t) =>
			(<Quarry key={t._id} q={t} onClick={this.handleQuarryClick.bind(this)}/>));
	}

	renderAddQuarry(){
		if (this.state.addingQuarry){
			return(
				<div className="activeQuarry">
				<AccountsUIWrapper />
				<div id='add_trackers'>
				<form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
				<div className="form-group">
				<input className="form-control" type="text" ref="name" placeholder="What would you like to call your device?"/>
				</div>
				<div className="form-group">
				<input className="form-control" type="text" ref="ble_num" placeholder="Device serial number"/>
				</div>
				<button onClick={this.handleSubmit.bind(this)} className="btn btn-primary">Submit</button>
				</form>
				</div>
				</div>
				);
		}
		
			return('');
	}

	render() {
		return (
			<div className="trackers container">
				<header>
					<h1 className="text-center title">Artemis</h1>
				</header>
				<div className="quarry_container">
					<h1>Quarries</h1>
					<div className="new_quarry" onClick={this.handleQuarryClick.bind(this)}>
					<h2 id="addquarry">New Quarry</h2>
					</div>
					<div className = "all_quarry">
						{this.renderQuarries()}	
					</div>
					<div className="activeQuarry">
						<DisplayQuarry  onClick={this.handleQuarryClick.bind(this)}/>
					</div>
				</div>		
			</div>
			);
	}
}

export default withTracker(() => {
	return {
		trackers: Trackers.find({userID: Meteor.userId()}).fetch(),
	};
})(App);