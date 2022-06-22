import { GiEvilComet } from "react-icons/gi";

export const ErrorMessage = ({error_message}:any) => {
    return (
        <article className="side_effect error_message">
            <GiEvilComet size={100}/>
            <p className="message_text">An error has happend</p>
        </article>
    )
}