import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react"
import {useLocation} from "react-router-dom"

import getOneImage from "../../redux/actions/getOneImage";

import { RootState } from "../../types";
import { LoadingMessage } from "../../componets/loadingMessage";
import { ErrorMessage } from "../../componets/errorMessage";

export const ImagePreviewPage = () => {
    const dispatch = useDispatch()

    const {image, errorMessage} = useSelector((state:RootState) => state)

    const userName = useLocation().pathname.split('/')[2]
    const imageID = useLocation().pathname.split('/')[3]

    useEffect(()=>{
        dispatch(getOneImage(userName, imageID))
    },[userName])
    return (
            <>
            {!errorMessage ? (
                image.image ? (
                    <section className="image_preview_page_section">
                    <article className="image_section">
                        <section className="image_container">
                            <img src={image["image"]}/>
                        </section>
                        <article className="image_details">
                            <h1 className="image_title">{image["title"]}</h1>
                            <span className="author_username">Uploaded by: <a className="text_link" href={`/users/${image.author["userId"]}`}>{image["author"]["userName"]}</a></span>
                            <p className="image_description">{image["description"]}</p>
                        </article>
                    </article>                                    
                    </section>
                ):<LoadingMessage message="Loading..."/>
            ):<ErrorMessage error_message={errorMessage}/>
        }
        </>
    )
}