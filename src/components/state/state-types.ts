

interface AppState {
  loading: boolean
  loadingMessage?: string
}

type AppActions =
  | { type: 'setLoading', loading: boolean, message?: string }

export interface State {
  app: AppState
}

export type Action =
  | AppActions

export type Dispatch = (action: Action) => void;