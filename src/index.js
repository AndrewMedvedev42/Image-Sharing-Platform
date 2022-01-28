import React from 'react';
import ReactDOM from 'react-dom';
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

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
