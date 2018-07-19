const webpackMerge = require('webpack-merge');

const utils = require('../build-tools/utils');

const webpackDevConfig = require(utils.rootPathTo('./build-tools/webpack.dev.config'));
const pkg = utils.getPackageInfo();
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    port: 8081,
    source: {
        introduce: './readme.md',
        components: './src'
    },
    output: isDev ? './_site' : './site_dist',
    theme: './site/theme',
    htmlTemplate: './site/theme/static/template.html',
    themeConfig: {
        categoryOrder: {
            Introduction: 0,
            Components: 1
        },
        typeOrder: {}
    },
    filePathMapper(filePath) {
        if (filePath === '/index.html') {
            return ['/index.html', '/index-cn.html'];
        }
        if (filePath.endsWith('/index.html')) {
            return [filePath, filePath.replace(/\/index\.html$/, '-cn/index.html')];
        }
        if (filePath !== '/404.html' && filePath !== '/index-cn.html') {
            return [filePath, filePath.replace(/\.html$/, '-cn.html')];
        }
        return filePath;
    },
    doraConfig: {
        verbose: true,
        plugins: ['dora-plugin-upload']
    },
    webpackConfig(config) {
        if (isDev) {
            // 修改开发环境下的bisheng默认webpack配置
            // 直接替换默认配置，添加必要的bishengloader
            config = webpackMerge(webpackDevConfig, {
                module: {
                    rules: [
                        {
                            test(filename) {
                                return (
                                    filename === require.resolve('bisheng/lib/utils/data') || filename === require.resolve('bisheng/lib/utils/ssr-data')
                                );
                            },
                            loader: require.resolve('bisheng/lib/loaders/bisheng-data-loader')
                        }
                    ]
                }
            });
        } else {
            // 修改生成发布环境下的bisheng默认webpack配置
            // 使用bishneg默认配置，进行修改
            config = webpackMerge(config, {
                resolve: {
                    alias: {
                        [pkg.name]: utils.rootPathTo('./index'),
                        site: utils.rootPathTo('./site'),
                        'antd/lib': 'antd/es',
                        'react-router': 'react-router/umd/ReactRouter'
                    }
                },
                externals: {
                    'react-router-dom': 'ReactRouterDOM'
                }
                // plugins: [new CSSSplitWebpackPlugin({ size: 4000 })]
            });
            config.module.rules.forEach(rule => {
                if (rule.loader === 'babel-loader') {
                    rule.options.plugins.unshift([
                        'import',
                        { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }
                    ]);
                }
            });
        }
        return config;
    },

    htmlTemplateExtraData: {
        isDev
    }
};
