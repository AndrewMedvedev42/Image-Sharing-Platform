import axios from 'axios';
import {useState} from 'react';
import {useLocation} from "react-router-dom"

export const SubmitImagePage = () => {
    const [imageTitle, setImageTitle] = useState("")
    const [imageDescription, setImageDescription] = useState("")
    const pathID = useLocation().pathname.split('/')[2]

    const uploadHandler = (event: React.ChangeEvent<any>) => {
        event.preventDefault()
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
        console.log(formData);
        
        axios.post(`http://localhost:5000/api/v1/images/${pathID}`, formData, {headers: {'Content-Type': 'multipart/form-data',}})
          .then((res) => alert("image has been send"))
      }
      console.log(pathID);
      
    return (
        <section className="page-container submit-image-page-container">
            <form className="submit-image-form" onSubmit={uploadHandler}>
                    <input type="file" className="form-control" name="file" required/>
                    <input type="text" className="form-control" placeholder="Title" onChange={(e)=>setImageTitle(e.target.value)}/>
                    <input type="text" className="form-control" placeholder="Description" onChange={(e)=>setImageDescription(e.target.value)}/>
                    <input type="submit" value="Submit" className="btn btn-default"/>            
            </form>
        </section>
    )
}