import axios from 'axios';
import FadeIn from 'react-fade-in';
import { useEffect, useState } from "react"
import {Link, useLocation} from "react-router-dom";
import { LoadingMessage } from "./componets/loading-message";
import { ErrorMessage } from "./componets/error_message";

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

export const UserProfilePage = () => {
    const [userData, setUserData] = useState();
    const [userRole, setUserRole] = useState({role:"Not a customer", userID:"---"})
    const [errorMessage, setErrorMessage] = useState()
    const pathID = useLocation().pathname.split('/')[2]
    console.log(errorMessage);
    
        //GETS USER ROLE DATA FORM SESSION STORAGE FOR VALIDATION
    useEffect(()=>{
        try {
            const roleInfo = window.localStorage.getItem("M0NTY3ODkw")
            if (roleInfo) {
                setUserRole(JSON.parse(roleInfo))
            }
        } catch (error) {
            console.log(error);
        }
    },[])
    
    useEffect(()=>{
            axios.get(`http://localhost:5000/api/v1/users/${pathID}`)
                .then(res=>setUserData(res.data.user))
                .catch(err=> setErrorMessage(err));
    },[pathID])

console.log(userData);

    const returnImageList = (image_list:any) => {
        return image_list.map((item:any)=>{
            const {author, _id, image}:ImageProps = item
            return (
                    <a className="image_item" href={`/images/${author.userName}/${_id}`}>
                        <img className="image" src={image}/>
                    </a>
            )
        })
    }

    const imageListLength = (image_list:any) => {
        return image_list.length
    }

    return (
        <section className="user_page_section">
            {
                !errorMessage ? (
                        userData ? (
                            <>
                            <article className="user_details">
                                <h1 className="user_username">{userData["userName"]}</h1>
                                <h5 className="user_fullname">{userData["firstName"]} {userData["lastName"]}</h5>
                                <p className="gallery_length">Total submitions: {imageListLength(userData["imageList"])}</p>
                            </article>
                            <section className="upload_section">
                                {
                                    userRole.userID === userData["_id"] && (
                                        <div>
                                            <Link to={`/users/${userData["_id"]}/submit-image`}>
                                                <input type="submit" value="Upload an image"/>
                                            </Link>
                                        </div>
                                    )
                                }
                            </section>
                            <section className="image_list_section wide_image_list_section">
                                <FadeIn>
                                {returnImageList(userData["imageList"])}
                                </FadeIn>
                            </section>
                            </>
                        ):<LoadingMessage message="Loading..."/>
                ):<ErrorMessage error_message={errorMessage}/>
            }

        </section>
    )
}