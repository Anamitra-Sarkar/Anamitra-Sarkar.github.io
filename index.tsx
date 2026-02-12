import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CustomCursor from './components/ui/CustomCursor';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <CustomCursor />
    <App />
  </React.StrictMode>
);