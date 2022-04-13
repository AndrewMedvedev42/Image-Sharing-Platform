import { BsCheckCircleFill } from 'react-icons/bs';
import {useNavigate} from "react-router-dom"

export const SuccesssfullUploadPage = () => {
    const history =  useNavigate()
    return (
        <section className="form_section">
            <div className="message-box">
                <BsCheckCircleFill className="checked_icon" size={100}/>
                <p className="message_text">Successfully uploaded!</p>
                <input type="submit" value="Back" onClick={()=>{history(-2)}}/>
            </div>
        </section>
    )
}