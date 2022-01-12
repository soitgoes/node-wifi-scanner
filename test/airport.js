/**
 * Airport unit test
 * Created by kc on 04.04.16.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const airport = require('../lib/airport');

describe('airport', () => {
  it('parses the output of file 1', function(done) {
    airport.parseOutput(fs.readFileSync(path.join(__dirname, 'fixtures','airport','airport01.txt'), { encoding: 'utf8' }), (err, info) => {

      assert.ok(info);
      assert.equal(info.length, 52);

      let ap = info[0];
      assert.equal(ap.mac, '9c:8c:d8:2d:02:d2');
      assert.equal(ap.ssid, '(null)');
      assert.equal(ap.rssi, -89);
      assert.strictEqual(ap.channel, null);

      ap = info[19];
      assert.equal(ap.mac, '9c:8c:d8:2d:02:d5');
      assert.equal(ap.ssid, '(null)');
      assert.equal(ap.rssi, -90);
      assert.strictEqual(ap.channel, null);

      ap = info[25];
      assert.equal(ap.mac, 'f4:2e:7f:ec:ac:06');
      assert.equal(ap.ssid, '(null)');
      assert.equal(ap.rssi, -89);
      assert.strictEqual(ap.channel, null);

      done(err);
    });
  });

});
