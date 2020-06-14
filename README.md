# use-screenfull

> React hook for [screenfull.js](https://github.com/sindresorhus/screenfull.js)

[![NPM](https://img.shields.io/npm/v/use-screenfull.svg)](https://www.npmjs.com/package/use-screenfull) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-screenfull
```

## Usage

```tsx
import * as React from 'react'

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
```

## License

MIT © [albinekb](https://github.com/albinekb)
