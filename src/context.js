import React from 'react'
import { ethers } from 'ethers'

import Decredex from 'abi/Decredex'



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
    case 'CHANGE_ACCOUNT':
      return {
        ...state,
        account: action.value
      }
    default: {
      throw new Error("Unknown reducer action type: " + action.type)
    }
  }
}

// ,
//   signer: provider.getSigner(action.value.id)
// } : null

const provider = new ethers.providers.JsonRpcProvider("http://10.0.2.2:8545")
const initialState = {
  account: null,
  provider: provider,
  decredex: Decredex,
  accounts: {
    institution:  "0x916B6ec3a7a9D926374dE1206bfca14BDD59F1A1",
    government:   "0x3dF652154A43A44fF551D7ed2fa2738cee5e356e",
    workplace:    "0xc23FbE5481d6F5f3AeF85C42a859a3494dCACba6",
    students: [
      ["Student 1", "0x88316dF325044cfc226C369b6b32275E3cA782E5"],
      ["Student 2", "0xf867b117470b6Be8F6Fe6d1e34CaA35e61EDDe85"],
      ["Student 3", "0xEbe6719b26ebf13EC28AEC3Df236C5a89CD86C26"]
    ]
  }
}
