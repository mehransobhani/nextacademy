import React, { useState , useEffect } from 'react'
import Modal from '../../components/UI/Modal/ErrorModal'

const withErrorHandler = (WrappedComponent, axios) => {
    const Theme = (props) => {

        const [error,setError] = useState(false);

        const requestInterceptor = axios.interceptors.request.use(req => {
            setError(false);
            return req;
        })
        const responseInterceptor = axios.interceptors.response.use(res => res, error=>{
            setError(error);
            return Promise.reject(error);
        })

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(requestInterceptor)
                axios.interceptors.request.eject(responseInterceptor)
            }
        }, [])



        return (
            <React.Fragment>
                {
                    error ? <Modal title={"مشکلی در برقراری ارتباط پیش آمده."} description={" لطفا دوباره تلاش کنید."} open={true} /> : null
                }
                <WrappedComponent {...props} />
            </React.Fragment>
        )
    }

    if(WrappedComponent.getInitialProps) {
        Theme.getInitialProps = WrappedComponent.getInitialProps
    }

    return Theme
}

export default withErrorHandler