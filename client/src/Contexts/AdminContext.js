import { createContext, useState } from "react";
export const AdminContext = createContext(null);

function AdminDetails({children}){
    const [adminDetails,setAdminDetails] = useState(null);
    
    return(
        <AdminContext.Provider value={{adminDetails,setAdminDetails}}>
            {children}
        </AdminContext.Provider>
    )
}
export default AdminDetails;