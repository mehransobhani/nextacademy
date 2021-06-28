import React from "react";
import * as constants from '../constants';
import Link from 'next/link'

export default function OurOffer(props){

    let content = null;

    if(props.courses && props.courses.data) {
        content = <section className={'our-offer'}>
            <div className="container-fluid dir-rtl">
                <h3>پیشنهاد هنری آکادمی</h3>
                <hr className="solid" />
                <div className="d-flex overflow-auto">

                    {props.courses.data.map((course, i) => {
                        return (
                            <div className={'col-lg-4 offer-wrapper'} key={i}>

                                <Link href={course.get_course.kind === "bundle" ? '/bundles/' + encodeURI(course.get_course.urlfa) : '/courses/' + encodeURI(course.get_course.urlfa)}>
                                    <a>
                                        <div className="offer-image-wrapper">
                                            <img src={constants.imageURL+ '/classes/_600_300/'+course.get_course.cover_img} alt=""/>
                                        </div>
                                        <p>{course.get_course.name}</p>
                                    </a>
                                </Link>
                            </div>
                            )
                    })}
                </div>
            </div>
        </section>

    }

    return content;
}