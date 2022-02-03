import axios from 'axios';
import FadeIn from 'react-fade-in';
import { useEffect, useState } from "react"
import {Link, useLocation} from "react-router-dom";
import { LoadingMessage } from "./componets/loading-message";
import { ErrorMessage } from "./componets/error_message";
import { NoImagesMessage } from "./componets/no_images_message";

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
    const [userImageCollection, setUserImageCollection] = useState([])

    const distributeData = (res:any) => {
        const {user} = res.data
        setUserData(user)
        setUserImageCollection(user.imageList)
    }
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
            axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/${pathID}`)
                .then(res=>distributeData(res))
                .catch(err=> setErrorMessage(err));
    },[pathID])

    const returnImageList = (image_list:any) => {
            return image_list.map((item:any)=>{
                const {author, _id, image}:ImageProps = item
                return (
                        <article className="image_item">
                            <button className="delete_button" onClick={()=>{deleteImage(pathID, _id)}}>X</button>
                            <Link to={`/images/${author.userName}/${_id}`}>
                                <img className="image" src={image}/>
                            </Link>
                        </article>
                )
            })
    }

    const imageListLength = (image_list:any) => {
        return image_list.length
    }

    const removeTaskFromList = (image_id:String) => {
        let rostedTaskList = userImageCollection.filter((item:any) => item._id !== image_id)
        setUserImageCollection(rostedTaskList);
    }

    const deleteImage = (user_id:String, image_id:String) => {
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/images/${user_id}/${image_id}`)
        .then(res => removeTaskFromList(image_id)).catch(error=>console.log(error));
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
                            {
                                userImageCollection.length ? (
                                    <section className="image_list_section wide_image_list_section">
                                        <FadeIn>
                                            {returnImageList(userImageCollection)}
                                        </FadeIn>
                                    </section>
                                ):<NoImagesMessage message="No images added"/>
                            }
                            </>
                        ):<LoadingMessage message="Loading..."/>
                ):<ErrorMessage error_message={errorMessage}/>
            }

        </section>
    )
}