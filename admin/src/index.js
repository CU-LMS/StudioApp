import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { SlotStatusContextProvider } from './context/SlotStatusContext';
import { RouterProvider } from 'react-router-dom';
import {router} from './App'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <SlotStatusContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </SlotStatusContextProvider>
  </AuthContextProvider>
);


