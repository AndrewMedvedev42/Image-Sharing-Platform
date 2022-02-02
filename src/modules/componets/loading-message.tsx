import { IoMdRocket } from "react-icons/io";

export const LoadingMessage = ({message}:any) => {
    return (
        <article className="side_effect loading_message">
            <IoMdRocket id="loading_icon" size={100}/>
            <p className="loading_text">{message}</p>
        </article>
    )
}