import React from 'react'
import { useContextSelector } from 'use-context-selector'

import { useAppReducer, AppContext } from './state-reducer'
import { State } from './state-types'

export function useAppContext<T>(selector: (value: State) => T) {
  return useContextSelector(AppContext, (([state]) => selector(state)));
}

export const useDispatch = () => {
  return useContextSelector(AppContext, ([, dispatch]) => dispatch);
}

export const StateProvider: React.FC = ({ children }) => {

  const [state, dispatch] = useAppReducer();

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  )
}
