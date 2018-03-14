// display each selected quarry's info

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Quarry from './Quarry.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import { Trackers } from '../api/trackers.js';


export default class DisplayQuarry extends Component{
	constructor(props){
		super(props);
	}
	
	renderAddQuarry(){
		if (this.props.active == 'addquarry'){
			return(
				<div id='adding_quarry'>
				<AccountsUIWrapper />
				<div id='add_trackers'>
				<form className="new-task" onSubmit={this.props.formSubmission.bind(this)} >
				<div className="form-group">
				<input id="ble_name" className="form-control" type="text" placeholder="What would you like to call your device?"/>
				</div>
				<div className="form-group">
				<input id="ble_num" className="form-control" type="text"  placeholder="Device serial number"/>
				</div>
				<button className="btn btn-primary">Submit</button>
				</form>
				</div>
				</div>


				);
		}
		
		return(this.props.active);
	}

	render(){
		// We need to have react scroll utilized
		// https://github.com/fisshy/react-scroll
		return(
			<div className="activeQuarry">
			{this.renderAddQuarry()}
			</div>
			);
	}
}

