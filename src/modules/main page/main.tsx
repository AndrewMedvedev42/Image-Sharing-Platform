import axios from 'axios';
import FadeIn from 'react-fade-in';
import { useEffect, useState } from "react"
import { LoadingMessage } from "../componets/loading-message";
import { ErrorMessage } from "../componets/error_message";

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
  

export const MainPage:React.FC = () => {
    const [imageList, setImageList] = useState([])
    const [errorMessage, setErrorMessage] = useState()
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/v1/images`)
            .then(res => setImageList(res.data.images))
            .catch(err=>setErrorMessage(err))
    },[])

    return (
        <section className="main_page_section">
            {!errorMessage ? (
                    imageList[0] ? (
                        <section className="image_list_section wide_image_list_section"> 
                            <FadeIn>    
                            {
                                imageList.map(item=>{
                                    const {title, author, _id, image}:ImageProps = item
                                    return (
                                        <a className="image_item" href={`/images/${author.userName}/${_id}`}>
                                            <img className="image" src={image}/>
                                        </a>
                                    )           
                                })
                            }    
                            </FadeIn>     
                        </section>
                    ):<LoadingMessage message="Loading..."/>
                ):<ErrorMessage error_message={errorMessage}/>
            }    
        </section>
    )
}