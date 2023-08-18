import { createContext, useState } from "react";
export const UserContext = createContext(null);

function UserDetails({children}){
    const [userDetails,setUserDetails] = useState();
    return(
        <UserContext.Provider value={{userDetails,setUserDetails}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserDetails;