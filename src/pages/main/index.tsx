import FadeIn from 'react-fade-in';
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { FaUserAlt } from "react-icons/fa";

import getImages from "../../redux/actions/getImages";

import { LoadingMessage } from "../../componets/loadingMessage";
import { ErrorMessage } from "../../componets/errorMessage";
import { UnavalibleMessage } from "../../componets/unavalibleMessage";

interface ImageProps {
    author: {
        firstName:String,
        lastName:String,
        userName:String
    },
    image:string,
    description:String,
    dateOfCreation:String,
    title:String,
    _id:String
  }

interface RootState {
    imageList:ImageProps[],
    image:{}
    errorMessage:{
        status:number
    }
}


export const MainPage:React.FC = () => {
    const dispatch = useDispatch()
    const {imageList, errorMessage} = useSelector((state:RootState) => state)
    useEffect(()=>{
        dispatch(getImages())
    },[])    
    
    return (
        <article className="main_page_section">
            {!errorMessage ? (
                    imageList.length ? (
                        imageList[0] ? (
                            <section className="image_list_section wide_image_list_section"> 
                                <FadeIn>    
                                {
                                    imageList.map((item:ImageProps)=>{
                                        const {author, _id, image, title} = item
                                        return (
                                            <div className="image_item border">
                                                <a className='text-decoration-none text-black' href={`/images/${author.userName}/${_id}`}>
                                                    <img className="image" src={image}/>
                                                    <h4 className='ms-4 mt-3 mb-0'>{title}</h4>
                                                    <div className='ms-4 mb-3 d-flex align-items-center'>
                                                    <FaUserAlt className='me-2'/>
                                                    <h6 className='mt-2'>by {author.userName}</h6>
                                                </div>
                                                </a>
                                            </div>

                                        )           
                                    })
                                }    
                                </FadeIn>     
                            </section>
                        ):<UnavalibleMessage message="No images to display"/>
                    ):<LoadingMessage message="Loading..."/>
                ):<ErrorMessage error_message={errorMessage}/>
            }    
        </article>
    )
}