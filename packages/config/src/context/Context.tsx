import React from 'react'
import {ThemeProvider, useTheme, withTheme} from 'styled-components'

import {type InterUnitConfig} from '../config'

const InterUnitInternalContext = React.createContext({})

const InterUnitInternalProvider = ({
  config,
  children
}: {
  config: InterUnitConfig
  children: React.ReactElement
}) => {
  return (
    <InterUnitInternalContext.Provider value={{...config}}>
      <ThemeProvider theme={config?.theme ?? {}}>{children}</ThemeProvider>
    </InterUnitInternalContext.Provider>
  )
}

const useInterUnitInternalContext = () => {
  return React.useContext(InterUnitInternalContext)
}

export {
  InterUnitInternalProvider,
  InterUnitInternalContext,
  useInterUnitInternalContext,
  useTheme,
  withTheme
}
