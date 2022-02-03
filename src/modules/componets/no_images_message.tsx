import { GiBlackHoleBolas } from "react-icons/gi";

export const NoImagesMessage = ({message}:any) => {
    return (
        <article className="side_effect no_image_message_container">
            <GiBlackHoleBolas size={100}/>
            <p className="message_text">{message}</p>
        </article>
    )
}