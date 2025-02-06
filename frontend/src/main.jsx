import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux';
import store from "./store/store.js";
import App from './App.jsx'
import { Outlet } from "react-router-dom";
import Chatbot from './components/ChatBot.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <Outlet />
      <Chatbot />
      <App />
    </StrictMode>
  </Provider>
)
