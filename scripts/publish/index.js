import fs from 'fs/promises'

async function getPackageVersions() {
  const allPackages = await fs.readdir('./packages')
  const packageVersions = await Promise.all(
    allPackages.map(async packageName => {
      const packageJsonPath = `./packages/${packageName}/package.json`

      const fileExists = await fs.exists(packageJsonPath)

      if (!fileExists) {
        return
      }

      const packageJson = await fs.readFile(
        `./packages/${packageName}/package.json`
      )
      const packageData = JSON.parse(packageJson)
      return {
        name: packageData.name,
        version: packageData.version
      }
    })
  )

  const filteredPackageVersions = packageVersions.filter(p => p)

  return filteredPackageVersions
}

async function getPackageJsonFiles() {
  const allPackages = await fs.readdir('./packages')
  const packageJsonFiles = await Promise.all(
    allPackages.map(async packageName => {
      const packageJsonPath = `./packages/${packageName}/package.json`

      const fileExists = await fs.exists(packageJsonPath)

      if (!fileExists) {
        return
      }

      const packageJson = await fs.readFile(
        `./packages/${packageName}/package.json`
      )
      const packageData = JSON.parse(packageJson)

      return {
        packageName: packageData.name,
        packageJson: packageData
      }
    })
  )

  const filteredPackageJsonFiles = packageJsonFiles.filter(p => p)

  return filteredPackageJsonFiles
}

async function replaceWorkspaceWithVersionNumber() {}

async function main() {
  const packageVersions = await getPackageVersions()
  const currentPackageJsonFiles = await getPackageJsonFiles()

  console.log(currentPackageJsonFiles)
}

main()
