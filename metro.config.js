const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

// 1. Get the default Expo config
const config = getDefaultConfig(__dirname);

// 2. Configure ONLY SVG handling
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
  unstable_allowRequireContext: true,
};
config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"), // Remove SVG from assetExts
  sourceExts: [...config.resolver.sourceExts, "svg"], // Add SVG to sourceExts
};
config.unstable_allowRequireContext=true;
// 3. Apply NativeWind (if needed)
module.exports = withNativeWind(config, { input: "./global.css" });