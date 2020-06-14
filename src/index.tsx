import * as React from 'react'
import screenfull from 'screenfull'

export const useScreenfull = () => {
  const [isFullscreen, setIsFullscreen] = React.useState(
    screenfull.isEnabled && screenfull.isFullscreen,
  )

  const handler = React.useCallback(() => {
    if (screenfull.isEnabled) {
      console.log('Am I fullscreen?', screenfull.isFullscreen ? 'Yes' : 'No')
      setIsFullscreen(screenfull.isFullscreen)
    } else {
      console.log('Screenfull not enabled')
    }
  }, [])

  React.useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.on('change', handler)
    }
    return () => {
      if (screenfull.isEnabled) screenfull.off('change', handler)
    }
  }, [])

  return { isFullscreen }
}
