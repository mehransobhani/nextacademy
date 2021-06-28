import React from "react";
import * as constants from "../components/constants";
import Head from "next/head";
import axios from "axios";
import SearchSlider from "../components/SearchSlider/SearchSlider";
import queryString from "query-string";
import router from "next/router";
import Loading from "../components/UI/Loading/Loading";
import CourseCard from "../components/Course/CourseIndex/CourseCard";
import {fetchCategory} from "../redux/actions";
import {withCookies} from "react-cookie";
import {connect} from "react-redux";
import {deepEqual} from "../components/helpers";
import CategorySidebar from "../components/Category/CategorySidebar";

class Search extends React.Component {

    static async getInitialProps(ctx) {
        const {query} = ctx;
        return {query: query};
    }

    state = {
        courses: {
            data: {
                data: []
            }
        },
        page: 1,
        is_last_page: false,
        loading: false,
        search: this.props.query.q ? this.props.query.q : '',
    };

    handleSearch = (e, search) => {
        e.preventDefault()
        this.setState({
            page: 1,
            is_last_page: false,
            search: search
        }, function () {
            const object = {
                q: search,
                category: this.state.categorySearch
            }
            const string = queryString.stringify(object, {arrayFormat: 'bracket'});
            router.replace('/search?' + string);

            this.getData();
        })
    }

    componentDidMount() {
        this.getData();
    }

    // handleCategorySearchDetailChange = (e , id) => {
    //     this.setState({
    //         page: 1,
    //         is_last_page: false,
    //     })
    //     const array = [...this.state.categorySearch];
    //
    //     const index = array.indexOf(id);
    //     if (index !== -1) {
    //         array.splice(index, 1);
    //         this.setState(prevState => {
    //             return {
    //                 ...prevState,
    //                 categorySearch: array
    //             }
    //         })
    //     }
    //
    //     const object = {
    //         q: this.props.query.q,
    //         category: array
    //     }
    //     const string = queryString.stringify(object, {arrayFormat: 'bracket'});
    //     const cat = queryString.stringify({category: array}, {arrayFormat: 'bracket'});
    //     router.push('/search?' + string);
    //
    //     this.getData(cat)
    // }


    // handleCategorySearchChange = (e, id) => {
    //     this.setState({
    //         page: 1,
    //         is_last_page: false,
    //     })
    //     const checked = e.target.checked;
    //     const array = [...this.state.categorySearch];
    //     if (checked) {
    //         array.indexOf(id) === -1 ? array.push(id) : null;
    //         this.setState(prevState => {
    //             return {
    //                 ...prevState,
    //                 categorySearch: array
    //             }
    //         })
    //     } else {
    //         const index = array.indexOf(id);
    //         if (index !== -1) {
    //             array.splice(index, 1);
    //             this.setState(prevState => {
    //                 return {
    //                     ...prevState,
    //                     categorySearch: array
    //                 }
    //             })
    //         }
    //     }
    //     const object = {
    //         q: this.props.query.q,
    //         category: array
    //     }
    //     const string = queryString.stringify(object, {arrayFormat: 'bracket'});
    //     const cat = queryString.stringify({category: array}, {arrayFormat: 'bracket'});
    //     // router.push('/search?' + string);
    //     history.replaceState(null, null, "?"+string);
    //
    //     this.getData(cat)
    //
    // }

    componentDidUpdate(prevProps) {

        if(!deepEqual(prevProps.query,this.props.query))
        {
            this.setState({
                courses: {
                    data: {
                        data: []
                    }
                },
                page: 1,
                is_last_page: false,
                loading: false,
                search: this.props.query.q ? this.props.query.q : ''}, () => {
                this.getData();
            })
        }
    }

    openCategory = () => {
        document.getElementById('search-categories-wrapper').style.display = "block";
        document.body.style.overflow = 'hidden';
    }

