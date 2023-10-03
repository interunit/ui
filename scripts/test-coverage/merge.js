const path = require('path')
const fsSync = require('fs')

const CoverageDirectory = '/coverage'

function getRelevantPackages() {
  const relevantPackages = fsSync
    .readdirSync(path.join(__dirname, '../../packages'))
    .filter(pkg => {
      return fsSync.existsSync(
        path.join(__dirname, '../../packages', pkg, CoverageDirectory)
      )
    })

  return relevantPackages
}

function getCoverageDirectories(packages) {
  const webPackages = packages.map(pkg => {
    return path.join(__dirname, '../../packages', pkg, CoverageDirectory, 'web')
  })
  const nativePackages = packages.map(pkg => {
    return path.join(
      __dirname,
      '../../packages',
      pkg,
      CoverageDirectory,
      'native'
    )
  })
  return [...webPackages, ...nativePackages]
}

async function main() {
  const packages = getRelevantPackages()
  const coverageDirectories = getCoverageDirectories(packages)

  const mergeCoverage = await import('@monorepo-template/merge-coverage')

  await mergeCoverage.default(coverageDirectories)
}

main()
