import React from 'react';
import ReactDom from 'react-dom';
import App from './app';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDom.render(
<Router>
    <App url='http://localhost:3000/api/posts'/>
 </Router>   ,
document.getElementById('root'));