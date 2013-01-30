var vows = require('vows'),
    assert = require('assert'),
  fn = require("../lib/dattrack/fn");

vows.describe("").addBatch({
  "Complement function": {
    "returns a function that negates the original function's return value": function() {
      assert.isFalse(fn.complement(function() {
	return true;
      })());

      assert.isTrue(fn.complement(function() {
	return false;
      })());

      assert.isFalse(fn.complement(function() {
	return 1;
      })());

      assert.isTrue(fn.complement(function() {
	return 0;
      })());

      assert.isFalse(fn.complement(function() {
	var o = {};
	return (o.prop === undefined);
      })());

      assert.isFalse(fn.complement(function() {
	var o = {prop: "value"};
	return (o.prop != undefined);
      })());
    }
  }
}).export(module);