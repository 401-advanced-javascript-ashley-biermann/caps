'use strict';

/**
 * Main Hub Application
 * Manages state of packages (ready for pickup, in transit, delivered, etc)
 * Logs every event to the console with timestamp and event payload
 */

const events = require('./lib/events');

require('./lib/logger');
require('./lib/vendor');

// event listeners
events.on('new-package-available', handleNewPackage);
events.on('package-in-transit', handlePackageInTransit);
events.on('package-delivered', handlePackageDelivered);

// event emitters
events.emit('package-ready-for-delivery', payload);
events.emit('delivery-complete', payload);

// Event Handlers
function handleNewPackage(event, payload) {

}

function handlePackageInTransit(event, payload) {

}

function handlePackageDelivered(event, payload) {

}
