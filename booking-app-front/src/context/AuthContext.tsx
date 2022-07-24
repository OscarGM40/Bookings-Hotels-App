import { createContext, useEffect, useReducer } from 'react'

interface AuthContextProps {
  user: any
  loading: boolean
  error: any
  dispatch: any
}

export const AuthContext = createContext({} as AuthContextProps)

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem('user')!) || null,
  loading: false,
  error: null
}
const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        user: null,
        loading: true,
        error: null
      }
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        loading: false,
        error: null
      }
    case 'LOGIN_FAILURE':
      return {
        user: null,
        loading: false,
        error: action.payload
      }
    case 'LOGOUT':
      return {
        user: null,
        loading: false,
        error: null
      }
    default:
      return state
  }
}

interface AuthContextProviderProps {
  children: any
}
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE)

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user))
  }, [state.user])

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
