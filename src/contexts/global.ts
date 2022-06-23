import { createContext } from 'react';

export namespace GlobalApi {
  export type State = {
    score: number;
    player: string;
  };

  export type Context = {
    state: State;
    setState: React.Dispatch<React.SetStateAction<Partial<State>>>;
  };
}

export const DEFAULT_STATE: GlobalApi.Context = {
  state: {
    score: 0,
    player: 'mario',
  },
  setState: () => {},
};

export const GlobalContext = createContext<GlobalApi.Context>(DEFAULT_STATE);
