import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'; // 경로 변경
// import firebase from "./firebase"; // 현재는 콘솔에 찍어보기 위해 import 한 것
// console.log(firebase)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

