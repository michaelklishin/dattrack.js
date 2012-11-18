#!/usr/bin/env node

var dt = require("./lib/dattrack"),
  util = require("util"),
  _ = require("underscore"),
  inspect = require("eyes").inspector(),
  cmd = require("commander");

cmd
.version("1.0.0")
.option("-c, --channel [channel]", "di.fm channel to use", "epictrance")
.option("-l, --limit [limit]", "How many recent tracks to display", 5).
parse(process.argv);



function displayAdTrack(item) {
  util.puts("* /advertisement/");
}

function displayMusicTrack(item) {
  if(dt.missingArtist(item)) {
    util.puts(util.format("* %s", item.track));
  } else {
    util.puts(util.format("* %s — %s", item.artist, item.track));
  }
}

function displayTrack(item) {
  if(dt.isAdvertisement(item)) {
    displayAdTrack(item);
  } else {
    displayMusicTrack(item);
  }
}

util.puts(util.format("Showing %d most recent tracks in %s", cmd.limit, cmd.channel));

dt.recentTracksForGenre(cmd.channel, function(xs) {
  _.map(_.take(xs, cmd.limit), displayTrack);
}, function(err, response) {
  util.puts(util.format("Got an error: %s\n%s", err));
  inspect(response);
});
