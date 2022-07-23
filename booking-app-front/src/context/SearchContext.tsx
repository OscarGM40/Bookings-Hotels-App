import { createContext, useReducer } from 'react'

interface SearchContextProps {
  city: string;
  dates: any;
  options: any,
  dispatch: any
}
export const SearchContext = createContext({} as SearchContextProps)

const INITIAL_STATE = {
  city: null,
  dates: [],
  options: {
    adult: null,
    children: null,
    room: null
  },
}
const SearchReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'NEW_SEARCH':
      return action.payload
    case 'RESET_SEARCH':
      return INITIAL_STATE
    default:
      return state
  }
}

interface SearchContextProviderProps {
  children: any
}
export const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE)

  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        dispatch
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
