import axios from "axios"
import { baseUrl } from "../URL";
import { toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const addtoCart = (proId,navigate,user) => {
    if(user !== null){
        axios.get(`${baseUrl}/addToCart/${proId}`,{withCredentials:true}).then((res)=>{
            toast.success('product added ', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
                });
        }).catch((err)=>{
            toast.error('an error occured ', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
                });
        })
    }else{
        navigate('/login')
    }
}