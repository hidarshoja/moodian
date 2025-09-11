import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {  RouterProvider } from 'react-router-dom'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { route } from './route.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={route}>
          <App />
        </RouterProvider>
      </Provider>
  </React.StrictMode>,
)
