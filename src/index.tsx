import * as React from 'react'
import screenfull from 'screenfull'

function requestFullscreen(
  elevent?: Element | Event | React.MouseEvent,
): Promise<void> {
  if (screenfull.isEnabled) {
    if (screenfull.isFullscreen) {
      if (elevent && 'target' in elevent && elevent.target instanceof Element) {
        const element =
          elevent instanceof Element
            ? elevent
            : 'target' in elevent && elevent.target instanceof Element
            ? elevent.target
            : null

        if (element === screenfull.element) {
          screenfull.exit()
        }
      }
    }
    if (!elevent) {
      return screenfull.request()
    } else if (elevent instanceof Element) {
      return screenfull.request(elevent)
    } else if ('target' in elevent && elevent.target instanceof Element) {
      return screenfull.request(elevent.target)
    } else {
      return screenfull.request()
    }
  }
  return Promise.resolve()
}

type UseScreenfull = {
  isFullscreen: boolean
  requestFullscreen: (
    element?: Element | Event | React.MouseEvent,
  ) => Promise<void>
  toggle: () => Promise<void>
}

function useScreenfull(): UseScreenfull {
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

  const toggle = React.useMemo(
    () => () => {
      if (screenfull.isEnabled) {
        return screenfull.toggle()
      }

      return Promise.resolve()
    },
    [],
  )

  React.useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.on('change', handler)
    }
    return () => {
      if (screenfull.isEnabled) screenfull.off('change', handler)
    }
  }, [])

  return { isFullscreen, requestFullscreen, toggle }
}

function useScreenfullError() {
  const [error, setError] = React.useState<Event | null>(null)

  React.useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.on('error', setError)
    }
    return () => {
      if (screenfull.isEnabled) screenfull.off('error', setError)
    }
  }, [])

  return error
}

export { useScreenfull, useScreenfullError }
