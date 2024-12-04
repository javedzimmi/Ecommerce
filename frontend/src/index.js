import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import { Provider } from "react-redux";
import store from './Store';
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import alertTmplate from "react-alert-template-basic";

const  options ={

  timeout:5000,
   
  position:positions.BOTTOM_CENTER,

  transition:transitions.SCALE,
  
}




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} >
    <AlertProvider template={alertTmplate} {...options}>
      <App />
    </AlertProvider>

  </Provider>
);

