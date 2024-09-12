import { withExpo } from "@expo/next-adapter";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reanimated doesn't work with strict mode currently...
  // https://github.com/software-mansion/react-native-reanimated/issues/6264
  // https://github.com/software-mansion/react-native-reanimated/issues/3573
  // once that gets fixed, set this back to true
  reactStrictMode: false,
  transpilePackages: [
    "react-native-web",
    "react-native-reanimated",
    "react-native-css-interop",
    "nativewind",
    "@shopify/flash-list",
    "expo",
    "expo-modules-core",
    "react-native-vector-icons",
    "@expo/vector-icons",
    "@react-native/assets-registry",
    "@roninoss/icons",
    "react-native-uitextview",
    "@react-native-community/datetimepicker",
    // Add the failing React Native / Expo package here and restart the server...
  ],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(ttf|otf|eot|woff|woff2)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "static/fonts/",
          publicPath: "/_next/static/fonts/",
        },
      },
    });
    return config;
  },
};

export default withExpo(nextConfig);
