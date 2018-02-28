// Quarry.js

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Trackers } from '../api/trackers.js';

// For near by trackers, only accessable if logged in

class Quarry extends Component {
	constructor(props){
		super(props);
		this.state = {
			beacons: null, 
		};
	}
	
	createBeacon(name, uuid){
		// console.log("createBeacon: " + name+ " " + uuid);
		try {
			var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(name, uuid);
			console.log("We ran!");

			this.findQuarry(beaconRegion);   

		} catch(error){
			console.log(error);
		}
	}

	beginQuarry(){
		// console.log("beginQuarry");
		var trackers = Trackers.find().fetch();
		// console.log(trackers);
		for (var quar of trackers) {
			// console.log(quar);
			this.createBeacon(quar.name, quar.ble_serial)
		}
	}


	componentDidMount(){
		this.beginQuarry();
	}

	rangingQuarry(beaconRegion){
		console.log("I ran! rangingQuarry");

		var logToDom = function (message) {
			console.log(message);
		};

		var delegate = new cordova.plugins.locationManager.Delegate();

		delegate.didDetermineStateForRegion = function (pluginResult) {

			logToDom('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));

			cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
				+ JSON.stringify(pluginResult));
		};

		delegate.didStartMonitoringForRegion = function (pluginResult) {
			console.log('didStartMonitoringForRegion:', pluginResult);

			logToDom('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
		};

		delegate.didRangeBeaconsInRegion = function (pluginResult) {
			logToDom('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
			console.log(pluginResult);
		};

		delegate.didExitRegion = function (pluginResult) {
			// alert(pluginResult.region.identifier + " has exited the region!");
			console.log('!!!!!!!didExitRegion: ' + JSON.stringify(pluginResult));
			console.log(this.props.currentLocation);

		};

		cordova.plugins.locationManager.setDelegate(delegate);

		// cordova.plugins.locationManager.requestWhenInUseAuthorization(); 
		cordova.plugins.locationManager.requestAlwaysAuthorization()


		cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
		.fail(function(e) { console.error(e); })
		.done();
	}

	findQuarry(beaconRegion){
		console.log("I ran! findQuarry");

		var logToDom = function (message) {
			console.log(message);
		};

		var delegate = new cordova.plugins.locationManager.Delegate();

		delegate.didDetermineStateForRegion = function (pluginResult) {

			logToDom('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));

			cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
				+ JSON.stringify(pluginResult));
		};

		delegate.didStartMonitoringForRegion = function (pluginResult) {
			console.log('didStartMonitoringForRegion:', pluginResult);

			logToDom('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
		};

		delegate.didRangeBeaconsInRegion = function (pluginResult) {
			logToDom('[DOM] findQuarry: didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
			console.log(pluginResult);

		};

		delegate.didExitRegion = function (pluginResult) {
			// alert(pluginResult.region.identifier + " has exited the region!");
			console.log('!!!!!!!didExitRegion: ' + JSON.stringify(pluginResult));
			console.log(this.props.currentLocation);

		};

		cordova.plugins.locationManager.setDelegate(delegate);

		// cordova.plugins.locationManager.requestWhenInUseAuthorization(); 
		cordova.plugins.locationManager.requestAlwaysAuthorization()


		cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
		.fail(function(e) { console.error(e); })
		.done();

		this.rangingQuarry(beaconRegion);
	}


	render(){
		return(
			<div className="quarries" id={this.props.q.name} onClick={this.props.onClick.bind(this)}>
			{this.props.q.name}
			<hr></hr>
			</div>
			)

	}

}

export default withTracker(() => {
	return {
		currentLocation: Geolocation.currentLocation,
	};
})(Quarry);
