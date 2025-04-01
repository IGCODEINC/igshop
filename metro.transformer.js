const { transform } = require('@babel/core');
const { generateFunctionMap } = require('metro-source-map');

module.exports.transform = async ({
  filename,
  options,
  src,
  plugins = [],
}) => {
  const customOptions = Object.assign({}, options);
  
  // Use metro-react-native-babel-preset
  customOptions.presets = [
    [require('metro-react-native-babel-preset')]
  ];
  
  // Add Reanimated plugin when processing Reanimated files
  if (filename.includes('react-native-reanimated')) {
    plugins.push(['react-native-reanimated/plugin']);
  }
  
  const { ast, code, map } = await transform(src, {
    ...customOptions,
    ast: true,
    code: true,
    filename,
    plugins,
    sourceMaps: true,
    configFile: false,
  });
  
  return {
    ast,
    code,
    functionMap: generateFunctionMap(ast, { filename }),
    map,
  };
}; 