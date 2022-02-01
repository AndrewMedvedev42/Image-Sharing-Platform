import axios from 'axios';
import {Link} from "react-router-dom";
import { useEffect, useState } from "react"
import {useLocation} from "react-router-dom"
import parse from "html-react-parser";

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
    const pathID = useLocation().pathname.split('/')[2]
    const iconSize = 64
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
                .catch(err=> alert("Sorry, account was not found."));
    },[pathID])

console.log(userData);

    const returnImageList = (image_list:any) => {
        return image_list.map((item:any)=>{
            const {author, title, _id, image, description}:ImageProps = item
            return (
                    <a href={`/images/${author.userName}/${_id}`}>
                        <img className="image-item" src={image}/>
                    </a>
            )
        })
    }

    return (
        <section className="user-page-container">
            {
                userData && (
                    <>
                    <article className="user-details">
                        <h1 className="user-username">{userData["userName"]}</h1>
                        <h5 className="user-fullname">{userData["firstName"]} {userData["lastName"]}</h5>
                    </article>
                    <section className="upload-image-section">
                        {
                            userRole.userID === userData["_id"] && (
                                <div>
                                    <h3>Upload new image</h3>
                                    <Link to={`/users/${userData["_id"]}/submit-image`}>
                                        <input type="submit" value="Upload"/>
                                    </Link>
                                </div>
                            )
                        }
                    </section>
                    <section className="user-image-list">
                        {returnImageList(userData["imageList"])}
                    </section>
                    </>
                )
            }
        </section>
    )
}