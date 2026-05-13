const fs = require('fs')
const path = require('path')

const versionFile = path.resolve(__dirname, '../version.json')
const version = JSON.parse(fs.readFileSync(versionFile, 'utf-8'))

// patch +1, 满 10 进位
version.patch += 1
if (version.patch >= 10) {
  version.patch = 0
  version.minor += 1
  if (version.minor >= 10) {
    version.minor = 0
    version.major += 1
  }
}

fs.writeFileSync(versionFile, JSON.stringify(version, null, 2) + '\n')

const versionStr = `V${version.major}.${version.minor}.${version.patch}`
console.log(versionStr)