import React, { useContext, useState } from 'react';
import { ToastProvider } from 'react-toast-notifications'
import { Route, RouteComponentProps } from 'react-router';
import { Switch } from 'react-router-dom';

import Dashboard from './dashboard';
import ErrorPage from './error';
import { BlockUi } from './shared';

interface AppContextGetterProps {
  loadingMessage?: string
}

export interface AppContextProps extends AppContextGetterProps {
}

const AppContext = React.createContext<AppContextProps>({
  loadingMessage: undefined
});

export const useAppContext = () => useContext(AppContext);

const App: React.FC<RouteComponentProps> = () => {

  const [state] = useState<AppContextGetterProps>({
    loadingMessage: undefined,
  });

  const showLoading = state.loadingMessage ? true : false;

  return (
    <ToastProvider autoDismissTimeout={3000} placement='bottom-right'>
      <div id='app'>
        <div className='page'>
          <AppContext.Provider
            value={{
              loadingMessage: state.loadingMessage
            }}
          >
            <Route path={`/error`} component={ErrorPage} />
            {showLoading && <BlockUi blocking text={state.loadingMessage} className='full-page-loading' />}
            {!showLoading && (
              <Switch>
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/' component={Dashboard} exact />
              </Switch>
            )}
          </AppContext.Provider>
        </div>
      </div>
    </ToastProvider >
  );
}

export default App;
