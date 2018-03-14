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
		this.state={activeQuarry: ''};
	}

	handleQuarryClick(e){
		this.setState({activeQuarry: e.target.id});
	}

	renderTrackers() {
		return this.props.trackers.map((t) =>
			(<Tracker key={t._id} tracker={t} />));
	}

	renderQuarries(){
		return this.props.trackers.map((t) =>
			(<Quarry key={t._id} q={t} onClick={this.handleQuarryClick.bind(this)}/>));
	}

	handleSubmit(event){
		console.dir(event.target);
		var inputName = event.target.elements[0];
		var inputNum = event.target.elements[1];
		event.preventDefault();
		const name = inputName.value.trim();
		const ble_num = inputNum.value.trim();
		
		Trackers.insert({name, createdAt: new Date(), ble_serial: ble_num, userID: Meteor.userId()});

		inputName.value = inputNum.value = '';
	}

	render() {
		return (
			<div className="trackers container">
				<header>
					<h1 className="text-center title">Artemis</h1>
				</header>
				<div className="quarry_container">
					<h1>Quarries</h1>
					<div className="new_quarry">
					<h2 id="addquarry" onClick={this.handleQuarryClick.bind(this)}>New Quarry</h2>
					</div>
					<div className = "all_quarry">
						{this.renderQuarries()}	
					</div>
					<div className="activeQuarry">
						<DisplayQuarry formSubmission={this.handleSubmit.bind(this)} active={this.state.activeQuarry}/>
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