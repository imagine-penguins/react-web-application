import React from 'react';
import ReactDOM from 'react-dom';



import App from './App';
// import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'font-awesome/css/font-awesome.min.css';

//............Css for Calander......................
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
// import LoginModel from './components/Login/LoginModel';



ReactDOM.render(


  <App />

  ,
  document.getElementById('root')
);
