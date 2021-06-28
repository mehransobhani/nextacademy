import React from "react";
import * as constants from "../../constants";
import axios from 'axios';
import Modal from "../../UI/Modal/ErrorModal";
import CourseCard from "./CourseCard";


export default class CourseIndex extends React.Component {

    state = {
        courses: {
            data: {
                data: []
            }
        },
        page: 0,
        is_last_page: false,
        loading: false,
        error: false,
    };

    componentDidMount() {
        this.loadMore()
    }

    loadMore = () => {

        if (!this.state.is_last_page) {
            this.setState({
                page: ++this.state.page,
                loading: true
            })

            axios.get(constants.apiURL + '/api/courses?page=' + this.state.page)
                .then((response) => {
                    if (this.state.page === response.data.data.last_page) {
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
                    this.setState({
                        error: true,
                        loading: false
                    })
                })
        }
    }


    render() {
        return (
            <section className="course-index dir-rtl">
                {this.state.error ?
                    <Modal title={"مشکلی در برقراری ارتباط پیش آمده."} description={" لطفا دوباره تلاش کنید."}
                           open={true}/> : null}
                <div className="container-fluid">
                    <h3>دوره های آموزشی</h3>
                    <hr className="solid"/>
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
                            <button disabled={this.state.loading} type={'button'} className={'btn btn-outline-dark'}
                                    onClick={this.loadMore}>{this.state.loading
                                ? <span className={'dir-rtl'}>در حال بارگذاری...</span>
                                : 'مشاهده بیشتر'}</button>
                        </div>
                    }
                </div>
            </section>
        )
    }

}