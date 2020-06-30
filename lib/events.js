'use strict';

/**
 * EventsEmitter
 * @module events
 * Acts as broadcast central for the CAPS system, Global Event Pool shared by all
 */

const EventEmitter = require('events');

const events = new EventEmitter();

module.exports = events;