import React, {useEffect, useState} from "react";
import Drawer from "./Drawer/Drawer";
import Link from "next/link";
import { useRouter } from 'next/router';
import * as constants from '../../constants';
import {useSelector} from "react-redux";

export default function MobileHeader(props) {

    const [url, setUrl] = useState('');
    const [user, setUser] = useState({id : null ,name : null , mobile : null });
    const [state, setState] = useState({
        isDrawerOpen: false,
    });
    const router = useRouter();
    const reduxUser = useSelector(state => state.user_info)


    useEffect(() => setUrl(router.asPath) , []);

    useEffect(() => setUrl(router.asPath), [router]);

    useEffect(() => {
        if(reduxUser.user_id){
            setUser( {
                id : reduxUser.user_id ,
                name : reduxUser.user_name ,
                mobile : reduxUser.user_mobile
            })
        }
        else {
            setUser( {
                id : null ,
                name : null ,
                mobile : null
            })
        }
    }, [reduxUser] );




    const toggleDrawer = (open) => {
        setState({...state, isDrawerOpen: open});
    };


    return (
        <React.Fragment>
            <div className="d-flex justify-content-between mobile-header-wrapper align-items-center">
                <div onClick={(event) => toggleDrawer(true)} className="hamburger">
                    <div className="hamburgerTop"/>
                    <div className="hamburgerMiddle"/>
                    <div className="hamburgerBottom"/>
                </div>
                <div>
                    <Link href={'/'}>
                        <a>
                            <img className={'mobile-header-logo'}
                                 src={constants.classNextURL+"/images/icon/dff2b09fc8652c271c07b29a3edb8341.png"} alt="هنری"/>
                        </a>
                    </Link>
                </div>
                <div className="has-dropdown">
                    {
                        user.id ?
                            <React.Fragment>
                                <img className={'mobile-header-user-icon'} src={constants.classNextURL+"/images/icon/20c1062c46f7cc30134ace3cc3823f3e.png"} alt=""/>
                                <ul className="submenu">
                                    <li>
                                        <p>{user.name}</p>
                                        <p>{user.mobile}</p>
                                    </li>
                                    <hr className={"solid mb-3"}/>
                                    <li>
                                        <Link href={"/user/courses"}>
                                            <a>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-card-text" viewBox="0 0 16 16">
                                                    <path
                                                        d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                                                    <path
                                                        d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
                                                </svg>
                                                &nbsp;&nbsp;
                                                دوره های خریداری شده
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                            <a className={"cursor-pointer"} onClick={props.logout}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-file-x" viewBox="0 0 16 16">
                                                    <path
                                                        d="M6.146 6.146a.5.5 0 0 1 .708 0L8 7.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 8l1.147 1.146a.5.5 0 0 1-.708.708L8 8.707 6.854 9.854a.5.5 0 0 1-.708-.708L7.293 8 6.146 6.854a.5.5 0 0 1 0-.708z"/>
                                                    <path
                                                        d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                                                </svg>
                                                &nbsp;&nbsp;
                                                خروج از حساب کاربری
                                            </a>
                                    </li>
                                </ul>
                            </React.Fragment>
                        :
                            <a href={constants.loginURL+"?site=class&callBack="+encodeURIComponent(url) }><img className={'mobile-header-user-icon'} src={constants.classNextURL+"/images/icon/20c1062c46f7cc30134ace3cc3823f3e.png"} alt=""/></a>
                    }
                </div>
            </div>
            <div className={'mobile-link-wrapper'}>
                <a className={'mobile-link mobile-link-store'} href="https://honari.com">
                    فروشگاه
                </a>
                <Link href={'/'}>
                    <a className={'mobile-link mobile-link-course'} href="">
                        دوره‌های ‌آنلاین آموزشی
                    </a>
                </Link>
                <a className={'mobile-link mobile-link-how-buy'} href="https://honari.com/stepbysteps/buy_training/آموزش-نحوه-ثبت-نام-در-سایت،-خرید-و-عضویت-در-کلاس-های-مجازی">
                    راهنمای خرید
                </a>
            </div>
            <Drawer isDrawerOpen={state.isDrawerOpen} toggleDrawer={toggleDrawer}/>
        </React.Fragment>
    )

}