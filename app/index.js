import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import './app.scss';

let initialState = {
  requests: [
    {
      "id": "1",
      "name": "version",
      "method": "GET",
      "url": "https://mds-moonshotdev.cloud.pcftest.com/api/version"
    },
    {
      "id": "2",
      "name": "services :-)",
      "method": "GET",
      "url": "https://mds-moonshotdev.cloud.pcftest.com/api/services"
    },
    {
      "id": "3f4gd",
      "name": "kabisa",
      "method": "GET",
      "url": "http://kabisa.nl"
    }
  ]
};

const store = configureStore(initialState);

render(
  <Provider store={store}>
    <Router>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);

if (process.env.NODE_ENV !== 'production') {
  // Use require because imports can't be conditional.
  // In production, you should ensure process.env.NODE_ENV
  // is envified so that Uglify can eliminate this
  // module and its dependencies as dead code.
  // require('./createDevToolsWindow')(store);
}
