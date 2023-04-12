/**
 * node-wifi-scanner
 * Created by kc on 04.04.16.
 */

const exec    = require('child_process').exec;
const async   = require('async');
const _       = require('lodash');
// The tools
const airport = require('./lib/airport');
const iwlist  = require('./lib/iwlist');
const netsh   = require('./lib/netsh');
const locationHelper = require('./lib/location_helper')
var os = require('os');
os.platform(); // 'darwin'
const release = os.release(); //'10.8.0'

let scanner;

// Initializing the tools
function initTools(callback) {

  // When a command is not found, an error is issued and async would finish. Therefore we pack
  // the error into the result and check it later on.
    var majorRelease = parseInt(release.split('.')[0])
    IsIntel((err, isIntel) => {
      if (isIntel){
        callback(null, airport)
      }else{
        callback(null, locationHelper)
      }
    }
  // return callback(null, res.scanner);
}

/**
 * Scan the networks with the scanner detected before
 * @param callback
 */
function scanNetworks(callback) {
  exec(scanner.cmdLine, function (err, stdout) {
    if (err) {
      callback(err, null);
      return;
    }
    scanner.parseOutput(stdout, callback);
  });
}

function isIntel(callback){
  exec("sysctl -a | grep brand", function(err, stdout) {
    if (err){
      callback(err, false);
      return;
    }
    callback(stdout.indexOf("Intel") > -1);
  }
}

module.exports = {
  /**
   * Scan for wifis
   * @param callback
   */
  scan: function (callback) {
    if (!scanner) {
      initTools(function (err, s) {
        if (err) {
          return callback(err);
        }
        scanner = s;
        scanNetworks(callback);
      });
      return;
    }
    scanNetworks(callback);
  }
};
