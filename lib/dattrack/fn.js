var inspect = require("eyes").inspector();

function complement(f) {
  return function() {
    var result = f.apply(arguments);

    return !!!result;
  };
}

exports.complement = complement;