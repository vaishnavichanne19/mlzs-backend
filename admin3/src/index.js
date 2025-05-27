import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import Login from './Auth/Login';
// import Register from './Auth/Register';

// function usePathname() {
//   const [pathname, setPathname] = useState(window.location.pathname);

//   useEffect(() => {
//     const handlePopState = () => {
//       setPathname(window.location.pathname);
//     };

//     window.addEventListener('popstate', handlePopState);
//     return () => {
//       window.removeEventListener('popstate', handlePopState);
//     };
//   }, []);

//   return pathname;
// }

// function AppWrapper() {
//   const token = localStorage.getItem('token');
//   const pathname = usePathname();

//   let ComponentToRender;

//   if (pathname === '/') {
//     ComponentToRender = <Login />;
//   } else if (pathname === '/register') {
//     ComponentToRender = <Register />;
//   } else {
//     ComponentToRender = token ? <App /> : <Login />;
//   }

//   return ComponentToRender;
// }

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <AppWrapper />
//   </React.StrictMode>
// );


