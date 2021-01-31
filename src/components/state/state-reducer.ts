import { useReducer } from 'react';
import { createContext } from 'use-context-selector';

import { State, Action, Dispatch } from './state-types'
import * as Helper from './state-helper'
import { initialState } from './initial-state'

const reducer = (previousState: State, action: Action) => {
  switch (action.type) {
    case 'setLoading': return Helper.update(previousState, (state) => {
      state.app.loading = action.loading;
      state.app.loadingMessage = action.message;
    });
  }
}

export const useAppReducer = () => useReducer(reducer, initialState);
export const AppContext = createContext<[State, Dispatch]>([initialState, () => null]);