import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AppProvider } from './context/AppContext.jsx'

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// custom css
import './assets/css/style.css';
import './assets/css/responsive.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
)
