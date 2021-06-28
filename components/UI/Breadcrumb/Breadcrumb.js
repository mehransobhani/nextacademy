import React from 'react';
import Link from 'next/link';
import * as constants from "../../constants";



export default function SimpleBreadcrumbs(props) {
    return (
        <div className="main-breadcrumb shadow-sm">
                <div className="container-fluid">
                    <ol className={"breadcrumb-wrapper dir-rtl"}>
                        {
                            props.data.map( (item , index) => {
                                if (index === props.data.length-1){
                                    return <li key={index} className="breadcrumb-item active" >{item.name}</li>
                                }
                                else{
                                    return <li key={index} className="breadcrumb-item"><Link href={item.url} ><a>{item.name}</a></Link></li>
                                }
                            })
                        }
                    </ol>
                </div>
        </div>
    );
}