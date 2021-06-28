import React from "react";
import * as constants from '../constants';
import Link from 'next/link';

export default function MostPopular(props){

    let content = null;

    if(props.arts && props.arts.data && props.arts.data.length === 7) {
        content =
            <section className={'container-fluid most-popular'}>
                <h3>هنر های پرطرفدار</h3>
                <hr className="solid" />
                <div className="row">
                    <div className="col-lg-40 col-md-6 col-12 most-popular-course-first">
                        <div className="most-popular-cover">
                            <img  src={constants.imageURL+ '/arts/' +props.arts.data[0].img} alt=""/>
                            <div className="overlay">
                                <div className="title">{props.arts.data[0].get_art.artName}</div>

                                <Link href={'/category/'+props.arts.data[0].get_art.art_url}>
                                    <a>مشاهده کلاس ها</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-20 col-md-3 col-sm-6 col-6 mt-2 mt-md-0 most-popular-course">
                        <div className="most-popular-cover">
                            <img  src={constants.imageURL+ '/arts/'+props.arts.data[1].img} alt=""/>
                            <div className="overlay">
                                <div className="title">{props.arts.data[1].get_art.artName}</div>
                                <Link href={'/category/'+props.arts.data[1].get_art.art_url}>
                                    <a>مشاهده کلاس ها</a>
                                </Link>
                            </div>
                        </div>
                        <div className="most-popular-cover">
                            <img  src={constants.imageURL+ '/arts/'+props.arts.data[2].img} alt=""/>
                            <div className="overlay">
                                <div className="title">{props.arts.data[2].get_art.artName}</div>
                                <Link href={'/category/'+props.arts.data[2].get_art.art_url}>
                                    <a>مشاهده کلاس ها</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-20 col-md-3 col-sm-6 col-6 mt-2 mt-md-0 most-popular-course">
                        <div className="most-popular-cover">
                            <img  src={constants.imageURL+ '/arts/'+props.arts.data[3].img} alt=""/>
                            <div className="overlay">
                                <div className="title">{props.arts.data[3].get_art.artName}</div>
                                <Link href={'/category/'+props.arts.data[3].get_art.art_url}>
                                    <a>مشاهده کلاس ها</a>
                                </Link>
                            </div>
                        </div>
                        <div className="most-popular-cover">
                            <img  src={constants.imageURL+ '/arts/'+props.arts.data[4].img} alt=""/>
                            <div className="overlay">
                                <div className="title">{props.arts.data[4].get_art.artName}</div>
                                <Link href={'/category/'+props.arts.data[4].get_art.art_url}>
                                    <a>مشاهده کلاس ها</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-20 d-none d-lg-block most-popular-course">
                        <div className="most-popular-cover">
                            <img  src={constants.imageURL+ '/arts/'+props.arts.data[5].img} alt=""/>
                            <div className="overlay">
                                <div className="title">{props.arts.data[5].get_art.artName}</div>
                                <Link href={'/category/'+props.arts.data[5].get_art.art_url}>
                                    <a>مشاهده کلاس ها</a>
                                </Link>
                            </div>
                        </div>
                        <div className="most-popular-cover">
                            <img  src={constants.imageURL+ '/arts/'+props.arts.data[6].img} alt=""/>
                            <div className="overlay">
                                <div className="title">{props.arts.data[6].get_art.artName}</div>
                                <Link href={'/category/'+props.arts.data[6].get_art.art_url}>
                                    <a>مشاهده کلاس ها</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    }

    return content

}