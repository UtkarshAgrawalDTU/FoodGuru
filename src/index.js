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
  apiKey: "AIzaSyAmne7uAwupywEfVRdU8d9wuklBfofaP7U",
  authDomain: "foodguru-18724.firebaseapp.com",
  projectId: "foodguru-18724",
  storageBucket: "foodguru-18724.appspot.com",
  messagingSenderId: "937849525346",
  appId: "1:937849525346:web:9e037de12fcf2b2d396d3b",
  measurementId: "G-W2W35N9YPY"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();


const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store= {store}><App /></Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
