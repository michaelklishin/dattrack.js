var vows = require('vows'),
    assert = require('assert'),
  dt = require("../lib/dattrack");

vows.describe("Channel id resolution").addBatch({
  "given as et": {
    topic: function () {
        return "et";
    },
    "is an alias for Epic Trance": function (topic) {
        assert.equal(175, dt.channelIdForGenre(topic));
    }
  },

  "given as epictrance": {
    topic: function () {
        return "epictrance";
    },
    "is an alias for Epic Trance": function (topic) {
        assert.equal(175, dt.channelIdForGenre(topic));
    }
  },

  "given as ldnb": {
    topic: function () {
        return "ldnb";
    },
    "is an alias for Liquid DnB": function (topic) {
        assert.equal(105, dt.channelIdForGenre(topic));
    }
  }
}).export(module);

vows.describe("Channel URL calculation").addBatch({
  "for et": {
    topic: function () {
        return "et";
    },
    "is calculated for Epic Trance": function (topic) {
        assert.equal("http://api.audioaddict.com/v1/di/track_history/channel/175.json", dt.recentTrackListURLForGenre(topic));
    }
  }
}).export(module);


vows.describe("Ad recognition").addBatch({
  "for a playlist item that has no ad property": {
    topic: function () {
        return {track: "SoundLift - Revenge (Original Mix)"};
    },
    "returns false": function (topic) {
      assert.isFalse(dt.isAdvertisement(topic));
    }
  },
  "for a playlist item that does have ad property": {
    topic: function () {
        return {track: "SoundLift - Revenge (Original Mix)", ad: {}};
    },
    "returns true": function (topic) {
      assert.isTrue(dt.isAdvertisement(topic));
    }
  }
}).export(module);
