var rest = require("restler"),
  util = require("util"),
  fn   = require("./dattrack/fn");

// stolen from restler by Dan Webb [MIT license]
function mixin(target, source) {
  source = source || {};
  Object.keys(source).forEach(function(key) {
    target[key] = source[key];
  });

  return target;
}

var genreToId = {
  "psy": 8,
  "goa": 8,
  "goapsy": 8,
  "breaks": 15,
  "break": 15,
  "psytrance": 8,
  "trance": 1,
  "electrohouse": 56,
  "eh": 56,
  "liquiddnb": 105,
  "ldnb": 105,
  "epictrance": 175,
  "et": 175,
  "handsup": 176,
  "hu": 176,
  "clubdubstep": 177,
  "clubds": 177,
  "glitchhop": 198,
  "gh": 198
};

var nameToHumanName = {
  "psy": "Goa & Psy Trance",
  "goa": "Goa & Psy Trance",
  "goapsy": "Goa & Psy Trance",
  "psytrance": "Goa & Psy Trance",
  "trance": "Trance",
  "electrohouse": "Electro House",
  "eh": "Electro House",
  "liquiddnb": "Liquid DnB",
  "ldnb": "Liquid DnB",
  "epictrance": "Epic Trance",
  "et": "Epic Trance",
  "handsup": "Hands Up",
  "hu": "Hands Up",
  "clubdubstep": "Club Dubstep",
  "clubds": "Club Dubstep",
  "glitchhop": "Glitch Hop",
  "gh": "Glitch Hop"
};

function channelIdForGenre(genre) {
  return genreToId[genre];
}

function humanNameForGenre(genre) {
  return nameToHumanName[genre];
}

function recentTrackListURLForGenre (genre) {
  return "http://api.audioaddict.com/v1/di/track_history/channel/" + channelIdForGenre(genre) + ".json";
};

function isBlank(s) {
  return (s === undefined || s === null || s.trim() === "");
}

function missingArtistOrTitle(item) {
  return isBlank(item.artist) || isBlank(item.title);
}

function hasArtist(item) {
  return !missingArtist(item);
}

function isAdvertisement(item) {
  return item.ad != undefined;
}

function recentTracksForGenre(genre, callback, errback) {
  rest.get(recentTrackListURLForGenre(genre)).
  on('complete', callback).
  on('error', errback);
};

mixin(exports, {
  recentTrackListURLForGenre: recentTrackListURLForGenre,
  recentTracksForGenre: recentTracksForGenre,
  channelIdForGenre: channelIdForGenre,
  humanNameForGenre: humanNameForGenre,
  hasArtist: hasArtist,
  missingArtistOrTitle: missingArtistOrTitle,
  isAdvertisement: isAdvertisement,
  isNotAdvertisement: fn.complement(isAdvertisement)
});
