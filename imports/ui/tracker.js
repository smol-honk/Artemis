// tracker.js
import React, { Component } from 'react';

import { Trackers } from '../api/trackers.js';


export default class Tracker extends Component {

	render(){
		return(
			<div>
			{this.props.tracker.name}
			</div>
			)

	}
}