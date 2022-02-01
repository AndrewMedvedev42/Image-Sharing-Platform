import axios from 'axios';
import {Link} from "react-router-dom";
import { useEffect, useState } from "react"
import parse from "html-react-parser";
import {useLocation} from "react-router-dom"


export const ImagePreviewPage = () => {
    const [image_list, setImageList] = useState([])
    const [filtered_image_list, setFilteredImageList] = useState([])
    const [image, setImage] = useState()

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
        axios.get(`http://localhost:5000/api/v1/users/user-names/${userName}`)
            .then(res=>setImageList(res.data.user.imageList))
            .catch(err=> alert("Sorry, account was not found."));
    },[userName])

    return (
        <section className="image-preview-page">
            {image && (
                <>
                <article className="image-section">
                    <section className="image-container">
                        <img src={image["image"]}/>
                    </section>
                    <article className="image-details">
                        <div>
                            <h1 className="image-title">{image["title"]}</h1>
                            <span className="author-username">{image["author"]["userName"]}</span>
                        </div>
                        <p className="image-description">{image["description"]}</p>
                    </article>
                </article>
                <article className="other-images-section">
                    {
                        filtered_image_list.length && (
                            filtered_image_list.map((item:any)=>{
                                if (item["image"]) {
                                    return (
                                        <a href={`/images/${item.author.userName}/${item._id}`}>
                                            <img className="image-item" src={item["image"]}/>
                                        </a>
                                    ) 
                                }
                            })
                        )
                    }
                </article>
                </>
            )}
        </section>
    )
}