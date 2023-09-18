import React from 'react'

const useIdString = () => {
  const [id, setId] = React.useState<string>('')

  React.useLayoutEffect(() => {
    if (!id) {
      const id = Math.random().toString(36).substring(2, 10)
      setId(`${'interunit'}-${id}`)
    }
  }, [id])
  return id
}

export {useIdString}
