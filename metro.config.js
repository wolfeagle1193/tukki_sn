// Learn more https://docs.expo.io/guides/customizing-metro
/*const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
/*const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  assert: require.resolve("empty-module"), // assert can be polyfilled here if needed
  http: require.resolve("empty-module"), // stream-http can be polyfilled here if needed
  https: require.resolve("empty-module"), // https-browserify can be polyfilled here if needed
  os: require.resolve("empty-module"), // os-browserify can be polyfilled here if needed
  url: require.resolve("empty-module"), // url can be polyfilled here if needed
  zlib: require.resolve("empty-module"), // browserify-zlib can be polyfilled here if needed
  path: require.resolve("empty-module"),
  crypto: require.resolve("crypto-browserify"),
  stream: require.resolve("readable-stream"),
  buffer: require.resolve("buffer"),
};

config.transformer.getTransformOptions = () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

module.exports = config;*/

/*const { getDefaultConfig } = require("expo/metro-config");
/** @type {import('expo/metro-config').MetroConfig} */
/*const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  // Replace empty modules with actual polyfills
  assert: require.resolve("assert"),
  http: require.resolve("stream-http"),
  https: require.resolve("https-browserify"),
  os: require.resolve("os-browserify/browser"),
  url: require.resolve("url"),
  zlib: require.resolve("browserify-zlib"),
  path: require.resolve("path-browserify"),
  crypto: require.resolve("crypto-browserify"),
  stream: require.resolve("readable-stream"),
  buffer: require.resolve("buffer"),
  // Also add these for ethers.js
  fs: require.resolve("expo-file-system"),
};

config.transformer.getTransformOptions = () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

module.exports = config;*/

/*const { getDefaultConfig } = require("expo/metro-config");
/** @type {import('expo/metro-config').MetroConfig} */
//const config = getDefaultConfig(__dirname);

//config.resolver.extraNodeModules = {
  // Use empty-module for everything you don't have installed
  /*assert: require.resolve("empty-module"),
  http: require.resolve("empty-module"),
  https: require.resolve("empty-module"),
  os: require.resolve("empty-module"),
  url: require.resolve("empty-module"),
  zlib: require.resolve("empty-module"),
  path: require.resolve("empty-module"),
  fs: require.resolve("empty-module"),
  stream: require.resolve("empty-module"),
  // Only reference modules you've successfully installed
  crypto: require.resolve("empty-module"),
  buffer: require.resolve("buffer"), // If you installed buffer
};

config.transformer.getTransformOptions = () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

module.exports = config;


/*const { getDefaultConfig } = require("expo/metro-config");
/** @type {import('expo/metro-config').MetroConfig} */
/*const config = getDefaultConfig(__dirname);

// Don't use any extraNodeModules for now
// Just comment out or remove the entire extraNodeModules section

config.transformer.getTransformOptions = () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

module.exports = config;*/

/*const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/** @type {import('@react-native/metro-config').MetroConfig} */
/*const config = getDefaultConfig(__dirname);

// Supprimer ou commenter la section extraNodeModules si elle existe
// config.resolver.extraNodeModules = {
//   // vos mappings ici
// };

config.transformer.getTransformOptions = () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

// Exporter la configuration
module.exports = mergeConfig(config);*/




// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  assert: require.resolve("empty-module"), // assert can be polyfilled here if needed
  http: require.resolve("empty-module"), // stream-http can be polyfilled here if needed
  https: require.resolve("empty-module"), // https-browserify can be polyfilled here if needed
  os: require.resolve("empty-module"), // os-browserify can be polyfilled here if needed
  url: require.resolve("empty-module"), // url can be polyfilled here if needed
  zlib: require.resolve("empty-module"), // browserify-zlib can be polyfilled here if needed
  path: require.resolve("empty-module"),
  crypto: require.resolve("crypto-browserify"),
  stream: require.resolve("readable-stream"),
  buffer: require.resolve("buffer"),
};

config.transformer.getTransformOptions = () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

module.exports = config;