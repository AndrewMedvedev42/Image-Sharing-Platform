import axios from 'axios';
import { useEffect, useState } from "react"
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
  

export const MainPage:React.FC = () => {
    const [imageList, setImageList] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/v1/images`)
            .then(res => setImageList(res.data.images)).catch(err=>console.log(err));
    },[])

    console.log(imageList);
    

    return (
        <section className="main-page-container">
            <section className="image-list">
                {
                    
                    imageList.length && (
                        imageList.map(item=>{
                            const {author, title, _id, image}:ImageProps = item
                            return <article className="image-item">
                                        <a href={`/images/${author.userName}/${_id}`}>
                                            {image && (parse(image))}
                                            <article className="image-details">
                                                <h3 className="image-title">{title}</h3>
                                                <span className="image-author">{author.userName}</span>
                                            </article>
                                        </a>
                                    </article>
                        })
                    )
                }
            </section>
        </section>
    )
}