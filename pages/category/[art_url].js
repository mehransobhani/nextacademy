import React , { useEffect , useState } from "react";
import * as constants from "../../components/constants";
import Head from "next/head";
import SearchSlider from "../../components/SearchSlider/SearchSlider";
import CourseCard from "../../components/Course/CourseIndex/CourseCard";
import Router from "next/router";
import queryString from "query-string";
import router from "next/router";
import CategorySidebar from '../../components/Category/CategorySidebar'
import axios from "axios";

function CategoryCourses(props){

    const [loading , setLoading] = useState(false);
    const [courses , setCourses] = useState([]);
    const [page , setPage] = useState(1);
    const [isLastPage , setIsLastPage] = useState(false);

    useEffect(()=>{
        setCourses(props.courses.data);
        setIsLastPage(props.courses.current_page === props.courses.last_page);
        setPage(props.courses.current_page)


    } , [props.courses])


    const handleSearch = (e , search) => {
        e.preventDefault()
        Router.push('/search?q=' + search)
    }

    const handleCategorySearchChange = (e , id) => {
        const checked = e.target.checked;
        const array = [];
        if(checked){
            array.indexOf(id) === -1 ? array.push(id) : null;
        }
        const object = {
            category : array
        }
        const string = queryString.stringify(object, {arrayFormat: 'bracket'});
        router.push('/search?'+string);
    }


    const loadMore = () => {

        if (!isLastPage) {
            const localPage = page + 1;

            setPage(localPage);
            setLoading(true);

            const url = constants.apiURL + '/api/category/'+props.category.art_url+'?page='+localPage;

            axios.get(url)
                .then((response) => {
                    if (localPage === response.data.data.courses.last_page) {
                        setIsLastPage(true);
                    }
                    setCourses([...courses , ...response.data.data.courses.data])
                    setLoading(false)

                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }


    const openCategory = () => {
        document.getElementById('search-categories-wrapper').style.display = "block";
        document.body.style.overflow = 'hidden';
    }



    return <React.Fragment>
        <Head>
            <title>هنری | تحقق رویای هنرمندانه‌ ی تو</title>
        </Head>

        <SearchSlider handleSearch={handleSearch} handleCategorySearchChange={handleCategorySearchChange} />


        <section className="course-index dir-rtl">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3" id={"search-categories-wrapper"}>

                        <CategorySidebar />

                    </div>
                    <div className={"col-12 d-lg-none mb-3"}>
                        <button onClick={openCategory} className={"btn filter-art-button"} type={"button"} >
                            فیلتر دسته ها&nbsp;
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                 className="bi bi-filter" viewBox="0 0 16 16">
                                <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                            </svg>
                        </button>
                    </div>
                    <br />


                    <div className="col-lg-9 col-12 px-0">
                        <div className={"search-content-wrapper"}>

                            <h1>دسته : {props.category.artName}</h1>



                            {
                                props.category.description ? <React.Fragment>
                                    <div className={"px-2 pt-2"}>
                                        {props.category.description}
                                    </div>
                                </React.Fragment> : null
                            }


                            <hr/>

                            <div className="row">
                                {courses.length > 0  ? courses.map((course, i) => {
                                    return (
                                        <div className={'col-lg-4 col-md-6 col-sm-6'} key={i}>
                                            <CourseCard course={course}/>
                                        </div>
                                    )
                                }) : props.courses && props.courses.data.length > 0 ? props.courses.data.map((course, i) => {
                                    return (
                                        <div className={'col-lg-4 col-md-6 col-sm-6'} key={i}>
                                            <CourseCard course={course}/>
                                        </div>
                                    )
                                }) : null}
                            </div>

                            {isLastPage ? null :
                                <div className="row mt-5 justify-content-center load-more-button">
                                    <button disabled={loading} type={'button'}
                                            className={'btn btn-outline-dark'}
                                            onClick={loadMore}>{loading
                                        ? <span className={'dir-rtl'}> ... در حال بارگذاری</span>
                                        : 'مشاهده بیشتر'}</button>
                                </div>
                            }

                        </div>
                    </div>
                </div>

            </div>
        </section>

    </React.Fragment>



}


CategoryCourses.getInitialProps = async (ctx) => {
    const { query , req } = ctx;
    let data = {};
    const target = encodeURI(constants.apiURL+'/api/category/'+query["art_url"]);
    try {
        const res = await fetch(target);
        const json = await res.json();
        if(res.status!==200)
        {
            throw ( { data : json , status : res.status  } )
        }
        data = json.data;
        return data;
    }
    catch (error) {
        data.error = error;
        return data;
    }


    return {data }
}



export default CategoryCourses;

