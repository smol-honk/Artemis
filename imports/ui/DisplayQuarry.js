// display each selected quarry's info

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Quarry from './Quarry.js';


export default class DisplayQuarry extends Component{
	constructor(props){
		super(props);
		this.handleNewQuarry = this.handleNewQuarry.bind(this);
		this.state = {isAdding:0};
	}

	handleNewQuarry(event){
		this.setState({isAdding:!this.state.isAdding});
	}

	render(){
		return(
			<div className="activeQuarry">
			</div>
			);
	}
}

