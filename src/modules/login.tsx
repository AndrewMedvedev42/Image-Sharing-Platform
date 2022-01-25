import {Link} from "react-router-dom";
export const LoginInPage:React.FC = () => {
    return (
        <div className="page-container login-page-container">
            <form action="" className="user-form login-form">
                <h2>Log in</h2>
                <input type="email" placeholder="email"/>
                <input type="password" placeholder="pasword"/>
                <input type="submit" value="Log in"/>
                <Link to="/signup">Create new account</Link>
            </form>
        </div>
    )
}