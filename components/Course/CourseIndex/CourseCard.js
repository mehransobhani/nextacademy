import React from "react";
import Link from "next/link";
import {LazyLoadImage} from "react-lazy-load-image-component";
import * as constants from "../../constants";

export default function CourseCard(props){
    return (
        <div className="course-wrapper">
            <Link href={props.course.kind === "bundle" ? '/bundles/' + encodeURI(props.course.urlfa) : '/courses/' + encodeURI(props.course.urlfa)}>
                <a>
                    <LazyLoadImage
                        effect="blur"
                        wrapperClassName={"course-image-wrapper"}
                        src={constants.imageURL + '/classes/_600_300/' + props.course.cover_img}
                    />
                </a>
            </Link>
            {
                props.course.off > 0
                    ?
                    <div className={'p-3 course-info-wrapper align-items-center'}>
                        <Link href={props.course.kind === "bundle" ? '/bundles/' + encodeURI(props.course.urlfa) : '/courses/' + encodeURI(props.course.urlfa)}>
                            <a>{props.course.name}</a>
                        </Link>
                        <div className={"discount-price-wrapper mt-2"}>
                            <span>{props.course.off && props.course.off.toLocaleString('en')}&nbsp;تومان</span>
                            <del>{props.course.price && props.course.price.toLocaleString('en')}&nbsp;تومان</del>
                        </div>
                    </div>
                    :
                    <div className={'d-flex justify-content-between p-3 course-info-wrapper align-items-center'}>
                        <Link href={props.course.kind === "bundle" ? '/bundles/' + encodeURI(props.course.urlfa) : '/courses/' + encodeURI(props.course.urlfa)}>
                            <a>{props.course.name}</a>
                        </Link>
                        <div className={"price-wrapper"}>{props.course.price && props.course.price.toLocaleString('en')}&nbsp;تومان</div>
                    </div>
            }

        </div>

    )
}