import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from "react-redux"
import {createStore, applyMiddleware, compose} from "redux"
import {rootReducer} from "./redux/reducer/rootReducer";
import thunk from "redux-thunk" 

import App from './App';
import "bootstrap/dist/css/bootstrap.css";
import "./styles/css/index.css"
import "./styles/css/modules/components/navigation-bar.css"
import "./styles/css/modules/log-in-page.css"
import "./styles/css/modules/sign-up-page.css"
import "./styles/css/modules/user-page.css"
import "./styles/css/modules/submit-image-page.css";
import "./styles/css/main-page.css"
import "./styles/css/modules/image-preview-page.css"
import "./styles/css/modules/landing-page.css"

import reportWebVitals from './reportWebVitals';

const composeEnchancer = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)  || compose

const store = createStore(rootReducer , composeEnchancer(applyMiddleware(thunk)))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
