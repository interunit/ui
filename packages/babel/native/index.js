module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      'babel-preset-expo',
      'module:metro-react-native-babel-preset',
      ['@babel/preset-env', {targets: {esmodules: false, node: 'current'}}]
    ],
    plugins: [
      ['@babel/plugin-proposal-class-properties', {loose: true}],
      ['@babel/plugin-transform-private-methods', {loose: true}]
    ]
  }
}
