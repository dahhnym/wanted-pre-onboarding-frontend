import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './store/auth-context';
import { TodoContextProvider } from './store/todo-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TodoContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </TodoContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
