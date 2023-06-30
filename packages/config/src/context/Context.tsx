import React from 'react'

import {type InterUnitConfig} from '../config'

const InterUnitInternalContext = React.createContext({})

const InterUnitInternalProvider = <T extends unknown>({
  config,
  children
}: {
  config: InterUnitConfig<T>
  children: React.ReactNode
}) => {
  return (
    <InterUnitInternalContext.Provider value={{...config}}>
      <>{children}</>
    </InterUnitInternalContext.Provider>
  )
}

const useInterUnitInternalContext = <T extends unknown>() => {
  return React.useContext(InterUnitInternalContext) as InterUnitConfig<T>
}

export {
  InterUnitInternalProvider,
  InterUnitInternalContext,
  useInterUnitInternalContext
}
