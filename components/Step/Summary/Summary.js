import React, { useState, useEffect } from 'react';
import Plyr from 'plyr';

import 'plyr/dist/plyr.css';

export default function Summary(props) {

    const [ videoElement , setVideoElement ] =  useState()
    useEffect( () => {

        setVideoElement(document.querySelectorAll('.video-js'));

        return () => {
            if (typeof videoElement !== "undefined") Array.from(videoElement).map(p => p.remove());

            setVideoElement(null)
        }

    } , [])

    useEffect(() => {
        if (typeof videoElement !== "undefined")  Array.from(videoElement).map(p => new Plyr(p));

    } , [videoElement])


    return(
        <React.Fragment>
            <article id={"con"} dangerouslySetInnerHTML={{ __html: props.summary }} />

            {
                props.pattern ? <React.Fragment><br /><br /><div className="text-center"><a href={"https://honari.com/blog/images/" + props.pattern} target="_blank">دانلود فایل الگو </a></div></React.Fragment> : null
            }

        </React.Fragment>
    )
}
