import axios from 'axios';
import FadeIn from 'react-fade-in';
import { useEffect, useState } from "react"
import {Link, useLocation} from "react-router-dom";
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

export const UserProfilePage = () => {
    const [userData, setUserData] = useState();
    const [userRole, setUserRole] = useState({role:"Not a customer", userID:"---"})
    const [errorMessage, setErrorMessage] = useState()
    const pathID = useLocation().pathname.split('/')[2]
    const [userImageCollection, setUserImageCollection] = useState([])
    const [isDeletingImage, setIsDeletingImage] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)

    const distributeData = (res:any) => {
        const {user} = res.data
        setIsLoading(false)
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
    },[refresh])

    const returnImageList = (image_list:any, user_role_id:string, user_id:string) => {
            return image_list.map((item:any)=>{
                const {author, _id, image}:ImageProps = item
                return (
                        <article className={`image_item ${isDeletingImage && "disabled_image_item"}`}>
                            {
                                user_role_id === user_id && (
                                    !isDeletingImage ? (
                                        <button className="delete_button" onClick={()=>{deleteImage(pathID, _id)}}>X</button>
                                    ): <button className="delete_button delete_button_loading">.</button>
                                )
                            }
                            {
                                !isDeletingImage ? (
                                    <Link to={`/images/${author.userName}/${_id}`}>
                                        <img className="image" src={image}/>
                                    </Link>
                                ):<img className="image" src={image}/>
                            }
                        </article>
                )
            })
    }

    const imageListLength = (image_list:any) => {
        return image_list.length
    }

    const removeTaskFromList = (image_id:String) => {
        setIsDeletingImage(false)
        let rostedTaskList = userImageCollection.filter((item:any) => item._id !== image_id)
        setUserImageCollection(rostedTaskList);
    }

    const deleteImage = (user_id:String, image_id:String) => {
        setIsDeletingImage(true)
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/images/${user_id}/${image_id}`)
        .then(res => removeTaskFromList(image_id)).catch(error=>setIsDeletingImage(false));
    }

    const updateUserStatus = (user_id:String, user_private_status:Boolean) => {
        setIsLoading(true)
        axios.patch(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/${user_id}`, {privateAccount:!user_private_status})
        .then(res => setRefresh(!refresh)).catch(error=>alert("error"));
    }

    return (
        <section className="user_page_section">
            {
                !errorMessage ? (
                        userData ? (
                            !userData["privateAccount"] || userRole.userID === userData["_id"] ? (
                                <>
                                <FadeIn>
                                <article className="user_details">
                                    <h1 className="user_username">{userData["userName"]}</h1>
                                    <h5 className="user_fullname">{userData["firstName"]} {userData["lastName"]}</h5>
                                    <p className="gallery_length">Total submitions: {imageListLength(userData["imageList"])}</p>
                                    {
                                        userRole.userID === userData["_id"] && (
                                            <button 
                                                onClick={()=>updateUserStatus(userData["_id"], userData["privateAccount"])}
                                                type="submit" 
                                                className='w-100 mb-3 btn btn-warning' 
                                                disabled={isLoading}>
                                                {
                                                    !isLoading ? (
                                                        !userData["privateAccount"] ? ("Become private account")
                                                        :"Become a public account") 
                                                            : "Changing status..."
                                                }
                                            </button>
                                        )
                                    }
                                </article>
                                <section className="upload_section">
                                    {
                                        userRole.userID === userData["_id"] && (
                                            <div>
                                                <Link to={`/users/${userData["_id"]}/submit-image`}>
                                                    <button type="submit" className='w-100 mb-3 btn btn-primary' disabled={isLoading}>Upload an image</button>
                                                </Link>
                                            </div>
                                        )
                                    }
                                </section>
                                {
                                    userImageCollection.length ? (
                                        <section className="image_list_section wide_image_list_section">
                                            <FadeIn>
                                                {returnImageList(userImageCollection, userRole.userID, userData["_id"])}
                                            </FadeIn>
                                        </section>
                                    ):<UnavalibleMessage message="No images added"/>
                                }
                                </FadeIn>
                                </>
                            ):<UnavalibleMessage message="This account is private"/>
                        ):<LoadingMessage message="Loading..."/>
                ):<ErrorMessage error_message={errorMessage}/>
            }

        </section>
    )
}