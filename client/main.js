import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import '../imports/api/trackers.js';
import '../imports/startup/accounts-config.js';

import App from '../imports/ui/App.js';
import Quarry from '../imports/ui/Quarry.js';
import DisplayQuarry from '../imports/ui/DisplayQuarry.js';



Meteor.startup(() => {
	if (Meteor.isCordova){
		console.log("CORDOVA!");
	}
	render(<App />, document.getElementById('main'));
});
