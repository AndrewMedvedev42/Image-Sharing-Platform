import axios from 'axios';
import { useEffect, useState } from "react"
import {useLocation} from "react-router-dom"
import { LoadingMessage } from "./componets/loading-message";
import { ErrorMessage } from "./componets/error_message";
import { NoImagesMessage } from "./componets/no_images_message";
import FadeIn from 'react-fade-in';


export const ImagePreviewPage = () => {
    const [image_list, setImageList] = useState([])
    const [filtered_image_list, setFilteredImageList] = useState([])
    const [image, setImage] = useState()
    const [errorMessage, setErrorMessage] = useState()

    const userName = useLocation().pathname.split('/')[2]
    const imageID = useLocation().pathname.split('/')[3]

    const getAnImage = (image_data:any) => {
        image_data.forEach((item:any)=>{
            if (item._id === imageID) {
                setImage(item)
            }
        })
    }

    const filterImageList = (image_list:any) => {
        let newImageList = image_list.filter((item:any)=>item._id !== imageID)
        setFilteredImageList(newImageList)
    }

    useEffect(()=>{
        if (image_list.length) {
            getAnImage(image_list)
            filterImageList(image_list)
        }
    },[image_list])

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/user-names/${userName}`)
            .then(res=>setImageList(res.data.user.imageList))
            .catch(err=> setErrorMessage(err));
    },[userName])

    return (
            <>
            {!errorMessage ? (
                image ? (
                    <section className="image_preview_page_section">
                    <article className="image_section">
                        <section className="image_container">
                            <img src={image["image"]}/>
                        </section>
                        <article className="image_details">
                            <div>
                                <h1 className="image_title">{image["title"]}</h1>
                                <span className="author_username">{image["author"]["userName"]}</span>
                            </div>
                            <p className="image_description">{image["description"]}</p>
                        </article>
                    </article>
                        {
                            filtered_image_list.length ? (
                                <article className="other_images_section image_list_section small_image_list_section">{
                                filtered_image_list.map((item:any)=>{
                                    if (item["image"]) {
                                        return (
                                            <a className="image_item" href={`/images/${item.author.userName}/${item._id}`}>
                                                <img className="image" src={item["image"]}/>
                                            </a>
                                        ) 
                                    }
                                })
                            }</article>
                            ):<NoImagesMessage message="This user has no more images"/>
                        } 
                                    
                    </section>
                ):<LoadingMessage message="Loading..."/>
            ):<ErrorMessage error_message={errorMessage}/>
        }
        </>
    )
}