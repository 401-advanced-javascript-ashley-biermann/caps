'use strict';

/**
 * Main Hub Application
 * Manages state of packages (ready for pickup, in transit, delivered, etc)
 * Logs every event to the console with timestamp and event payload
 */
const events = require('./lib/events');

require('./lib/logger');
require('./lib/vendor');

events.emit('save', { id: 100, name: Ashley });