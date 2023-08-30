const {ApiModel} = require('@microsoft/api-extractor-model')

const {Extractor, ExtractorConfig} = require('@microsoft/api-extractor')
const path = require('path')
const fs = require('fs')

const markdownTypesDirectory = path.join(
  __dirname,
  '../../apps/interunit-dot-dev/public/generated/markdown-types'
)
const configFileName = 'api-extractor.json'

// Get packages based on ones we have in preconstruct config (actual packages)
// and ones that have an api-extractor.json file (packages that we want to generate types for)
function getRelevantPackages() {
  const mainPackageJson = path.join(__dirname, '../../package.json')
  const allPackages = require(mainPackageJson).preconstruct.packages

  const relevantPackages = allPackages.filter(pkg => {
    return fs.existsSync(path.join(__dirname, '../../', pkg, configFileName))
  })

  return relevantPackages
}

// Run the extractor from @microsoft/api-extractor on package
// so we can use the output to generate files
const runExtractorOnPackage = packagePath => {
  const apiExtractorJsonPath = path.join(
    __dirname,
    '../../',
    packagePath,
    configFileName
  )
  const preparedExtractorConfig =
    ExtractorConfig.loadFileAndPrepare(apiExtractorJsonPath)
  const extractorResult = Extractor.invoke(preparedExtractorConfig, {
    // Equivalent to the "--local" command-line parameter
    localBuild: true
  })

  if (extractorResult.succeeded) {
    process.exitCode = 0
  } else {
    console.error(
      `API Extractor completed with ${extractorResult.errorCount} errors` +
        ` and ${extractorResult.warningCount} warnings`
    )
    process.exitCode = 1
  }
}

function createDirectory(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, {recursive: true})
  }
}

function deleteDirectoryContents(directory) {
  fs.rmSync(directory, {recursive: true, force: true})
}

function deleteFile(filePath) {
  fs.unlinkSync(filePath)
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
function createMarkdownFiles(types) {
  types.forEach(type => {
    const directory = path.join(markdownTypesDirectory, type.packageName)
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, {recursive: true})
    }
    const markdown = type.type
    const markdownPath = path.join(
      markdownTypesDirectory,
      `${type.packageName}/${type.name}.md`
    )
    fs.writeFile(markdownPath, markdown, err => {
      if (err) throw err
    })
  })
}

// Generation & cleanup of files
async function modelAPI(packagePath) {
  try {
    const packageName = packagePath.split('/').pop()
    const etcPath = path.join(__dirname, '../../', packagePath, 'etc')

    createDirectory(etcPath)

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

    deleteDirectoryContents(markdownTypesDirectory)
    createMarkdownFiles(types)

    const tempDirectory = path.join(__dirname, '../../', packagePath, 'temp')
    const generatedDeclarationPath = path.join(
      __dirname,
      '../../',
      packagePath,
      `dist/${packageName}.d.ts`
    )
    const tsDocMetadataPath = path.join(
      __dirname,
      '../../',
      packagePath,
      'dist/tsdoc-metadata.json'
    )

    deleteDirectoryContents(tempDirectory)
    deleteDirectoryContents(etcPath)
    deleteFile(generatedDeclarationPath)
    deleteFile(tsDocMetadataPath)

    console.log(`Successfully generated files for "${packagePath}"`)
  } catch (e) {
    console.error(`Error when generating files for "${packagePath}": `, e)
  }
}

function main() {
  // Get only packages that contain an api-extractor.json file
  const packages = getRelevantPackages()

  // Run API Extractor on each package
  packages.forEach(runExtractorOnPackage)

  console.log('')

  // TODO: only run on successful extractions
  packages.forEach(modelAPI)
}

main()
