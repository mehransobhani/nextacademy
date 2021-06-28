import React , { useEffect , useState } from "react";
import GraduationCap from "../../UI/Icon/GraduationCap";
import ArrowDown from "../../UI/Icon/ArrowDown";
import ShoppingCart from "../../UI/Icon/ShoppingCart";
import Link from "next/link";
import {useSelector , useDispatch } from "react-redux";
import { useRouter } from 'next/router'
import {fetchCategory} from '../../../redux/actions/index'
import * as constants from '../../constants'

export default function DesktopHeader(props){

    const router = useRouter();

    const [url, setUrl] = useState('');
    const [categories, setCategories] = useState([]);
    const [user, setUser] = useState({id : null ,name : null , mobile : null });

    const dispatch = useDispatch();

    const reduxCategory = useSelector(state => state.category)
    const reduxUser = useSelector(state => state.user_info)

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

    useEffect(() => {

        if (reduxCategory.status === 'idle'){
            dispatch(fetchCategory())
        }
            // array of N elements, where N is the number of rows needed
            const columns = [...Array( Math.ceil(reduxCategory.categories.length / 8 ) )];


            // chunk the products into the array of rows
            const productColumns = columns.map( (row, idx) => reduxCategory.categories.slice(idx * 8, idx * 8 + 8) );

        setCategories(productColumns)

        }, [reduxCategory , dispatch] );




    const content = categories.map((columns, idx) => (
        <div className="col-lg-4" key={idx}>
            <ul>
                { columns.map( (category , idl )=> <li key={idl}>
                    {/*<Link href={"/category/"+category.art_url}>*/}
                    <Link href={"/category/"+category.art_url}>
                        <a >{ category.name }</a>
                    </Link>
                </li>)}
            </ul>
        </div> )
    );


    return(
        <div className={'header-wrapper container-fluid pt-3 px-4'}>
            <div className="row">
                <div className={'col-lg-4'}>
                        <Link  href={'/'}  >
                            <a className="d-inline-flex">
                                <img width={55} height={55} src={constants.classNextURL+"/images/icon/506bd908fac6e6cb98e0527e2878d0f7.png"} alt=""/>
                                <div className="d-flex flex-column pr-2 align-self-end">
                                    <span className={'logo-title'}>هـنـری</span>
                                    <span className={'logo-subtitle'}>تحقق رویای هنرمندانه‌ ی تو</span>
                                </div>
                            </a>
                        </Link>
                </div>
                <div className={'col-lg-8 '}>
                    <nav className="main-menu-nav">
                        <ul className="main-menu">
                            <li className={"has-mega-menu"}>
                                <span className={'cursor-pointer'}>
                                    <GraduationCap />
                                    <span className={'mr-2'}>
                                        کلاس های آموزشی
                                    </span>
                                    <span className={'arrow-down'}>
                                        <ArrowDown />
                                    </span>
                                </span>
                                <div className="mega-menu">
                                    <div className="container-fluid">
                                        <div className="row">
                                            {content}
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <a href="https://honari.com">
                                    <ShoppingCart />
                                    <span  className={'mr-2'}>
                                       فروشگاه
                                    </span>
                                </a>
                            </li>
                            <li className="divider" />
                            <li className="has-dropdown">
                                <a className={"cursor-pointer"} href={user.name ? null : constants.loginURL+"?site=class&callBack="+encodeURIComponent(url) }>
                                    <img src={constants.classNextURL+'/images/icon/20c1062c46f7cc30134ace3cc3823f3e.png'} width={30} height={30} alt=""/>
                                    <span  className={'mr-2 nav-item'}>
                                        { user.name ?
                                            user.name :
                                            'ورود/ثبت نام'
                                        }
                                    </span>
                                    {
                                        user.id ?
                                            <span className={'arrow-down'}>
                                                <ArrowDown/>
                                            </span>
                                            : null
                                    }
                                </a>
                                {
                                    user.id
                                        ?
                                        <ul className="submenu">
                                            <li>
                                                <p>{user.name}</p>
                                                <p>{user.mobile}</p>
                                            </li>
                                            <hr className={"solid mb-3"} />
                                            <li>
                                                <Link href={"/user/courses"} >
                                                    <a>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-card-text" viewBox="0 0 16 16">
                                                            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                                                            <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
                                                        </svg>
                                                        &nbsp;&nbsp;
                                                        دوره های خریداری شده
                                                    </a>
                                                </Link>
                                            </li>
                                            <li>
                                                    <a className={"cursor-pointer"}  onClick={props.logout}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                             fill="currentColor" className="bi bi-file-x" viewBox="0 0 16 16">
                                                            <path d="M6.146 6.146a.5.5 0 0 1 .708 0L8 7.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 8l1.147 1.146a.5.5 0 0 1-.708.708L8 8.707 6.854 9.854a.5.5 0 0 1-.708-.708L7.293 8 6.146 6.854a.5.5 0 0 1 0-.708z" />
                                                            <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                                                        </svg>
                                                        &nbsp;&nbsp;
                                                        خروج از حساب کاربری
                                                    </a>
                                            </li>
                                        </ul>
                                        :
                                        null
                                }
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )

}