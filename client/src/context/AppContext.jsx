import React, { createContext, useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import { useAuth, useUser, useClerk } from "@clerk/clerk-react";
import { toast } from "react-toastify";
export const AppContext = createContext();
const AppContextProvider = (props) => {
  const [credit, setCredit] = useState(false);
  const [image, setImage] = useState();
  const [resultImage, setResultImage] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { getToken } = useAuth();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  //this is navigate function 
  const navigate  = useNavigate()
  const loadCreditData = async () => {
    try {
      const token = await getToken();
      //console.log("Token sent to backend:", token);
      const res = await axios.get(`${backendUrl}/api/user/credit`, {
        headers: { token },
      });
      const data = await res.data;

      if (data.success) {
        setCredit(data.credits);
        console.log("credit ", data.credits);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  //remove  bg
  const removeBg = async (image) => {
   // console.log(image);
    try {
      if (!isSignedIn) {
        return openSignIn;
      }
      setImage(image);
      setResultImage(false);
       navigate('/result');
       const token = await getToken();
        const formData = new FormData();
        image && formData.append('image',image);
        const {data} = await axios.post(backendUrl+'/api/image/remove-bg',formData,{headers:{token}});
        if(data.success){
          setResultImage(data.resultImage);
          data.creditBalance && setCredit(data.creditBalance);
          
        }
        else{
          toast.error(data.message);
          data.creditBalance && setCredit(data.creditBalance);
          if(data.creditBalance===0){
            navigate('/buy');
          }
        }
    } catch (err) {}
  };
  const value = {
    backendUrl,
    credit,
    setCredit,
    loadCreditData,
    image,
    setImage,
    removeBg,
    resultImage,
    setResultImage

  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
