
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Collapse from '@material-ui/core/Collapse';
import React, {useEffect} from "react";
import Link from "next/link";
import {useSelector , useDispatch } from "react-redux";
import Router from "next/router";
import {fetchCategory} from '../../../../redux/actions/index'
import * as constants from "../../../constants";

const useStyles = makeStyles({
    list: {
        direction : 'rtl',
        width: 280,
        padding: '30px 20px',
    },
});

export default function Drawer(props) {

    const reduxCategory = useSelector(state => state.category);

    const dispatch = useDispatch();

    const classes = useStyles();

    const [state, setState] = React.useState({
        expanded: false,
        searchValue: ''
    });

    useEffect(() => {
        if (reduxCategory === 'idle') {
            dispatch(fetchCategory())
        }
    }, [reduxCategory, dispatch])


    const handleExpandClick = () => {
        setState({ ...state, expanded: !state.expanded });

    };

    const submitSearch = (event) => {
        event.preventDefault();
        Router.push('/search?q=' + state.searchValue);
        setState({
            ...state,
            searchValue: ''
        });
        props.toggleDrawer(false)

    }

    const handleSearchChange = (event) => {
        setState({
            ...state,
            searchValue: event.target.value
        })
    }


    const list = (
        <div
            className={clsx(classes.list) + ' mobile-drawer'}
        >
            <div className="header-mobile-dynamic-menu-logo-wrapper">
                <a><img width={50} height={50} src={constants.classNextURL+"/images/icon/506bd908fac6e6cb98e0527e2878d0f7.png"} alt="هنری دات کام" /></a>
                <div className={"logo-content"}>
                    <h2>هنری</h2>
                    <p>آموزش، الگو، مواد اولیه</p>
                </div>
            </div>
            <ul className={"mt-4"}>
                <li>
                    <div onClick={handleExpandClick} className={"cursor-pointer d-flex justify-content-between align-items-center"}>
                        <span>هنر ها</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-arrow-down-short" viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                  d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z" />
                        </svg>
                    </div>
                    <Collapse in={state.expanded} timeout="auto" unmountOnExit>

                        <ul className={"mobile-drawer-collapse"}>
                            {
                                reduxCategory.categories.map(
                                    category => <li key={category.id}><Link href={'/category/'+category.art_url}><a onClick={(event) => props.toggleDrawer(false)}>{category.name}</a></Link></li>
                                )
                            }
                        </ul>
                    </Collapse>
                </li>
                <li><a onClick={(event) => props.toggleDrawer(false)} href="https://honari.com">فروشگاه</a></li>
                <li>
                    <a href="https://honari.com/stepbysteps/buy_training/آموزش-نحوه-ثبت-نام-در-سایت،-خرید-و-عضویت-در-کلاس-های-مجازی">نحوه خرید</a>
                </li>
            </ul>

            <form className={"mobile-drawer-search"} onSubmit={(event) => submitSearch(event)} >
                <input value={state.searchValue} onChange={handleSearchChange}  type="text" placeholder={"چی دوست داری یاد بگیری؟"} />
                <button className={"btn"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-search" viewBox="0 0 16 16">
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                </button>
            </form>
        </div>
    );

    return (
        <SwipeableDrawer anchor={'right'}
                         open={props.isDrawerOpen}
                         onClose={(event) => props.toggleDrawer(false)}
                         onOpen={(event) => props.toggleDrawer(true)}>
            {list}
        </SwipeableDrawer>
    )

}