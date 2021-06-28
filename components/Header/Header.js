import React, {useEffect, useState} from "react";
import DesktopHeader from './DesktopHeader/DesktopHeader';
import MobileHeader from './MobileHeader/MobileHeader';
import {useCookies} from 'react-cookie';
import axiosInstance from "../axiosInstance";
import * as constants from "../constants"
import {toast, ToastContainer} from "react-toastify";
import {useDispatch} from "react-redux";
import {setUserInfo} from '../../redux/actions/index'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';




const header = (props) => {


    const [loading , setLoading] = useState(false);
    const [cookies , setCookie , removeCookie] = useCookies();
    const dispatch = useDispatch()

    useEffect( () => {
            if (props.user_info){
                dispatch(setUserInfo(props.user_info));
            }
        }
        , [])


    const logout = () => {
        localStorage.removeItem("erxes");
        setLoading(true);
        axiosInstance.post(constants.apiURL+'/api/logout' , {
            serverToken : cookies.user_server_token
        })
            .then((response) => {
                if(response.data.success){
                    setLoading(false);
                    removeCookie("class_token" , { domain: constants.cookieURL ,path: '/' });
                    removeCookie("user_server_token" , { domain: constants.cookieURL ,path: '/' });
                    window.location.reload(false);
                } else {
                    setLoading(false);
                    toast.error('مشکلی پیش آمد لطفا دوباره تلاش کنید یا با پشتیبانی ارتباط برقرار کنید', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }




        return(
            <React.Fragment>
                {
                    <Backdrop style={{zIndex : 8000 , color : '#ffffff'}} open={loading} >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                }
                <header className='header text-right dir-rtl shadow-sm position-relative'>
                    <div className={'d-none d-lg-block'}>
                        <DesktopHeader logout={logout} />
                    </div>
                    <div className={'d-lg-none'}>
                        <MobileHeader logout={logout} />
                    </div>
                </header>
            </React.Fragment>
        )


}

export default header