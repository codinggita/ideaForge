import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { store } from './store'
import AppThemeProvider from './components/theme/AppThemeProvider.jsx'
import ErrorBoundary from './components/common/ErrorBoundary.jsx'
import ToastHost from './components/common/ToastHost.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <AppThemeProvider>
          <ErrorBoundary>
            <AuthProvider>
              <App />
              <ToastHost />
            </AuthProvider>
          </ErrorBoundary>
        </AppThemeProvider>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>,
)
