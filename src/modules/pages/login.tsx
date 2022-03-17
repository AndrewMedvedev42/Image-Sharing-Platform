import axios from 'axios';
import {Link} from "react-router-dom";
import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";

export const LoginInPage:React.FC = () => {
    const [userLoginPassword, setUserLoginPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
//USE NAVIGATE TO MOVE BETWEEN PAGES
    const history = useNavigate();

    const denyUserLogin = (message:any) => {
        alert(message)
        console.log(message);
        
        setIsLoading(false)
    }
//SETS ROLE TO local STORAGE TO LIMIT ACCESS
    useEffect(()=>{
        window.localStorage.setItem("M0NTY3ODkw", JSON.stringify({role:"Customer"}));
      },[])

//CHECKS EXISTING ACCOUNT FOR ACCESS
    const userCheckProcces = (data:any) => {
        const {password, _id} = data.data.user
            if (userLoginPassword === password) {
                window.localStorage.setItem("M0NTY3ODkw", JSON.stringify({role:"Customer", userID:_id}));
                history(`/users/${_id}`)
            }else{
                denyUserLogin("Wrong password, please try again.")
            }
    }
 
//FINDS USER INFO FOR FURTHER VALIDATION
    const getUserDataByLogin = (event:React.ChangeEvent<any>) => {
        event.preventDefault();
        setIsLoading(true)
        const formData = new FormData();
        formData.append('email', event.target.email.value)
        formData.append('password', event.target.password.value)
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/v1/login`, formData)
            .then(response => {
                userCheckProcces(response)
            })
            .catch(error => {
                denyUserLogin(error)
            })
    } 
    return (
        <div className="form_section login_page_container">
            <form onSubmit={getUserDataByLogin} className="user-form login-form">
                <h2>Log in</h2>
                <input name="email" type="email" placeholder="email" className="form-control"/>
                <input name="password" type="password" placeholder="pasword" className="form-control" onChange={(e)=>{setUserLoginPassword(e.target.value)}}/>
                <input className={`submit_button ${isLoading && ("disabled_button")}`} type="submit" value="Log in"/>
                <Link to="/signup">Create new account</Link>
            </form>
        </div>
    )
}