import React,{ useState , useEffect} from "react";
import * as constants from "../../components/constants"
import CheckOutModal from "../../components/Course/CourseSingle/CheckOutModal";
import Head from "next/head";
import Breadcrumb from "../../components/UI/Breadcrumb/Breadcrumb";
import {LazyLoadImage} from "react-lazy-load-image-component";
import Link from "next/link"

const Bundle = props => {

    const [ checkOutModal , setCheckOutModal] = useState(false)

    const checkOutModalButton = () => {
        setCheckOutModal(!checkOutModal)
    }
    return (
        <React.Fragment>

                <Head>
                    <title>هنری | {props.bundle.name}</title>
                    <meta name="description" content={props.bundle.summary}/>
                </Head>
                <Breadcrumb data={[
                    {
                        name: 'هنری آکادمی',
                        url: '/'
                    },
                    {
                        name: props.bundle.name
                    },
                ]}/>


                <div id={'class_view_page'} className={'dir-rtl'}>
                    <div className="container-fluid">
                        <h1 className="text-center class_title_top">{props.bundle.name}</h1>
                        <div className="row">
                            <div className="col-lg-7">
                                <LazyLoadImage
                                    wrapperClassName={"class-cover box"}
                                    effect="blur"
                                    src={constants.imageURL + '/classes/' + props.bundle.cover_img}/>
                            </div>
                            <div className="col-lg-5 mt-2 mt-lg-0">
                                <div className="class-data box">
                                    {
                                        props.bundle.is_owner ?
                                            <a href={"https://telegram.me/share/url?url=" + constants.classNextURL + props.currRouteURI}
                                               className="btn class-btn">ارسال برای دوستان</a> :
                                            <button className="btn class-btn" onClick={checkOutModalButton}>خرید بسته آموزشی</button>
                                    }
                                    <div className="class-det d-flex justify-content-between">

                                    </div>
                                    <div className="class_feature p-2 text-right">
                                        <p className={'mb-2'}>با عضویت در کلاس :</p>
                                        <ul>
                                            <li>
                                                1 - برای آشنایی با روند و کیفیت اموزشی ، جلسه اول به رایگان در اختیار
                                                شما قرارداده شده است.
                                            </li>

                                            <li>
                                                2 - هرگونه اشکال خود در زمینه ی آموزش یا محتوای کلاس ها را از طریق چت
                                                داخل سایت سوال کنید.
                                            </li>

                                            <li>
                                                3 - هر کلاس آموزشی دارای بسته مواد و ابزار می باشد که درصورت خرید بسته
                                                مواد و ابزارمربوط به هر کلاس ، آن کلاس برای شما با ۳۰٪ تخفیف در دسترس
                                                خواهد بود.
                                            </li>

                                            <li>
                                                4 - آموزش ها ی هر جلسه همراه با متن ، عکس های مرحله به مرحله و یا فیلم
                                                آموزشی می باشد.
                                            </li>

                                        </ul>
                                    </div>
                                    <div>
                                        {
                                            props.bundle.off > 0 ?
                                                <div
                                                    className={'class-price d-flex justify-content-center align-items-center'}>
                                                    <span>&nbsp;هزینه دوره :&nbsp;</span>
                                                    <del>&nbsp;{props.bundle.price.toLocaleString('en')} تومان&nbsp;</del>
                                                    <span>&nbsp;{props.bundle.off.toLocaleString('en')} تومان&nbsp;</span>
                                                    <img src={constants.classNextURL + "/images/icon/medal.png"}
                                                         alt="medal"/>
                                                </div>
                                                :
                                                <div
                                                    className={'class-price d-flex justify-content-center align-items-center'}>
                                                    <span>&nbsp;هزینه دوره :&nbsp;</span>
                                                    <span>&nbsp;{props.bundle.price.toLocaleString('en')} تومان&nbsp;</span>
                                                    <img src={constants.classNextURL + "/images/icon/medal.png"}
                                                         alt="medal"/>
                                                </div>
                                        }
                                    </div>
                                    {
                                        props.bundle.is_owner ? null :
                                            <a onClick={checkOutModalButton}
                                               className={'have-discount-code cursor-pointer'}>کد تخفیف دارم</a>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4 mb-5">
                            <div className="col-12 mt-4 mt-md-0">
                                <div className="class-description box h-100 p-3 text-right">
                                    <div className="my-4">
                                        <img alt="paper" className={'ml-3'}
                                             src={constants.classNextURL + "/images/icon/paper.png"}/>
                                        توضیحات دوره
                                    </div>
                                    <div dangerouslySetInnerHTML={{__html: props.bundle.description}}/>
                                </div>
                            </div>
                        </div>

                        <div className="mb-2">
                            <div className="d-flex align-items-center">
                                <img alt="laptop" className={'ml-3'}
                                     src={constants.classNextURL + "/images/icon/laptop.png"}/>
                                این بسته آموزشی شامل دوره های زیر است
                            </div>
                        </div>
                    </div>
                    <div className="lessons_section text-right mt-4">
                        <div className="container-fluid">
                            {
                                props.bundle.related.map((course, i) => {
                                    return <div className="row" key={i}>
                                        <div className="col-lg-11 col-12 mx-auto">
                                            <div className="course-summary d-flex">
                                                    <Link href={'/courses/' + encodeURI(course.urlfa)}>
                                                        <a  className="lesson-thumbnail">
                                                            <LazyLoadImage
                                                                wrapperClassName={'step-image-wrapper'}
                                                                effect="blur"
                                                                alt={course.name}
                                                                src={constants.imageURL + '/classes/_600_300/' + course.cover_img}/>
                                                        </a>
                                                    </Link>
                                                <div className="lesson-info">
                                                        <Link href={'/courses/' + encodeURI(course.urlfa)}>
                                                            <a>
                                                                <h2 className="lesson-title">{course.name}</h2>
                                                            </a>
                                                        </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>

                </div>


            <CheckOutModal course={props.bundle} checkOutModalButton={checkOutModalButton}
                           open={checkOutModal}/>
        </React.Fragment>
    )
}

Bundle.getInitialProps = async (ctx , token) => {
    const { query , asPath } = ctx;


    let data = {};
    const target = encodeURI(constants.apiURL+'/api/bundles/'+query.bundleSlug);
    try {
        const res = await fetch(target,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const json = await res.json();
        if(res.status!==200)
        {
            throw ( { data : json , status : res.status  } )
        }
        data = {
            ...data,
            bundle : json.data.bundle,
            currRouteURI : asPath,

        };
        return data;
    }
    catch (error) {
        data.error = error;
        return data;
    }

}


export default Bundle;