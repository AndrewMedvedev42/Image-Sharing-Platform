import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'

import getOneImage from '../../redux/actions/getOneImage';

import { RootState } from '../../types';
import { LoadingMessage } from '../../componets/loadingMessage';
import { ErrorMessage } from '../../componets/errorMessage';
import { UnavalibleMessage } from "../../componets/unavalibleMessage";

export const ImagePreviewPage = () => {
    const dispatch = useDispatch()

    const [otherImages, setOtherImages] = useState([])

    const {image, errorMessage} = useSelector((state:RootState) => state)

    const userName = useLocation().pathname.split('/')[2]
    const imageID = useLocation().pathname.split('/')[3]

    useEffect(()=>{
        dispatch(getOneImage(userName, imageID))
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/user-names/${userName}`)
            .then(res=>setOtherImages(res.data.user.imageList.filter((item:any)=>item._id !== imageID))
            )
    },[userName])

    return (
            <>
            {!errorMessage ? (
                image.image ? (
                    <section className='image_preview_page_section'>
                    <article className='image_section'>
                        <section className='image_container'>
                            <img src={image['image']}/>
                        </section>
                        <article className='image_details'>
                            <h1 className='image_title'>{image['title']}</h1>
                            <span className='author_username'>Uploaded by: <a className='text_link' href={`/users/${image.author['userId']}`}>{image['author']['userName']}</a></span>
                            <p className='me-4 image_description'>{image['description']}</p>
                        </article>
                    </article>     
                    {
                            otherImages.length ? (
                                <article className="other_images_section image_list_section small_image_list_section">{
                                    otherImages.map((item:any)=>{
                                    if (item["image"]) {
                                        return (
                                            <a className="border image_item" href={`/images/${item.author.userName}/${item._id}`}>
                                                <img className="image" src={item["image"]}/>
                                            </a>
                                        ) 
                                    }
                                })
                            }</article>
                            ):<UnavalibleMessage message="This user has no more images"/>
                        }                                
                    </section>
                ):<LoadingMessage message='Loading...'/>
            ):<ErrorMessage error_message={errorMessage}/>
        }
        </>
    )
}