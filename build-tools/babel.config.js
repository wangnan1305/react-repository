module.exports = {
  presets: [
    require.resolve('babel-preset-react'),
    [
      require.resolve('babel-preset-env'),
      {
        targets: {
          browsers: [
            'last 2 versions',
            'Firefox ESR',
            '> 1%',
            'ie >= 9',
            'iOS >= 8',
            'Android >= 4'
          ]
        }
      }
    ]
  ],
  plugins: [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }], // babel-plugin-import，用于自动导入antd组件的css
    require.resolve('babel-plugin-add-module-exports'),
    require.resolve('babel-plugin-transform-es3-member-expression-literals'),
    require.resolve('babel-plugin-transform-es3-property-literals'),
    require.resolve('babel-plugin-transform-object-assign'),
    require.resolve('babel-plugin-transform-class-properties'),
    require.resolve('babel-plugin-transform-object-rest-spread')
  ]
}
