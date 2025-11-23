import React, { createContext } from 'react'
const userDataContext = createContext();

const UserContext = ({children}) => {
    const [User, setUser] = useState({
        fullName: {
            firstName: '',
            lastName: ''
        },
        email: '',
    })
  return (
    <div>
        <UserContext.Provider value={{User, setUser}}>
            {children}
        </UserContext.Provider>
    </div>
  )
}

export default UserContext