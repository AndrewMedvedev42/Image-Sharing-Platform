import axios from 'axios';
import {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom"
import { LoadingMessage } from "../../componets/loadingMessage";

export const SubmitImagePage = () => {
    const [imageTitle, setImageTitle] = useState("")
    const [imageDescription, setImageDescription] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const history = useNavigate()
    const pathID = useLocation().pathname.split('/')[2]

    const uploadHandler = (event: React.ChangeEvent<any>) => {
        event.preventDefault()
        setIsLoading(true)
        const formData = new FormData();
        const image = event.target.file.files[0];        
        const createDate = () => {
            const day = new Date().getDate()
            const month = new Date().getMonth()
            const year = new Date().getFullYear()
            return `${day}/${month}/${year}`
        }

        formData.append('file', image);
        formData.append('title', imageTitle);   
        formData.append('description', imageDescription);   
        formData.append('dateOfCreation', createDate());         
        
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/images/${pathID}`, formData, {headers: {'Content-Type': 'multipart/form-data',}})
          .then((res) => history(`/success`))
      }
    return (
        <section className="page-container submit-image-page-container">
            {
                isLoading && (
                    <LoadingMessage message="Submiting"/>
                )
            }       
            <form className="submit-image-form" onSubmit={uploadHandler}>
                    <input type="file" className="form-control" name="file" required disabled={isLoading}/>
                    <input type="text" className="form-control" placeholder="Title" onChange={(e)=>setImageTitle(e.target.value)} disabled={isLoading}/>
                    <input type="text" className="form-control" placeholder="Description" onChange={(e)=>setImageDescription(e.target.value)} disabled={isLoading}/>
                    <input type="submit" value="Submit" className="submit_button" disabled={isLoading}/>                             
            </form>
        </section>
    )
}