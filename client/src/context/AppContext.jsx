import React ,{createContext,useState} from 'react'
import axios from 'axios';
import useAuth from '@clerk/clerk-react'
import {  toast } from 'react-toastify';
export const AppContext = createContext();
const AppContextProvider  = (props)=>{
    const [credit , setCredit] = useState(false)
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const {getToken} = useAuth()
    const loadCreditData = async()=>{
try{
const token = await getToken();
const data = await axios.get(`${backendUrl}/api/user/credit`,{headers:{token}});
if(data.success){
    setCredit(data.credit)
}
}catch(err){
console.log(err);
toast.error(err.message)
}
    }
const value={

}
return <AppContext.Provider value = {value}>
{props.children}
</AppContext.Provider>
}
export default AppContextProvider