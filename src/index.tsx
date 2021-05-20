import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Switch,Route} from 'react-router-dom'
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import Login from "./Login";
import App from './App';

ReactDOM.render(
  <React.StrictMode>
   <HashRouter>
       <Switch>
           <Route path='/login' component={Login}/>
           <Route component={App}/>
       </Switch>
   </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
