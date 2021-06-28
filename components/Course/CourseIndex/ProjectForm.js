import React, {useEffect} from 'react'
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import {useState} from "react";
import axiosInstance from "../../axiosInstance";


import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import * as constants from '../../constants'

// Register the plugins
registerPlugin(FilePondPluginImagePreview);

// Our app
const ProjectForm = (props) => {

    const [images,setImages] = useState([])

    const [description,setDescription] = useState("")


    useEffect(()=>{
        axiosInstance.get(constants.apiURL+'/api/user/projects?course_id='+props.courseId )
            .then((response) => {
                if(response.data.success) {
                    response.data.data.description && setDescription(response.data.data.description)
                    const img = [];
                    response.data.data.images.forEach(image => {
                        img.push({
                            source: image.image,
                            options: {
                                type: 'local',
                            },
                        })
                    })
                    setImages(img)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    } , [])

    const submitFormHandler = () =>  {
        const imagesArray = [];
        const filepondData =document.getElementsByClassName("filepond--data")
        const inputArray = filepondData[0].getElementsByTagName("input");
        let i;
        for (i = 0; i < inputArray.length; i++) {
            imagesArray.push(inputArray[i].value);
        }

        axiosInstance.post(constants.apiURL+'/api/user/projects' , {
            images : imagesArray,
            description: description,
            course_id: props.courseId
        })

        // console.log(filepondData[0].getElementsByTagName("input")[0].value)
    }

    return (
        <React.Fragment>
            <div className={"file-pond-wrapper"}>
                {/* Pass FilePond properties as attributes */}
                <FilePond
                    labelIdle="برای آپلود فایل کلیک کنید."
                    files={images}
                    allowMultiple={true}
                    allowDrop={true}
                    allowReorder={true}
                    onupdatefiles={setImages}
                    itemInsertLocation={"after"}
                    // axios.delete("http://class.honari.devel/api/filepond/revert?filepond="+file.filename)
                    //     .then((res) => {
                    //         console.log(res)
                    //     })
                    //     .catch(err => {
                    //         console.log(err)
                    //     })}
                    server= {{
                        url: 'http://class.honari.devel/api/filepond',
                        process: '/process',
                        revert: (uniqueFileId, load, error) => {
                            axiosInstance.delete("http://class.honari.devel/api/filepond/revert",{
                                data: uniqueFileId
                            })
                                .then(() => {
                                    submitFormHandler();
                                })
                                .catch(() => {
                                    error('oh my goodness');
                                })
                            load();
                        },
                        restore: '/restore',
                        fetch: '/fetch',
                        remove: (source, load, error) => {
                            axiosInstance.delete("http://class.honari.devel/api/filepond/revert",{
                                data: source
                            })
                                .then(() => {
                                    submitFormHandler();
                                })
                                .catch(() => {
                                    error('oh my goodness');
                                })
                            load();
                        }
                    }}
                />
            </div>

            <textarea name="" id="" cols="100" rows="10" onChange={(event)=>setDescription(event.target.value)} value={description} />

                <button type={"button"} className={"btn btn-primary"} onClick={submitFormHandler} >submit</button>
        </React.Fragment>
    );

}

export default ProjectForm;

