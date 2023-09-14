// TODO: This is broken with build changes
const {ApiModel} = require('@microsoft/api-extractor-model')
const {Extractor, ExtractorConfig} = require('@microsoft/api-extractor')
const path = require('path')
const fsAsync = require('node:fs/promises')
const fsSync = require('fs')

const markdownTypesDirectory = path.join(
  __dirname,
  '../../apps/interunit-dot-dev/public/generated/markdown-types'
)
const configFileName = 'api-extractor.json'

// Get packages that have an api-extractor.json file (packages that we want to generate types for)
function getRelevantPackages() {
  const relevantPackages = fsSync
    .readdirSync(path.join(__dirname, '../../packages'))
    .filter(pkg => {
      return fsSync.existsSync(
        path.join(__dirname, '../../packages', pkg, configFileName)
      )
    })

  return relevantPackages
}

// Run the extractor from @microsoft/api-extractor on package
// so we can use the output to generate files
async function runExtractorOnPackage(packagePath) {
  try {
    const apiExtractorJsonPath = path.join(
      __dirname,
      '../../packages',
      packagePath,
      configFileName
    )

    const preparedExtractorConfig =
      ExtractorConfig.loadFileAndPrepare(apiExtractorJsonPath)

    const extractorResult = Extractor.invoke(preparedExtractorConfig, {
      localBuild: true
    })

    if (!extractorResult.succeeded) {
      throw new Error(
        `API Extractor completed with ${extractorResult.errorCount} errors` +
          ` and ${extractorResult.warningCount} warnings` +
          ` (see ${apiExtractorJsonPath})`
      )
    }
  } catch (e) {
    console.error(`Error when running extractor on "${packagePath}": `, e)
  }
}

async function createDirectory(directory) {
  if (!fsSync.existsSync(directory)) {
    try {
      await fsAsync.mkdir(directory, {recursive: true})
    } catch (e) {
      console.error(`Error when creating directory "${directory}": `, e)
    }
  }
}

async function deleteDirectoryContents(directory) {
  await fsAsync.rm(directory, {recursive: true, force: true})
}

async function deleteFile(filePath) {
  await fsAsync.unlink(filePath)
}

// Get all type references from a package and format them
// for later use
function getTypeReferences(members) {
  const typeReferences = []

  members?.members?.forEach(member => {
    const packageName = member.getAssociatedPackage().displayName
    let type = ''
    if (member.kind === 'TypeAlias') {
      member.excerptTokens.forEach(token => {
        type += token.text
      })
      if (type) {
        typeReferences.push({name: member.displayName, type, packageName})
      }
    }
  })

  return typeReferences
}

// Create markdown files based on the type references
// and put them in the public folder of
// interunit-dot-dev (markdownTypesDirectory)
async function createMarkdownFiles(types) {
  types.map(async type => {
    const directory = path.join(markdownTypesDirectory, type.packageName)
    if (!fsSync.existsSync(directory)) {
      fsSync.mkdirSync(directory, {recursive: true})
    }
    const markdown = type.type
    const markdownPath = path.join(
      markdownTypesDirectory,
      `${type.packageName}/${type.name}.md`
    )
    await fsAsync.writeFile(markdownPath, markdown, err => {
      if (err) throw err
    })
  })
}

async function createEtcPaths(packagePath) {
  const etcPath = path.join(__dirname, '../../', packagePath, 'etc')
  await createDirectory(etcPath)
}

// Generation & cleanup of files
async function modelAPI(packagePath) {
  try {
    const packageName = packagePath.split('/').pop()

    const apiJsonPath = path.join(
      __dirname,
      '../../',
      packagePath,
      'temp',
      `${packageName}.api.json`
    )

    const apiModel = new ApiModel()
    const apiPackage = apiModel.loadPackage(apiJsonPath)
    const members = apiPackage.findMembersWithInheritance()

    const types = members.items
      .map(getTypeReferences)
      .filter(t => t && t.length)
      .flat()

    await deleteDirectoryContents(markdownTypesDirectory)
    createMarkdownFiles(types)

    console.log(`Successfully generated files for "${packagePath}"`)
  } catch (e) {
    console.error(`Error when generating files for "${packagePath}": `, e)
  }
}

async function cleanup(packagePath) {
  const etcPath = path.join(__dirname, '../../', packagePath, 'etc')
  const tempDirectory = path.join(__dirname, '../../', packagePath, 'temp')
  const generatedDeclarationPath = path.join(
    __dirname,
    '../../packages',
    packagePath,
    `dist/index.d.ts`
  )
  const tsDocMetadataPath = path.join(
    __dirname,
    '../../packages',
    packagePath,
    'dist/tsdoc-metadata.json'
  )

  await deleteDirectoryContents(tempDirectory)
  await deleteDirectoryContents(etcPath)
  await deleteFile(generatedDeclarationPath)
  await deleteFile(tsDocMetadataPath)
}

async function main() {
  // Get only packages that contain an api-extractor.json file
  const packages = getRelevantPackages()

  await Promise.all(packages.map(createEtcPaths))

  // Run API Extractor on each package
  packages.forEach(runExtractorOnPackage)

  console.log('')

  // TODO: only run on successful extractions
  packages.forEach(modelAPI)

  // Cleanup temp files
  packages.forEach(cleanup)
}

main()
