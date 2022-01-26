import axios from 'axios';
import { useEffect, useState } from "react"

interface ImageProps {
    author: {
        firstName:String,
        lastName:String,
        userName:String
    },
    dateOfCreation:String,
    title:String,
    _id:String
  }
  

export const HomePage:React.FC = () => {

    const [imageList, setImageList] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/v1/images`)
            .then(res => setImageList(res.data.images)).catch(err=>console.log(err));
    },[])

    console.log(imageList);
    

    return (
        <section>
            <section>
                {
                    imageList.length && (
                        imageList.map(item=>{
                            const {author, dateOfCreation, title, _id}:ImageProps = item
                            return <article>
                                        <img src="#"/>
                                        <h3>{title}</h3>
                                        <span>{author.userName}</span>
                                    </article>
                        })
                    )
                }
            </section>
        </section>
    )
}