import React from 'react'

const useSW = () => {
  const [sw, setSw] = React.useState(0)

  React.useEffect(() => {
    const handleResize = () => setSw(window.innerWidth)
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {sw}
}

export {useSW}
