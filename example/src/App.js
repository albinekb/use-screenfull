import React from 'react'

import { useScreenfull } from 'use-screenfull'

const Example = () => {
  const { isFullscreen, toggle, requestFullscreen } = useScreenfull()
  const scale = isFullscreen ? 1 : 0.1
  return (
    <div>
      {isFullscreen ? 'yes' : 'no'}{' '}
      <img
        onClick={requestFullscreen}
        src="https://placekitten.com/1920/1080"
        width={1920 * scale}
        height={1080 * scale}
      />
    </div>
  )
}

const App = () => {
  const { isFullscreen, toggle, requestFullscreen } = useScreenfull()
  const imgRef = React.useRef()
  const openImage = React.useMemo(
    () => () => {
      requestFullscreen(imgRef.current)
    },
    [imgRef.current],
  )
  return (
    <div>
      {isFullscreen ? 'yes' : 'no'} <button onClick={toggle}>Toggle</button>
      <br />
      <br />
      <img
        onClick={openImage}
        ref={imgRef}
        src="https://placehold.it/200x200"
      ></img>
      <img onClick={requestFullscreen} src="https://placehold.it/300x300"></img>
      <Example />
    </div>
  )
}
export default App
