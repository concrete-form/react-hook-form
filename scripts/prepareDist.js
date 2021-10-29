const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '../')
const dist = path.resolve(root, 'dist')

const packageRawFile = fs.readFileSync(path.join(root, 'package.json'))
  .toString()
  .replace(/\.\/dist\//g, './')

const distPackage = JSON.parse(packageRawFile)

delete distPackage.scripts
delete distPackage.devDependencies
delete distPackage.resolutions
delete distPackage.jest
delete distPackage.eslintConfig
delete distPackage.browserslist

distPackage.dependencies = Object.fromEntries(
  Object.entries(distPackage.dependencies ?? {}).filter(([_, dependency]) => !/^[file|link]+:/.test(dependency)),
)

fs.writeFileSync(path.join(dist, 'package.json'), JSON.stringify(distPackage, undefined, 2))

fs.copyFileSync(path.join(root, 'README.md'), path.join(dist, 'README.md'))
