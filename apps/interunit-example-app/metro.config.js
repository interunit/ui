const path = require('path')
const getWorkspaces = require('get-yarn-workspaces')

async function getConfig(appDir, options = {}) {
  //Get all the workspace
  const workspaces = getWorkspaces(appDir)
  const WORKSPACE_ROOT = path.resolve(__dirname, '../../')

  //Filter all the unnessary paths
  const watchFolders = [
    path.resolve(WORKSPACE_ROOT, 'node_modules'),
    path.resolve(appDir, 'node_modules'),
    ...workspaces.filter(
      workPath =>
        !workPath
          .split('/')
          .pop()
          .match(/[.].*|src|dist|packages|components/) &&
        !workPath.match('node_modules/')
    )
  ]

  return {
    isCSSEnabled: true,
    watchFolders,
    resetCache: true,
    resolver: {
      nodeModulesPaths: watchFolders,
      disableHierarchicalLookup: false
    },
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true
        }
      })
    }
  }
}

module.exports = (async () => await getConfig(__dirname))()
