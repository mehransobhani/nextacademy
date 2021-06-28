import React from "react";
import * as constants from "../../../components/constants";
import Head from 'next/head';
import Summary from "../../../components/Step/Summary/Summary";
import Breadcrumb from "../../../components/UI/Breadcrumb/Breadcrumb";
import Comment from "../../../components/Step/Comment/Comment";
import { withCookies, Cookies } from 'react-cookie';
import {isJson, parseCookies} from "../../../components/helpers"
import Link from "next/link";

class Step extends React.Component {

    static async getInitialProps(ctx , token) {
        const { query , req } = ctx;
        let data = {};
            const target = encodeURI(constants.apiURL+'/api/steps/'+query.urlkey);
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
                    step : json.data.step,
                };
                return data;
            }
            catch (error) {
                data.error = error;
                return data;
            }

    }


    render (){
        let paginate;
            const found = this.props.step.get_course.get_steps.findIndex(( step, index) => {
                if(step.order === this.props.step.order) {
                    return true;
                }
            });
            paginate = (
                <div id="next_back_lesson">
                    <ul>
                        <li>
                            {/*<Link href={'/courses/'+encodeURI(this.props.step.get_course.urlfa)+'/'+encodeURI(this.props.step.get_course.get_steps[+found-1].urlKey)} >*/}
                            {/*    <a>*/}
                            {/*        <i className="glyphicon glyphicon-chevron-right" />*/}
                            {/*        جلسه قبلی*/}
                            {/*    </a>*/}
                            {/*</Link>*/}
                            {
                                this.props.step.get_course.get_steps[+found-1] ?
                                    <a href={constants.classNextURL+'/courses/'+encodeURI(this.props.step.get_course.urlfa)+'/'+encodeURI(this.props.step.get_course.get_steps[+found-1].urlKey)}   className={'btn btn-outline-dark'}>
                                        <i className="glyphicon glyphicon-chevron-right" />
                                        جلسه قبلی
                                    </a>
                                    : null
                            }
                        </li>
                        <li>
                            {/*<Link href={'/courses/'+encodeURI(this.props.step.get_course.urlfa)+'/'+encodeURI(this.props.step.get_course.get_steps[+found+1].urlKey)} >*/}
                            {/*    <a>*/}
                            {/*        <i className="glyphicon glyphicon-chevron-right" />*/}
                            {/*        جلسه بعدی*/}
                            {/*    </a>*/}
                            {/*</Link>*/}
                            {
                                this.props.step.get_course.get_steps[+found+1] ?
                                <a href={constants.classNextURL+'/courses/'+encodeURI(this.props.step.get_course.urlfa)+'/'+encodeURI(this.props.step.get_course.get_steps[+found+1].urlKey)}   className={'btn btn-outline-dark'}>
                                    <i className="glyphicon glyphicon-chevron-right" />
                                    جلسه بعدی
                                </a>
                                    :
                                    null
                            }
                        </li>
                    </ul>
                </div>
            )


        return <React.Fragment>

            <Head>
                <title>هنری | { this.props.step.name }</title>
            </Head>

            <Breadcrumb data={[
                {
                    name : 'هنری آکادمی',
                    url : '/'
                },
                {
                    name : this.props.step.get_course.name,
                    url : '/courses/'+encodeURI(this.props.step.get_course.urlfa),
                },
                {
                    name : this.props.step.name,
                },
            ]} />

            <div id="step-single">
                <div className="container-fluid step-area text-right">
                    <div className="step-title pt-1">
                        <h1>{ this.props.step.name }</h1>
                    </div>
                    <hr/>

                    <Summary summary={this.props.step.summary} pattern={this.props.step.pattern} key={this.props.step.id} />

                    {paginate}
                </div>
            </div>

                <Comment step_id={this.props.step.id}
                         key={this.props.step.id}
                />

        </React.Fragment>
    }

}

export default withCookies(Step)  ;
