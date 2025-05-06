/*import 'react-native-get-random-values';
// No need to directly import @ethersproject/shims here


global.Buffer = require("buffer").Buffer;

// Needed so that 'stream-http' chooses the right default protocol.
global.location = {
  protocol: "file:",
};

global.process.version = "v16.0.0";
if (!global.process.version) {
  global.process = require("process");
  console.log({ process: global.process });
}

process.browser = true;*/


global.Buffer = require("buffer").Buffer;

// Needed so that 'stream-http' chooses the right default protocol.
global.location = {
  protocol: "file:",
};

global.process.version = "v16.0.0";
if (!global.process.version) {
  global.process = require("process");
  console.log({ process: global.process });
}

process.browser = true;