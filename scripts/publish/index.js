import yargsParser from 'yargs-parser'

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
      if (!packageData.private) {
        return {
          name: packageData.name,
          version: packageData.version
        }
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
        packageJson: JSON.stringify(packageData, null, 2).trim()
      }
    })
  )

  const filteredPackageJsonFiles = packageJsonFiles.filter(p => p)

  return filteredPackageJsonFiles
}

async function getPackageJsonFilesWithVersionNumbers(packageVersions) {
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

      const dependencies = packageData?.dependencies ?? null
      const devDependencies = packageData?.devDependencies ?? null

      const newDependencies =
        dependencies &&
        Object.keys(dependencies).reduce((acc, key) => {
          const packageObj = packageVersions.find(p => p.name === key)
          if (!packageObj?.version) {
            return acc
          }
          const version = packageObj.version
          acc[key] = version
          return acc
        }, dependencies)

      const newDevDependencies =
        devDependencies &&
        Object.keys(devDependencies).reduce((acc, key) => {
          const packageObj = packageVersions.find(p => p.name === key)

          if (!packageObj?.version) {
            return acc
          }

          const version = packageObj.version
          acc[key] = version
          return acc
        }, devDependencies)

      const newPackageJson = {
        ...packageData
      }

      if (newDependencies) {
        newPackageJson.dependencies = newDependencies
      }

      if (newDevDependencies) {
        newPackageJson.devDependencies = newDevDependencies
      }

      return {
        packageName: packageData.name,
        packageJson: JSON.stringify(newPackageJson, null, 2).trim()
      }
    })
  )

  const filteredPackageJsonFiles = packageJsonFiles.filter(p => p)

  return filteredPackageJsonFiles
}

async function writePackageJsonFiles(packageJsonFiles) {
  await Promise.all(
    packageJsonFiles.map(async packageJsonFile => {
      await fs.writeFile(
        `./packages/${packageJsonFile.packageName.split('/')[1]}/package.json`,
        packageJsonFile.packageJson
      )
    })
  )
}

async function isPackageAlreadyPublished(packageName, packageVersion) {
  try {
    const viewCommand = await Bun.spawn([
      'npm',
      'view',
      packageName,
      'version',
      '--json'
    ])

    const fetchedPackageVersion = await Bun.readableStreamToText(
      viewCommand.stdout
    )

    const formattedFetchedPackageVersion = fetchedPackageVersion
      .split('"')[1]
      .trim()
    const formattedPackageVersion = packageVersion.toString().trim()

    return formattedFetchedPackageVersion === formattedPackageVersion
  } catch (error) {
    return true
  }
}

async function main() {
  try {
    const args = yargsParser(Bun.argv.slice(2))

    const packageVersions = await getPackageVersions()
    const currentPackageJsonFiles = await getPackageJsonFiles()

    const versionedPackageJsonFiles =
      await getPackageJsonFilesWithVersionNumbers(packageVersions)

    await writePackageJsonFiles(versionedPackageJsonFiles)

    const publishCommand = ['npm', 'publish', '--access', 'public']

    await Promise.all(
      packageVersions.map(async packageVersion => {
        const published = await isPackageAlreadyPublished(
          packageVersion.name,
          packageVersion.version
        )
        if (!published) {
          publishCommand.push(`--workspace`)
          publishCommand.push(packageVersion.name)
        }
      })
    )

    if (args?.otp) {
      publishCommand.push('--otp')
      publishCommand.push(args.otp)
    }

    const publish = await Bun.spawn(publishCommand, {})
    const publishOutput = await Bun.readableStreamToText(publish.stdout)

    console.log(publishOutput)

    await writePackageJsonFiles(currentPackageJsonFiles)
  } catch (error) {
    console.error(error)
  }
}

main()
