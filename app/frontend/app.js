// Static assets
import './static/android-chrome-192x192.png'
import './static/android-chrome-512x512.png'
import './static/apple-touch-icon.png'
import './static/favicon.ico'
import './static/favicon-16x16.png'
import './static/favicon-32x32.png'
import './static/site.webmanifest'

// App + React
import React from 'react'
import ReactDom from 'react-dom'

import './socketIoConfig'

const App = () => {
    return <p>Hello!!</p>
}

ReactDom.render(<App />, document.getElementById('app'))
