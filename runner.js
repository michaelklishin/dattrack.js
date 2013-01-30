#!/usr/bin/env node

var dt = require("./lib/dattrack"),
    pb = require("./lib/dattrack/pastebin"),
  util = require("util"),
  _    = require("underscore"),
  inspect = require("eyes").inspector(),
  cmd     = require("commander");

cmd
.version("1.0.0")
.option("-c, --channel [channel]", "di.fm channel to use", "epictrance")
.option("-l, --limit [limit]", "How many recent tracks to display", 5)
.option("-C, --copy", "Copy the topmost non-advertisement track to the pastebin")
.parse(process.argv);


function displayAdTrack(item) {
  util.puts("* /advertisement/");
}

function formatMusicTrack(item) {
  if(dt.missingArtistOrTitle(item)) {
    return util.format("%s", item.track.replace(/\s-\s/, " — "));
  } else {
    return util.format("%s — %s", item.artist, item.title);
  }
}

function displayMusicTrack(item) {
  util.puts(util.format("* %s", formatMusicTrack(item)));
}

function displayTrack(item) {
  if(dt.isAdvertisement(item)) {
    displayAdTrack(item);
  } else {
    displayMusicTrack(item);
  }
}

function maybeCopyToClipboard(items) {
  if(cmd.copy != undefined && cmd.copy != null) {
    util.puts("\n\n");
    var f = _.find(items, function(item) { return !dt.isAdvertisement(item); }),
        s = formatMusicTrack(f);

    util.puts(util.format("Copying %s", s));
    pb.copy(s);
  }    
}

util.puts(util.format("Showing %d most recent tracks in %s\n", cmd.limit, dt.humanNameForGenre(cmd.channel)));

dt.recentTracksForGenre(cmd.channel, function(xs) {
  var ys = _.take(xs, cmd.limit);
  _.map(ys, displayTrack);

  maybeCopyToClipboard(ys);
}, function(err, response) {
  util.puts(util.format("Got an error: %s\n%s", err));
  inspect(response);
});
