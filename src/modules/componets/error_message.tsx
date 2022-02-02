import { GiEvilComet } from "react-icons/gi";

export const ErrorMessage = ({error_message}:any) => {
    return (
        <article className="side_effect error_message">
            <GiEvilComet size={100}/>
            <p className="error_text">{error_message.message}</p>
        </article>
    )
}