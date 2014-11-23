#!/usr/bin/env node

'use strict';

var debug = false,
    _ = require('lodash'),
    hid = require('node-hid'),
    ds4 = require('ds4'),
    machid = require('mac-vhid'),
    parseDS4HIDData = ds4.parseDS4HIDData,
    devices = hid.devices(),
    controller = _(devices).filter(isDS4HID).first(),
    previous = {},
    options = require('konfu'),
    dimensions = {
      width: 2560,
      height: 1440
    };

if (!controller) {
  throw new Error('Could not find desired controller.');
}

var hidDevice = new hid.HID(controller.path),
  offset = 0;

if (isBluetoothHID(controller)) {
    offset = 2;
    hidDevice.getFeatureReport(0x04, 66);
}

console.log('macds4civ is now proxying HID events.\nPress Ctrl+C to quit.');




hidDevice.on('data', function(buf) {
  var hidData = parseDS4HIDData(buf.slice(offset)),
      relative = {},
      analog = options.analog;
  
  if (typeof options.detectDimensions == 'string') {
    triggerDimensionDetection(hidData);
  }
  
  // Calculate relative analog values and take deadzones into account
  for (var i in analog) {
    if (analog.hasOwnProperty(i)) {
      for (var j in analog[i]) {
        if (analog[i].hasOwnProperty(j)) {
          var change = hidData[j] - analog[i][j].origin;
          relative[j] = (Math.abs(change) < analog[i][j].deadZone) ? 0 : change;
        }
      }
    }
  }
  
  // Trigger mouse events
  machid.mouseMoveDelta(Math.round(relative.leftAnalogX / options.mouse.deltaDivisorX), Math.round(relative.leftAnalogY / options.mouse.deltaDivisorY));
  triggerMouseButtons(hidData);
  triggerMouseJumps(hidData);
  
  // Trigger keyboard events
  triggerKeys(hidData);
  
  previous = hidData;
  options.debug && console.log(hidData);
});



/**
 * Trigger screen dimension detection.
 *
 * @param  {object} hidData
 * HID data.
 */
function triggerDimensionDetection(hidData) {
  if (hidData[options.detectDimensions] && !previous[options.detectDimensions]) {
    var stored = machid.mouseGetCurrentPosition();
    
    machid.mouseMoveABS(Number.MAX_VALUE, Number.MAX_VALUE);
    
    var t = setTimeout(function() {
      var pos = machid.mouseGetCurrentPosition();
      dimensions = {
        width: pos.x,
        height: pos.y
      };
      
      console.log("Detected screen resolution: " + (pos.x + 1) + " x " + (pos.y + 1));
      
      machid.mouseMoveABS(stored.x, stored.y);
    }, 600);
  }
}



/**
 * Trigger mouse button events.
 * 
 * @param  {object} hidData
 * HID data.
 */
function triggerMouseButtons(hidData) {
  var buttons = options.mouse.buttons;
  for (var i in buttons) {
    if (buttons.hasOwnProperty(i)) {
      if (hidData[i] && !previous[i]) {
        machid.mouseBtnDown(buttons[i]);
      }
      else if (!hidData[i] && previous[i]) {
        machid.mouseBtnUp(buttons[i]); 
      }
    }
  }
}


/**
 * Trigger mouse pointer jump events.
 * 
 * These are used to set the absolute mouse pointer position on the screen. This
 * is very useful as the Civ V UI otherwise forces extremely long mouse travel
 * paths.
 * 
 * @param  {object} hidData
 * HID data.
 */
function triggerMouseJumps(hidData) {
  var jumps = options.mouse.jumps;
  for (var i in jumps) {
    if (jumps.hasOwnProperty(i) && hidData[i]) {
      var pos = {
        x: Math.round(jumps[i].x * dimensions.width),
        y: Math.round(jumps[i].y * dimensions.height)
      };
      machid.mouseMoveABS(pos.x, pos.y);
    }
  }
}


/**
 * Trigger keyboard events.
 * 
 * @param  {object} hidData
 * HID data.
 */
function triggerKeys(hidData) {
  var keys = options.keys;
  for (var i in keys) {
    if (keys.hasOwnProperty(i)) {
      if (hidData[i] && !previous[i]) {
        machid.keyDown(keys[i]);
      }
      else if (!hidData[i] && previous[i]) {
        machid.keyUp(keys[i]); 
      }
    }
  }
}





// HIDDesciptor -> Boolean
function isDS4HID(descriptor) {
  return descriptor.vendorId == 1356 && descriptor.productId == 1476;
}

// HIDDesciptor -> Boolean
function isBluetoothHID(descriptor) {
  return descriptor.path.match(/^Bluetooth/);
}

// HIDDesciptor -> Boolean
function isUSBHID(descriptor) {
  return descriptor.path.match(/^USB/);
}
