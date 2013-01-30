var os    = require("os"),
    spawn = require("child_process").spawn,
    util  = require("util");

function copyOnOSX(content) {
  var pcopy = spawn("pbcopy");

  pcopy.stdin.write(content);
  pcopy.stdin.end();
}

function copy(content) {
  switch(os.platform()) {
    case 'darwin':
      copyOnOSX(content);
      break;
  }
}

exports.copy  = copy;