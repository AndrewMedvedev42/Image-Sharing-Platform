import { GiBlackHoleBolas } from "react-icons/gi";

export const UnavalibleMessage = ({message}:any) => {
    return (
        <article className="side_effect unavalible_message_container">
            <GiBlackHoleBolas size={100}/>
            <p className="message_text">{message}</p>
        </article>
    )
}