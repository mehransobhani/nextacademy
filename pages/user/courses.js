import React from "react";
import Head from 'next/head'
import Link from "next/link"
import Breadcrumb from "../../components/UI/Breadcrumb/Breadcrumb";
import axiosInstance from '../../components/axiosInstance'
import {withCookies} from "react-cookie";
import Loading from "../../components/UI/Loading/Loading";
import {Router} from "next/router";
import {LazyLoadImage} from "react-lazy-load-image-component";
import * as constants from "../../components/constants";

class UserCourses extends React.Component {


    static async getInitialProps(ctx , token) {

        const {req, res} = ctx;
        if (!token) {
            if (res) { // server
                res.writeHead(302, {
                    Location: '/academy'
                });

                res.end();
            } else { // client
                document.location.pathname = '/academy';
                return
            }
        }
        return {};
    };


    state = {
        has_token: false,
        loading: false,
        courses: []
    }

    componentDidMount() {
        this.getCoursesData();
    }

    getCoursesData = () => {
        this.setState({
            loading: true
        })
        axiosInstance('api/user/courses')
            .then((response) => {
                this.setState({
                    courses: response.data.data,
                    loading: false
                })
            })
            .catch((error) => {
                this.setState({
                    loading: false
                })
            })
    }

    render() {

        return <React.Fragment>
            <Head>
                <title>هنری | تحقق رویای هنرمندانه‌ ی تو</title>
            </Head>
            <Breadcrumb data={[
                {
                    name: 'هنری آکادمی',
                    url: '/'
                },
                {
                    name: 'دوره های خریداری شده',
                    url: '/user/courses'
                },
            ]}/>
            <div id="step-single">
                <div className="container-fluid step-area text-right p-3">
                    {
                        this.state.loading ?
                            <div className={"text-center"}><Loading/></div>
                            :
                            this.state.courses.length > 0 ?
                                <React.Fragment>
                                    <h5>دوره های خریداری شده</h5>
                                    <hr/>
                                    <ul className={"pr-3"}>
                                        {
                                            this.state.courses.map((course, index) => {
                                                return <li className={"mt-3"} key={index}>
                                                    <div className="d-flex align-items-center">
                                                        <Link href={course.kind === "bundle" ? '/bundles/' + encodeURI(course.urlfa) : '/courses/' + encodeURI(course.urlfa)}>
                                                            <a>
                                                                <LazyLoadImage
                                                                    effect="blur"
                                                                    wrapperClassName={"course-image-wrapper"}
                                                                    src={constants.imageURL + '/classes/_600_300/' + course.cover_img}
                                                                />
                                                            </a>
                                                        </Link>
                                                        <Link href={course.kind === "bundle" ? '/bundles/' + encodeURI(course.urlfa) : '/courses/' + encodeURI(course.urlfa)}>
                                                            <a className={"mr-3"}>
                                                                {course.name}
                                                            </a>
                                                        </Link>
                                                    </div>
                                                </li>
                                            })
                                        }
                                    </ul>
                                </React.Fragment>
                                :
                                <div className={"alert alert-warning text-center my-5"}>شما در حال حاضر در کلاسی عضو
                                    نیستید
                                    !
                                </div>
                    }
                </div>
            </div>
        </React.Fragment>


    }
}

export default withCookies(UserCourses);