    getData = () => {

        this.setState({
            loading: true,
            courses: {
                data: {
                    data: []
                }
            },
        })

        const url = constants.apiURL + '/api/courses?search=' + this.state.search;
        axios.get(url)
            .then((response) => {

                if (1 === response.data.data.last_page) {
                    this.setState({
                        is_last_page: true,
                    })
                }
                this.setState(prevState => {
                    return {
                        ...prevState,
                        courses: {
                            ...prevState.courses,
                            data: {
                                ...prevState.courses.data,
                                data: response.data.data.data
                            }
                        },
                        loading: false
                    }
                });
            })
            .catch((error) => {
                console.log(error)
                this.setState({
                    loading: false
                })
            })
    }

    loadMore = () => {


        if (!this.state.is_last_page) {
            this.setState({
                page: this.state.page + 1,
                loading: true
            })

            const page = this.state.page + 1;
            const url = constants.apiURL + '/api/courses?page=' + page + '&search=' + this.state.search;

            axios.get(url)
                .then((response) => {
                    if (page === response.data.data.last_page) {
                        this.setState({
                            is_last_page: true,
                            loading: false
                        })
                    }
                    this.setState(prevState => {
                        return {
                            ...prevState,
                            courses: {
                                ...prevState.courses,
                                data: {
                                    ...prevState.courses.data,
                                    data: [
                                        ...prevState.courses.data.data,
                                        ...response.data.data.data
                                    ]
                                }
                            },
                            loading: false
                        }
                    });
                })
                .catch((error) => {
                    console.log(error)
                    this.setState({
                        loading: false
                    })
                })
        }
    }

    // categorySearch = () => {
    //
    //     if (this.props.categories.length > 0){
    //
    //         let __FOUND = [];
    //         for (const element of this.state.categorySearch) {
    //             let id = this.props.categories.find(function(category, index) {
    //                 if(category.id === element)
    //                     return true;
    //             });
    //             __FOUND.push(id)
    //         }
    //
    //
    //         this.setState({
    //             categorySearchDetail : __FOUND
    //         })
    //
    //     }
    //
    //
    // }

    render() {
        let content;

        return (
            <React.Fragment>
                <Head>
                    <title>هنری | تحقق رویای هنرمندانه‌ ی تو</title>
                </Head>
                <SearchSlider categorySearch={this.state.categorySearch}
                              handleCategorySearchChange={this.handleCategorySearchChange}
                              queryParams={this.props.query} handleSearch={this.handleSearch}
                              inputValue={this.props.query.q}/>

                <section className="course-index  dir-rtl">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-3" id={"search-categories-wrapper"}>
                                <CategorySidebar />
                            </div>
                            <div className={"col-12 d-lg-none mb-3"}>
                                <button onClick={this.openCategory} className={"btn filter-art-button"} type={"button"} >
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
                                {
                                    this.state.loading ? <div className={"text-center"}><Loading/></div> :
                                        this.state.courses.data.data.length > 0 ? <h3>دوره های آموزشی</h3> :
                                            <h3 className={'mx-auto'}>نتیجه ای یافت نشد</h3>
                                }


                                {this.state.loading ? null : <hr className="solid  mb-0"/>}
                                <div className="row">

                                    {this.state.courses.data.data.length > 0 ? this.state.courses.data.data.map((course, i) => {
                                        return (
                                            <div className={'col-lg-4 col-md-6 col-sm-6'} key={i}>
                                                <CourseCard course={course}/>
                                            </div>
                                        )
                                    }) : null}
                                </div>
                                {this.state.is_last_page ? null :
                                    <div className="row mt-5 justify-content-center load-more-button">
                                        <button disabled={this.state.loading} type={'button'}
                                                className={'btn btn-outline-dark'}
                                                onClick={this.loadMore}>{this.state.loading
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
        )
    }
}


const mapStateToProps = state => ({
    ...state.category
});

const mapDispatchToProps = dispatch => ({
    fetchCategory: (payload) => dispatch(fetchCategory(payload))
});

export default withCookies(connect(
    mapStateToProps , mapDispatchToProps
)(Search))
