const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

// Get the default configuration
const config = getDefaultConfig(__dirname);

// Define additional watch folders
config.watchFolders = [
  path.resolve(__dirname, "node_modules"),
];

// Ensure the resolver doesn't block any packages
config.resolver = {
  ...config.resolver,
  blockList: [],
  extraNodeModules: new Proxy({}, {
    get: (target, name) => path.join(process.cwd(), `node_modules/${name}`)
  }),
  nodeModulesPaths: [path.resolve(__dirname, 'node_modules')]
};

// Add Reanimated to the transformer configuration
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('./metro.transformer.js'),
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  }),
};

// Apply NativeWind configuration
module.exports = withNativeWind(config, { input: "./global.css" });
