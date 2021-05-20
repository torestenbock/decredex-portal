import React from 'react'



export function AppProvider({children}) {
  return (
    <AppContext.Provider value={React.useReducer(AppContextReducer, initialState)}>
      {children}
    </AppContext.Provider>
  )
}

const AppContext = React.createContext()
export const useAppContext = () => React.useContext(AppContext)

const AppContextReducer = (state, action) => {
  switch (action.type) {
    default: {
      throw new Error("Unknown reducer action type: " + action.type)
    }
  }
}

const initialState = {

}
