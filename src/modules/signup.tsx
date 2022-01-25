import {Link} from "react-router-dom";
export const SignUpPage = () => {
    return (
        <div className="page-container sign-up-page-container">
            <form action="" className="user-form">
                <h2>Sign up</h2>
                <input type="name" placeholder="First name" />
                <input type="name" placeholder="Last name" />
                <input type="username" placeholder="Username"/>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <input type="submit" value="Sign up"/>
                <Link to="/login">Log in</Link>
            </form>
        </div>
    )
}