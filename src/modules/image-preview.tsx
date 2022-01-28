import axios from 'axios';
import {Link} from "react-router-dom";
import { useEffect, useState } from "react"
import {useLocation} from "react-router-dom"


export const ImagePreviewPage = () => {
    const [image, setImage] = useState()

    const pathID = useLocation().pathname.split('/')[2]
    const imageID = useLocation().pathname.split('/')[3]

    const getAnImage = (image_data:any) => {
        image_data.forEach((item:any)=>{
            if (item._id === imageID) {
                setImage(item)
            }
        })
    }

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/v1/users/get-by-username/${pathID}`)
            .then(res=>getAnImage(res.data.user.imageList))
            .catch(err=> alert("Sorry, account was not found."));
    },[pathID])

    return (
        <section className="page-container image-preview-page">
            {image && (
                <article>
                    <h1>{image["title"]}</h1>
                    <p>{image["description"]}</p>
                    <article>
                        {
                            image["author"]["userName"]
                        }
                    </article>
                </article>
            )}
        </section>
    )
}