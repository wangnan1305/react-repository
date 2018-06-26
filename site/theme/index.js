require('core-js/es6/string')
const path = require('path')

const contentTmpl = './template/Content/index'
const redirectTmpl = './template/Redirect'

module.exports = {
  lazyLoad(nodePath, nodeValue) {
    if (typeof nodeValue === 'string') {
      return true
    }
    return nodePath.endsWith('/demo')
  },
  pick: {
    introduce(markdownData) {
      if (/^\.\/readme\.md/.test(markdownData.meta.filename))
        return {
          meta: markdownData.meta
        }
    },
    components(markdownData) {
      const { filename } = markdownData.meta
      if (!/^src/.test(filename) || /[/\\]demo$/.test(path.dirname(filename)))
        return

      return {
        meta: markdownData.meta
      }
    },
    changelog(markdownData) {
      if (/CHANGELOG/.test(markdownData.meta.filename)) {
        return {
          meta: markdownData.meta
        }
      }
    }
  },
  plugins: [
    'bisheng-plugin-description',
    'bisheng-plugin-toc?maxDepth=2&keepElem',
    'bisheng-plugin-antd',
    'bisheng-plugin-react?lang=__react'
  ],
  routes: {
    path: '/',
    component: './template/Layout/index',
    indexRoute: {
      component: redirectTmpl
    },
    childRoutes: [
      {
        path: 'introduce/',
        component: contentTmpl
      },
      {
        path: 'components/:children/',
        component: contentTmpl
      }
    ]
  }
}
