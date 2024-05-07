import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ToDoListMaker from './ToDoListMaker';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToDoListMaker />
  </React.StrictMode>
);

reportWebVitals();