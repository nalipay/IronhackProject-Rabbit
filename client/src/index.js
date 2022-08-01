import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import { AuthProviderWrapper } from './context/auth';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
  <AuthProviderWrapper>
    <App />
  </AuthProviderWrapper>
</BrowserRouter>
);

reportWebVitals();
