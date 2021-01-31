import React from 'react';
import { ToastProvider } from 'react-toast-notifications'
import { Route, RouteComponentProps } from 'react-router';
import { Switch } from 'react-router-dom';

import { StateProvider, useAppContext } from './state';
import Dashboard from './dashboard';
import ErrorPage from './error';
import { BlockUi } from './shared';

const AppBody: React.FC<RouteComponentProps> = () => {

  const loading = useAppContext(s => s.app.loading);
  const loadingMessage = useAppContext(s => s.app.loadingMessage);

  return (
    <div id='app'>
      <div className='page'>
        <Route path={`/error`} component={ErrorPage} />
        {loading && <BlockUi blocking text={loadingMessage} className='full-page-loading' />}
        <Switch>
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/' component={Dashboard} exact />
        </Switch>
      </div>
    </div>
  );
}

export const App: React.FC<RouteComponentProps> = (props) => {

  return (
    <StateProvider>
      <ToastProvider autoDismissTimeout={3000} placement='bottom-right'>
        <AppBody {...props} />
      </ToastProvider >
    </StateProvider>
  );
}
