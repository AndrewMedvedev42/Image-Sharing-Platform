import FadeIn from 'react-fade-in';
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";

import getImages from "../redux/actions/getImages";

import { LoadingMessage } from "../componets/loading-message";
import { ErrorMessage } from "../componets/error_message";
import { UnavalibleMessage } from "../componets/unavalible-message";

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
    errorMessage:object
}


export const MainPage:React.FC = () => {
    const dispatch = useDispatch()
    const {imageList, errorMessage} = useSelector((state:RootState) => state)
    useEffect(()=>{
        dispatch(getImages())
    },[])

    return (
        <section className="main_page_section">
            {!errorMessage ? (
                    imageList.length ? (
                        imageList[0] ? (
                            <section className="image_list_section wide_image_list_section"> 
                                <FadeIn>    
                                {
                                    imageList.map((item:ImageProps)=>{
                                        const {author, _id, image} = item
                                        return (
                                            <a className="image_item" href={`/images/${author.userName}/${_id}`}>
                                                <img className="image" src={image}/>
                                            </a>
                                        )           
                                    })
                                }    
                                </FadeIn>     
                            </section>
                        ):<UnavalibleMessage message="No images to display"/>
                    ):<LoadingMessage message="Loading..."/>
                ):<ErrorMessage error_message={errorMessage}/>
            }    
        </section>
    )
}