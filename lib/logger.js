'use strict';

/** Logger
 * @module logger
 * Provides a timestamp 
 */

const events = require('./events');

events.on('cache-update', (payload) => {
  let time = new Date();
  console.log({ event: 'The cache was updated', time, payload });
});
