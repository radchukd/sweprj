import React, { createContext } from 'react';
import {
  login,
  logout,
  loadUsers,
  deleteUser,
  addUser,
  sendEmail,
  loadProfile,
  updateProfile,
  HR_TOKEN,
  USER_TOKEN
} from './helpers'

const AppContext = createContext();
const AppContextProvider = ({ children }) => {
  return(
    <AppContext.Provider 
      value={{
        HR_TOKEN,
        USER_TOKEN,
        login,
        logout,
        loadUsers,
        deleteUser,
        addUser,
        sendEmail,
        loadProfile,
        updateProfile
      }}
    >
      { children }
    </AppContext.Provider>
  );
};

export const withContext = (Component) => {
  return (props) => {
    return (
      <AppContext.Consumer>
        {
          (globalState) => {
            return (
              <Component
                {...globalState}
                {...props}
              />
            )
          }
        }
      </AppContext.Consumer>
    )
  }
};

export default AppContextProvider;
