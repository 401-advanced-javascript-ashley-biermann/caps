'use strict';

/**
 * Testing Module
 * @module
 */

require('dotenv').config();
const driver = require('../driver/driver.js');
const vendor = require('../vendor/vendor.js');
const hubcaps = require('../hubcaps/hubcaps.js');

const consoleSpy = jest.spyOn(global.console, 'log');

describe('Testing event handlers', () => {
  it('Should generate a new order', () => {
    // vendor.generateOrder();
    // expect(consoleSpy).toBe('VENDOR: Package ready to deliver to customer');
  });
});

// driver.js
// handleMessage

// vendor.js
// generateOrder
// handleDeliveryComplete 

// hubcaps.js
// handleMessage

