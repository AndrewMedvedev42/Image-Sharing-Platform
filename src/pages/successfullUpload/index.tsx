import { BsCheckCircleFill } from 'react-icons/bs';
import {useNavigate} from "react-router-dom"

export const SuccesssfullUploadPage = () => {
    const history =  useNavigate()
    return (
        <section className="form_section">
            <div className="message-box">
                <BsCheckCircleFill className="checked_icon" size={100}/>
                <p className="message_text">Successfully uploaded!</p>
                <button type="submit" className='w-100 mb-3 btn btn-primary' onClick={()=>{history(-2)}}>Back</button>   
            </div>
        </section>
    )
}