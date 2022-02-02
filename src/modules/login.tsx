import axios from 'axios';
import {Link} from "react-router-dom";
import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";

export const LoginInPage:React.FC = () => {
    const [userLoginEmail, setUserLoginEmail] = useState("")
    const [userLoginPassword, setUserLoginPassword] = useState("")

//USE NAVIGATE TO MOVE BETWEEN PAGES
    const history = useNavigate();

//SETS ROLE TO local STORAGE TO LIMIT ACCESS
    useEffect(()=>{
        window.localStorage.setItem("M0NTY3ODkw", JSON.stringify({role:"Customer"}));
      },[])

//VAILDATION SYMBOLS TO CHECK IF TYPED EMAIL CAN BE USED AS REAL EMAIL
    const mailValidation= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordValidation = /^\S+$/

//CHECKS EXISTING ACCOUNT FOR ACCESS
    const userCheckProcces = (data:any) => {
        const {password, userName, _id} = data.data.user
            if (userLoginPassword === password) {
                window.localStorage.setItem("M0NTY3ODkw", JSON.stringify({role:"Customer", userID:_id}));
                history(`/users/${_id}`)
            }else{
                alert("Wrong password, please try again.")
            }
    }
 

//FINDS USER INFO FOR FURTHER VALIDATION
    const getUserDataByLogin = (e:React.ChangeEvent<any>) => {
        e.preventDefault();
        if (userLoginEmail.match(mailValidation)) {
            if (userLoginPassword.match(passwordValidation)) {
                axios
                    .get(`http://localhost:5000/api/v1/login_register?email=${userLoginEmail}`)
                    .then(res => {
                        userCheckProcces(res)
                    })
                    .catch(err => {
                        console.log(err);
                        alert("Sorry, user was not found")
                    })
            }else{
                alert("Password is typed incorrectly, please try again.")
            }
        } else {
            alert("Email is typed incorrectly, please try again.")
        }
    } 
    return (
        <div className="form_section login_page_container">
            <form onSubmit={getUserDataByLogin} className="user-form login-form">
                <h2>Log in</h2>
                <input type="email" placeholder="email" className="form-control" onChange={(e)=>{setUserLoginEmail(e.target.value)}}/>
                <input type="password" placeholder="pasword" className="form-control" onChange={(e)=>{setUserLoginPassword(e.target.value)}}/>
                <input type="submit" value="Log in"/>
                <Link to="/signup">Create new account</Link>
            </form>
        </div>
    )
}