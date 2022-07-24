import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'

// import i18n (needs to be bundled ;))
import '../i18n'
import { SearchContextProvider } from './context/SearchContext'
import { AuthContextProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Suspense fallback='...Is loading'>
    <AuthContextProvider>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </AuthContextProvider>
  </Suspense>
)
