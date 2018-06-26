const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const program = require('commander')
const prettier = require('prettier')
const utils = require('./utils')

const pkg = utils.getPackageInfo()

program
  .version('0.1.0')
  .option('-n, --name <name>', "component's name.")
  .option('-C, --no-content', 'generate empty files without content.')
  .parse(process.argv)

const componentName =
  (typeof program.name == 'string' && program.name) ||
  (program.args && program.args[0]) ||
  undefined

if (!componentName) {
  console.log(
    chalk.red("Component's name is required.\nUse\n"),
    chalk.cyan('  "npm run gen -- [args] name"'),
    chalk.red(' or\n'),
    chalk.cyan('  "npm run gen -- -n name"'),
    chalk.red(' or\n'),
    chalk.cyan('  "npm run gen -- --name=name"')
  )
  return
}

const componentClassName =
  componentName[0].toUpperCase() + componentName.slice(1)

const isComponentExisted = fs.existsSync(
  utils.rootPathTo(`./src/${componentName}`)
)

if (isComponentExisted) {
  console.log(chalk.red('Component is already existed.'))
  return
}

const srcPath = utils.rootPathTo('./src/')

fs.mkdirSync(path.join(srcPath, componentName))
fs.mkdirSync(path.join(srcPath, componentName, 'style'))
fs.mkdirSync(path.join(srcPath, componentName, 'test'))
fs.mkdirSync(path.join(srcPath, componentName, 'doc'))
fs.mkdirSync(path.join(srcPath, componentName, 'doc', 'demo'))

const componentRoot = path.join(srcPath, componentName)
const indexScriptFile = fs.openSync(path.join(componentRoot, 'index.js'), 'w')
const indexSassFile = fs.openSync(
  path.join(componentRoot, 'style', 'index.scss'),
  'w'
)
const indexTestFile = fs.openSync(
  path.join(componentRoot, 'test', 'index.test.js'),
  'w'
)
const readmeDocFile = fs.openSync(
  path.join(componentRoot, 'doc', 'readme.md'),
  'w'
)
const basicDemoFile = fs.openSync(
  path.join(componentRoot, 'doc', 'demo', 'basic.md'),
  'w'
)

const generateFileContent = function(name) {
  const fileTmpl = {
    indexScript: `import React from 'react'

                  import './style/index.scss'
                  
                  export class ${componentClassName} extends React.Component {
                    render() {}
                  }`,
    indexSass: ``,
    indexTest: `import React, { Component } from 'react'
                import { render, mount } from 'enzyme'
                import ${componentClassName} from '..'
                
                describe('${componentClassName}', () => {})`,
    readmeDoc: `---
                category: Components
                title: ${componentClassName}
                subtitle: 中文名称
                cols: 1
                ---
                
                ## 何时使用

                ## API
                
                | 参数 | 说明 | 类型 | 默认值 |
                | --- | --- | --- | --- |
                `,
    basicDemo: `---
                order: 0
                title:
                \tzh-CN: 基础使用
                \ten-US: 
                ---

                ## zh-CN
                DEMO介绍

                \`\`\`\`jsx
                import { ${componentClassName} } from '${pkg.name}';
                
                ReactDOM.render(
                    <${componentClassName}></${componentClassName} >
                , mountNode);
                \`\`\`\`                            
                `
  }
  const prettierConfig = JSON.parse(
    fs.readFileSync(utils.rootPathTo('./.prettierrc'))
  )
  const prettierParser =
    name == 'readmeDoc' || name == 'basicDemo' ? 'markdown' : 'babylon'

  return prettier.format(
    fileTmpl[name].replace(/(\r|\n|\r\n)\u0020+/g, '$1'),
    Object.assign({}, prettierConfig, {
      parser: prettierParser
    })
  )
}

if (program.content) {
  fs.writeSync(indexScriptFile, generateFileContent('indexScript'))
  fs.writeSync(indexSassFile, generateFileContent('indexSass'))
  fs.writeSync(indexTestFile, generateFileContent('indexTest'))
  fs.writeSync(readmeDocFile, generateFileContent('readmeDoc'))
  fs.writeSync(basicDemoFile, generateFileContent('basicDemo'))
}

fs.close(indexScriptFile)
fs.close(indexSassFile)
fs.close(indexTestFile)
fs.close(readmeDocFile)
fs.close(basicDemoFile)

const componentsEntry = fs.openSync(path.join(srcPath, 'index.js'), 'a')
fs.writeSync(
  componentsEntry,
  `\nexport { default as ${componentClassName} } from './${componentName}'\n`
)
fs.close(componentsEntry)

console.log(chalk.green('generate done.'))
