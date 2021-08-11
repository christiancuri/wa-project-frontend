import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Store } from '@store';

import { publicRoutes } from './routers';
import { Route } from './routers/Route';

export default function App(): ReactElement {
  return (
    <div className="surface-1 h-screen">
      <Provider store={Store}>
        <ToastContainer />
        <BrowserRouter>
          <Switch>
            {publicRoutes.map((props, key) => (
              <Route {...props} key={key} />
            ))}
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}
