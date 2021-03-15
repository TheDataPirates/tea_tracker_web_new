import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


ReactDOM.render(
    <App/>
    ,
    document.getElementById('root')
);

//findNod warning will be remove when delete stricMode tag
// StrictMode is a tool for highlighting potential problems in an application. It activates additional checks and warnings for its descendants, such as:
//
//     Identifying components with unsafe lifecycles
// Warning about legacy string ref API usage
// Warning about deprecated findDOMNode usage
// Detecting unexpected side effects
// Detecting legacy context API