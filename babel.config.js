module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@assets': './assets/',
          '@components': './src/components',
          '@feature': './src/feature',
          '@models': './src/models',
          '@navigators': './src/navigators',
          '@screens': './src/screens',
          '@theme': './src/theme',
          '@app': './src/app',
        },
      },
    ],
    ['react-native-reanimated/plugin'],
  ],
};
