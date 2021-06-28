import axios from "axios";
import * as constants from './constants'
import {isJson, parseCookies} from "./helpers";
import {toast} from "react-toastify";




const instance = axios.create({
    baseURL: constants.apiURL
});

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (typeof window !== 'undefined') {
        const token = parseCookies(document.cookie.class_token).class_token;

        config.headers.Authorization = `Bearer ${token}`;

    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    toast.error('مشکلی پیش آمد لطفا دوباره تلاش کنید یا با پشتیبانی ارتباط برقرار کنید', {
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response && error.response.status === 401){

        document.cookie = "class_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;domain = "+constants.cookieURL;
        document.cookie = "user_server_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;domain = "+constants.cookieURL;
        //localStorage.removeItem("auth_token");

    }
    return Promise.reject(error);
});

export default instance;