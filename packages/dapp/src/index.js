import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider, createClient } from 'wagmi'
import { connectors, provider } from './utils/connect'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
const client = createClient({
  autoConnect: true,
  connectors,
  provider
})
root.render(
  <Provider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
