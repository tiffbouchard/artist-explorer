import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import UserProvider from "./context/userContext";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route } from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <Route component={App} />
      </Router>  
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
