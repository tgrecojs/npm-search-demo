import React from 'react';
import {render} from 'react-dom';
import './index.css';
import AxiosApp from './axios';
import Layout from './shared/Layout';
require('dotenv').config();
console.log(process.env);
const App = () => (
  <Layout>
    <AxiosApp/>
  </Layout>
);

render(<App />, document.getElementById('root'));
