import React , {useState,useEffect} from "react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import Head from 'next/head'
import SimpleBar from "simplebar-react"
import md5 from "crypto-js/md5"
import axios from "axios";
import Collapse from '@material-ui/core/Collapse';

import * as constants from "../../../components/constants";
import ProjectForm from "../../../components/Course/CourseIndex/ProjectForm";
import {getSafe} from "../../../components/helpers";
import Breadcrumb from "../../../components/UI/Breadcrumb/Breadcrumb";
import CheckOutModal from "../../../components/Course/CourseSingle/CheckOutModal"




const Course = props => {

    const [checkOutModal , setCheckOutModal]= useState(false);
    const [bundleInfo , setBundleInfo]= useState({});
    const [showProjectForm , setShowProjectForm]= useState(false);




    const checkOutModalButton = () => {
	if(props.token !== undefined && !checkOutModal){
            axios.post(constants.apiURL + '/api/log-user-footprint', {
                actionId: 3,
                courseId: props.course.data.id,
            }, {
                headers: {
                    'Authorization': 'Bearer ' + props.token,
                }
            }).then((r) => {
                response = r.data;
                if(response.status !== 'done'){
                    console.log('could not add user footprint');
                }
            }).catch((e) => {
                console.error(e);
            });
        }
        setCheckOutModal(!checkOutModal)
    }

    useEffect(() => {
        const bundle_id = getSafe(() => props.course.data.bundles, null)
        if (bundle_id) {
            axios.get(constants.shopURL + '/api/ProductInfo/' + bundle_id, {
                headers: {
                    token: md5(md5(bundle_id + '.12345^&*(H0n@r!54321)*&^54321').toString()).toString()
                },
            })
                .then((response) => {
                    setBundleInfo(response.data)
                    // this.setState({bundleInfo: {...response.data}})
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    },[])

        return (
            <React.Fragment>
                <Head>
                    <title>هنری | {props.course.data.name}</title>
                    <meta name="description" content={props.course.data.summary}/>
                </Head>
                <Breadcrumb data={[
                    {
                        name: 'هنری آکادمی',
                        url: '/'
                    },
                    {
                        name: props.course.data.name
                    },
                ]}/>

                <CheckOutModal course={props.course.data} checkOutModalButton={checkOutModalButton}
                               open={checkOutModal}/>

                <div id={'class_view_page'} className={'dir-rtl'}>
                    <div className="container-fluid">
                        <h1 className="text-center class_title_top">{props.course.data.name}</h1>
                        <div className="row">
                            <div className="col-lg-7">
                                <LazyLoadImage
                                    wrapperClassName={"class-cover box"}
                                    effect="blur"
                                    src={constants.imageURL + '/classes/' + props.course.data.cover_img}/>
                            </div>
                            <div className="col-lg-5 mt-2 mt-lg-0">
                                <div className="class-data box">
                                    {
                                        props.course.data.is_owner ?
                                            <a href={"https://telegram.me/share/url?url=" + constants.classNextURL + props.currRouteURI}
                                               className="btn class-btn">ارسال برای دوستان</a> :
                                            <button className="btn class-btn" onClick={checkOutModalButton}>ثبت نام
                                                در دوره</button>
                                    }
                                    <div className="class-det d-flex justify-content-between">
                                        <span>{props.course.data.get_steps.length} درس</span>
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
                                            props.course.data.off > 0 ?
                                                <div
                                                    className={'class-price d-flex justify-content-center align-items-center'}>
                                                    <span>&nbsp;هزینه دوره :&nbsp;</span>
                                                    <del>&nbsp;{props.course.data.price.toLocaleString('en')} تومان&nbsp;</del>
                                                    <span>&nbsp;{props.course.data.off.toLocaleString('en')} تومان&nbsp;</span>
                                                    <img src={constants.classNextURL + "/images/icon/medal.png"}
                                                         alt="medal"/>
                                                </div>
                                                :
                                                <div
                                                    className={'class-price d-flex justify-content-center align-items-center'}>
                                                    <span>&nbsp;هزینه دوره :&nbsp;</span>
                                                    <span>&nbsp;{props.course.data.price.toLocaleString('en')} تومان&nbsp;</span>
                                                    <img src={constants.classNextURL + "/images/icon/medal.png"}
                                                         alt="medal"/>
                                                </div>
                                        }
                                    </div>
                                    {
                                            props.course.data.is_owner ? null :
                                                <a onClick={checkOutModalButton}
                                                   className={'have-discount-code cursor-pointer'}>کد تخفیف دارم</a>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4 mb-5">
                            <div className="col-md-4">
                                <div className="about-teacher box h-100 p-3 text-center">
                                    <img alt="userPlaceHolder" className={'my-2 mx-auto'}
                                         src={constants.classNextURL + "/images/icon/userPlaceHolder.png"}/>
                                    <p>معرفی استاد</p>
                                    <p className={"text-center"}>{props.course.data.teacher_about}</p>
                                </div>
                            </div>
                            <div className="col-md-8 mt-4 mt-md-0">
                                <div className="class-description box h-100 p-3 text-center">
                                    <div className="my-4">
                                        <img alt="paper" className={'ml-3'}
                                             src={constants.classNextURL + "/images/icon/paper.png"}/>
                                        توضیحات دوره
                                    </div>
                                    <div dangerouslySetInnerHTML={{__html: props.course.data.description}}/>
                                </div>
                            </div>
                        </div>
                        {
                            getSafe(() => props.course.data.bundles, null) && bundleInfo && bundleInfo.title ?
                                <React.Fragment>
                                    <div className="mt-4 mb-2">
                                        <div className="d-flex align-items-center">
                                            <img alt="userPlaceHolder" className={'ml-3'}
                                                 src={constants.classNextURL + "/images/icon/gift.png"}/>
                                            بسته پیشنهادی
                                        </div>
                                    </div>
                                    <div className="row mb-5">
                                        <div className="col-lg-8">
                                            <div className="box overflow-hidden h-100">
                                                <div className="d-lg-none product_header product_left_section py-2">
                                                    <div className="product_title_container col-8 p-0 overflow-hidden">
                                                        <div className="product_title pr-2">
                                                            <h3>{bundleInfo.title}</h3>
                                                        </div>
                                                    </div>
                                                    <div className="product_price_container col-4  p-0 ">
                                                        {
                                                            bundleInfo.status ?
                                                                <div className="product_price text-left pl-2">
                                                                    <span>{bundleInfo.price}</span><span>&nbsp;تومان </span>
                                                                </div>
                                                                :
                                                                null
                                                        }
                                                    </div>
                                                </div>
                                                <div className="d-flex">
                                                    <LazyLoadImage
                                                        wrapperClassName={"bundle-thumbnail-image"}
                                                        effect="blur"
                                                        alt={bundleInfo.title}
                                                        src={bundleInfo.image}/>
                                                    <div className={"pr-2 w-100"}>
                                                        <div
                                                            className="d-lg-flex d-none product_header product_left_section py-2">
                                                            <div
                                                                className="product_title_container col-8 p-0 overflow-hidden">
                                                                <div className="product_title ">
                                                                    <h3>{bundleInfo.title}</h3>
                                                                </div>
                                                            </div>
                                                            <div className="product_price_container col-4  p-0 ">
                                                                {
                                                                    bundleInfo.status ?
                                                                        <div className="product_price text-left pl-2">
                                                                            <span>{bundleInfo.price}</span>
                                                                            <span>&nbsp;تومان </span>
                                                                        </div>
                                                                        : null
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="bundle_information product_left_section">
                                                            <div className="bundle_content_desc ">
                                                                <div className="bundle_content_item ">
                                                                    <div
                                                                        className="bundle_content_items_cont position-relative">
                                                                        <SimpleBar className={"bundle-items-simple-bar"}
                                                                            autoHide={false}>
                                                                            <ul>
                                                                                {
                                                                                    Array.isArray(bundleInfo.items) ? bundleInfo.items.map((item, key) => {
                                                                                        return <li key={key}>{item}</li>
                                                                                    }) : null
                                                                                }
                                                                            </ul>
                                                                        </SimpleBar>
                                                                        {
                                                                            bundleInfo.status ?
                                                                                <a href={bundleInfo.url}
                                                                                   target={"_blank"}
                                                                                   className="btn btn-honari" style={{
                                                                                    position: "absolute",
                                                                                    left: 10,
                                                                                    bottom: 10
                                                                                }}>
                                                                                    خرید بسته
                                                                                </a>
                                                                                :
                                                                                <button className="btn btn-secondary"
                                                                                        disabled={"disabled"} style={{
                                                                                    position: "absolute",
                                                                                    left: 10,
                                                                                    bottom: 10
                                                                                }}>
                                                                                    موجود نیست
                                                                                </button>
                                                                        }

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 mt-4 mt-lg-0">
                                            <div className="why-buy box text-right h-100">
                                                <h3 className={"pt-3 pr-3 pl-3"}>چرا خرید بسته را پیشنهاد می‌کنیم؟</h3>
                                                <SimpleBar className={"pb-3 pr-4 pl-4"} style={{maxHeight: "200px"}}
                                                           autoHide={false}>
                                                    <div className={"why-buy-desc"}>
                                                        حس خوب ساخت یک کار هنری را تجربه می کنید.<br/>
                                                        قیمت خوب و اقتصادی نسبت به خرید محصولات مشابه آماده<br/>
                                                        آدم های هنری دوست دارند تا حد امکان خودشان با دستان خود چیزهای
                                                        مورد نیاز را درست کنند.<br/>
                                                        ارزش یک کار هنری با هیچ چیز قابل مقایسه نیست.<br/>
                                                        با خرید این بسته شما می توانید ذوق و سلیقه هنری خود را شکوفا
                                                        کنید.<br/>
                                                    </div>
                                                </SimpleBar>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                                : null
                        }
                        {
                            // props.course.data.is_owner && <div className="my-5">
                            //         <div className="d-flex align-items-center">
                            //             <img alt="laptop" className={'ml-3'}
                            //                  src={constants.classNextURL + "/images/icon/laptop.png"}/>
                            //             پروژه ها
                            //         </div>
                            //         <button className={"btn btn-info mt-5"} type={"button"} onClick={()=>{
                            //             setShowProjectForm(!showProjectForm)
                            //         }} >پروژه خود را اضافه کنید</button>
                            //     <Collapse in={showProjectForm}>
                            //         <ProjectForm courseId={props.course.data.id} />
                            //     </Collapse>
                            //     </div>
                        }
                        <div className="mb-2">
                            <div className="d-flex align-items-center">
                                <img alt="laptop" className={'ml-3'}
                                     src={constants.classNextURL + "/images/icon/laptop.png"}/>
                                درس ها
                            </div>
                        </div>
                    </div>
                    <div className="lessons_section text-right mt-4">
                        <div className="container-fluid">
                            {
                                props.course.data.get_steps.map((step, i) => {
                                    return <div className="row" key={i}>
                                        <div className="col-lg-11 col-12 mx-auto">
                                            <div className="lesson-summary d-flex">
                                                {props.course.data.is_owner || step.order === 1 ?
                                                        <a href={'/academy/courses/' + encodeURI(props.course.data.urlfa) + '/' + encodeURI(step.urlKey)} className="lesson-thumbnail">
                                                            <LazyLoadImage
                                                                wrapperClassName={'step-image-wrapper'}
                                                                effect="blur"
                                                                alt={step.name}
                                                                src={constants.imageURL + '/steps/_200/' + step.img}/>
                                                        </a>
                                                    :
                                                    <a className="lesson-thumbnail">
                                                        <LazyLoadImage
                                                            wrapperClassName={'step-image-wrapper'}
                                                            effect="blur"
                                                            alt={step.name}
                                                            src={constants.imageURL + '/steps/_200/' + step.img}/>
                                                    </a>
                                                }
                                                <div className="lesson-info">
                                                    {props.course.data.is_owner || step.order === 1 ?
                                                            <a href={'/academy/courses/' + encodeURI(props.course.data.urlfa) + '/' + encodeURI(step.urlKey)}>
                                                                <h2 className="lesson-title">{step.name}</h2>
                                                            </a>
                                                        :
                                                        <a>
                                                            <h2 className="lesson-title">{step.name}</h2>
                                                        </a>
                                                    }
                                                    <p className="lesson-description d-none d-md-block"
                                                       dangerouslySetInnerHTML={{__html: step.short_desc}}>
                                                    </p>
                                                    <div className="lesson-summary-action ">
                                                        {props.course.data.is_owner || step.order === 1 ?

                                                                <a href={'/academy/courses/' + encodeURI(props.course.data.urlfa) + '/' + encodeURI(step.urlKey)} className="btn btn-honari">
                                                                    مشاهده این جلسه
                                                                </a>

                                                            :
                                                            <p onClick={checkOutModalButton}
                                                               className="btn btn-honari mb-0 cursor-pointer">
                                                                خرید دوره
                                                            </p>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>

                </div>
            </React.Fragment>
        )

}


Course.getInitialProps = async (ctx, token) => {

    const {query, req, asPath} = ctx;

    let data = {}


    const target = encodeURI(constants.apiURL + '/api/courses/' + query.urlfa);
    try {
        const res = await fetch(target, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const json = await res.json();
        if (res.status !== 200) {
            throw ({data: json, status: res.status})
        }


        data.course = json;
        data.currRouteURI = asPath;
	data.token = token;

        return data;
    } catch (error) {
        data.error = error;

        return data;
    }
}

export default Course;
