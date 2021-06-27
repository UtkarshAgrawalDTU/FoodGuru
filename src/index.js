import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers/rootReducer'
import firebase from "firebase/app"
import 'firebase/firestore';
import 'firebase/analytics';


var firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY_FIREBASE,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
var storage = firebase.storage();

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store= {store}><App /></Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
