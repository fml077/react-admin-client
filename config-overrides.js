const {override, fixBabelImports, addLessLoader} = require('customize-cra');

module.exports = override(
  // 针对antd实现按需打包：根据import来打包（使用babel-plugin-import）
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true // 加载less文件，`style: css` 会加载 css 文件
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {'@primary-color': '#1DA57A'}
  })
)