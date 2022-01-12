/**
 * Scanning WiFis on Mac OS X
 * Created by kc on 04.04.16.
 */

const tool     =   '/Users/martin/working/node-wifi-scanner/WIfiDemo.app/Contents/MacOS/WIfiDemo';
const cmdLine  = tool;
const detector = tool + ' -getInfo';

/**
 * Parsing the output of airport (Mac OS X)
 * @param str output of the tool
 * @param callback
 */
function parseOutput(str, callback) {
  let err   = null;
  let wifis = [];

  try {
    let lines = str.split('\n');

    for (let i = 0, l = lines.length; i < l; i++) {
      if (lines[i] == '') continue;
      wifis.push({
        'ssid'   : lines[i].substr(lines[i].indexOf('ssid=')+5).split(',')[0],
        'mac'    : lines[i].substr(lines[i].indexOf('bssid=')+6,17).trim(),
        'channel': null,
        'rssi'   : lines[i].substr(lines[i].indexOf('rssi=')+5).split(',')[0]
      });
    }
  }
  catch (ex) {
    err = ex;
  }
  finally {
    callback(err, wifis);
  }
}


module.exports = {
  parseOutput: parseOutput,
  cmdLine    : cmdLine,
  detector   : detector,
  tool       : tool
};
