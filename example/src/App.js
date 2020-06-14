import React from 'react'

import { useScreenfull } from 'use-screenfull'

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
    </div>
  )
}
export default App
